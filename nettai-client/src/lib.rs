pub mod protocol;

use base64::Engine;
use futures_util::{SinkExt, StreamExt};
use prost::Message;
use tungstenite::client::IntoClientRequest;

struct Sender(
    tokio::sync::Mutex<
        futures_util::stream::SplitSink<
            tokio_tungstenite::WebSocketStream<tokio_tungstenite::MaybeTlsStream<tokio::net::TcpStream>>,
            tungstenite::Message,
        >,
    >,
);

impl Sender {
    async fn send(&self, message: tungstenite::Message) -> Result<(), tungstenite::Error> {
        self.0.lock().await.send(message).await
    }

    async fn send_binary(&self, buf: Vec<u8>) -> Result<(), tungstenite::Error> {
        self.0.lock().await.send(tungstenite::Message::Binary(buf)).await
    }

    async fn send_message(&self, msg: &impl prost::Message) -> Result<(), tungstenite::Error> {
        self.send_binary(msg.encode_to_vec()).await
    }
}

struct Receiver(
    futures_util::stream::SplitStream<
        tokio_tungstenite::WebSocketStream<tokio_tungstenite::MaybeTlsStream<tokio::net::TcpStream>>,
    >,
);

impl Receiver {
    async fn recv(&mut self) -> Option<Result<tungstenite::Message, tungstenite::Error>> {
        self.0.next().await
    }
}

#[derive(thiserror::Error, Debug)]
pub enum Error {
    #[error("tungstenite: {0}")]
    Tungstenite(#[from] tungstenite::Error),

    #[error("prost: {0}")]
    ProstDecode(#[from] prost::DecodeError),

    #[error("io: {0}")]
    Io(#[from] std::io::Error),
}

pub struct Client {
    user_id: Vec<u8>,
    ticket: Vec<u8>,
    tx: std::sync::Arc<Sender>,
    _drop_guard: tokio_util::sync::DropGuard,
}

impl Client {
    pub async fn new(addr: &str, ticket: Vec<u8>) -> Result<Self, Error> {
        let mut req = addr.into_client_request()?;
        req.headers_mut().append(
            "X-Nettai-Version",
            tungstenite::http::HeaderValue::from_str(&env!("CARGO_PKG_VERSION")).unwrap(),
        );
        if !ticket.is_empty() {
            req.headers_mut().append(
                "Authorization",
                tungstenite::http::HeaderValue::from_str(&format!(
                    "Nettai-Resumption {}",
                    base64::engine::general_purpose::URL_SAFE_NO_PAD.encode(&ticket)
                ))
                .unwrap(),
            );
        }

        let (stream, _) = tokio_tungstenite::connect_async(req).await?;

        let (tx, rx) = stream.split();

        let tx = std::sync::Arc::new(Sender(tokio::sync::Mutex::new(tx)));
        let mut rx = Receiver(rx);

        // Receive the Hello message.
        let hello = match rx
            .recv()
            .await
            .ok_or_else(|| std::io::Error::new(std::io::ErrorKind::UnexpectedEof, "stream closed"))??
        {
            tungstenite::Message::Binary(msg) => protocol::Packet::decode(&mut bytes::Bytes::from(msg))?
                .which
                .and_then(|which| match which {
                    protocol::packet::Which::Hello(hello) => Some(hello),
                    _ => None,
                })
                .ok_or_else(|| std::io::Error::new(std::io::ErrorKind::InvalidData, "unexpected packet"))?,
            _ => {
                return Err(std::io::Error::new(std::io::ErrorKind::InvalidData, "unexpected packet").into());
            }
        };

        let cancellation_token = tokio_util::sync::CancellationToken::new();
        tokio::spawn({
            let tx = tx.clone();
            let cancellation_token = cancellation_token.clone();
            async move {
                if let Err(e) = (|| async move {
                    loop {
                        tokio::select! {
                            msg = rx.recv() => {
                                let msg = if let Some(msg) = msg {
                                    msg
                                } else {
                                    return Ok::<_, Error>(());
                                }?;

                                match msg {
                                    tungstenite::Message::Binary(_) => todo!(),
                                    tungstenite::Message::Ping(buf) => {
                                        tx.send(tungstenite::Message::Pong(buf)).await?;
                                    },
                                    _ => todo!(),
                                }
                            }
                            _ = cancellation_token.cancelled() => {
                                return Ok(());
                            }
                        }
                    }
                })()
                .await
                {
                    // Do something with the error.
                    let _ = e;
                }
            }
        });

        Ok(Client {
            user_id: hello.user_id,
            ticket: hello.ticket,
            tx,
            _drop_guard: cancellation_token.drop_guard(),
        })
    }
}