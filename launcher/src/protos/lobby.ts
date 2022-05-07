/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "tango.lobby";

export interface GameInfo {
  romName: string;
  patch: GameInfo_Patch | undefined;
}

export interface GameInfo_Patch {
  name: string;
  version: string;
}

export interface Settings {
  open: boolean;
}

export interface CreateStreamToServerMessage {
  createReq: CreateStreamToServerMessage_CreateRequest | undefined;
  acceptReq: CreateStreamToServerMessage_AcceptRequest | undefined;
  rejectReq: CreateStreamToServerMessage_RejectRequest | undefined;
}

export interface CreateStreamToServerMessage_CreateRequest {
  nickname: string;
  gameInfo: GameInfo | undefined;
  availableGames: GameInfo[];
  settings: Settings | undefined;
  saveData: Uint8Array;
}

export interface CreateStreamToServerMessage_AcceptRequest {
  opponentId: number;
}

export interface CreateStreamToServerMessage_RejectRequest {
  opponentId: number;
}

export interface CreateStreamToClientMessage {
  disconnectInd: CreateStreamToClientMessage_DisconnectIndication | undefined;
  createResp: CreateStreamToClientMessage_CreateResponse | undefined;
  joinInd: CreateStreamToClientMessage_JoinIndication | undefined;
  acceptResp: CreateStreamToClientMessage_AcceptResponse | undefined;
  rejectResp: CreateStreamToClientMessage_RejectResponse | undefined;
}

export interface CreateStreamToClientMessage_CreateResponse {
  lobbyId: string;
}

export interface CreateStreamToClientMessage_JoinIndication {
  opponentId: number;
  opponentNickname: string;
  gameInfo: GameInfo | undefined;
  saveData: Uint8Array;
}

export interface CreateStreamToClientMessage_AcceptResponse {
  sessionId: string;
}

export interface CreateStreamToClientMessage_RejectResponse {}

export interface CreateStreamToClientMessage_DisconnectIndication {
  reason: CreateStreamToClientMessage_DisconnectIndication_Reason;
}

export enum CreateStreamToClientMessage_DisconnectIndication_Reason {
  UNKNOWN = 0,
  START_TIMEOUT = 1,
  WAIT_TIMEOUT = 2,
  UNRECOGNIZED = -1,
}

export function createStreamToClientMessage_DisconnectIndication_ReasonFromJSON(
  object: any
): CreateStreamToClientMessage_DisconnectIndication_Reason {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return CreateStreamToClientMessage_DisconnectIndication_Reason.UNKNOWN;
    case 1:
    case "START_TIMEOUT":
      return CreateStreamToClientMessage_DisconnectIndication_Reason.START_TIMEOUT;
    case 2:
    case "WAIT_TIMEOUT":
      return CreateStreamToClientMessage_DisconnectIndication_Reason.WAIT_TIMEOUT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CreateStreamToClientMessage_DisconnectIndication_Reason.UNRECOGNIZED;
  }
}

export function createStreamToClientMessage_DisconnectIndication_ReasonToJSON(
  object: CreateStreamToClientMessage_DisconnectIndication_Reason
): string {
  switch (object) {
    case CreateStreamToClientMessage_DisconnectIndication_Reason.UNKNOWN:
      return "UNKNOWN";
    case CreateStreamToClientMessage_DisconnectIndication_Reason.START_TIMEOUT:
      return "START_TIMEOUT";
    case CreateStreamToClientMessage_DisconnectIndication_Reason.WAIT_TIMEOUT:
      return "WAIT_TIMEOUT";
    default:
      return "UNKNOWN";
  }
}

export interface JoinStreamToServerMessage {
  joinReq: JoinStreamToServerMessage_JoinRequest | undefined;
}

export interface JoinStreamToServerMessage_JoinRequest {
  nickname: string;
  lobbyId: string;
  gameInfo: GameInfo | undefined;
  saveData: Uint8Array;
}

export interface JoinStreamToClientMessage {
  disconnectInd: JoinStreamToClientMessage_DisconnectIndication | undefined;
  joinResp: JoinStreamToClientMessage_JoinResponse | undefined;
  acceptInd: JoinStreamToClientMessage_AcceptIndication | undefined;
}

export interface JoinStreamToClientMessage_JoinResponse {
  status: JoinStreamToClientMessage_JoinResponse_Status;
}

export enum JoinStreamToClientMessage_JoinResponse_Status {
  UNKNOWN = 0,
  OK = 1,
  NOT_FOUND = 2,
  UNRECOGNIZED = -1,
}

export function joinStreamToClientMessage_JoinResponse_StatusFromJSON(
  object: any
): JoinStreamToClientMessage_JoinResponse_Status {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return JoinStreamToClientMessage_JoinResponse_Status.UNKNOWN;
    case 1:
    case "OK":
      return JoinStreamToClientMessage_JoinResponse_Status.OK;
    case 2:
    case "NOT_FOUND":
      return JoinStreamToClientMessage_JoinResponse_Status.NOT_FOUND;
    case -1:
    case "UNRECOGNIZED":
    default:
      return JoinStreamToClientMessage_JoinResponse_Status.UNRECOGNIZED;
  }
}

export function joinStreamToClientMessage_JoinResponse_StatusToJSON(
  object: JoinStreamToClientMessage_JoinResponse_Status
): string {
  switch (object) {
    case JoinStreamToClientMessage_JoinResponse_Status.UNKNOWN:
      return "UNKNOWN";
    case JoinStreamToClientMessage_JoinResponse_Status.OK:
      return "OK";
    case JoinStreamToClientMessage_JoinResponse_Status.NOT_FOUND:
      return "NOT_FOUND";
    default:
      return "UNKNOWN";
  }
}

export interface JoinStreamToClientMessage_AcceptIndication {
  sessionId: string;
}

export interface JoinStreamToClientMessage_DisconnectIndication {
  reason: JoinStreamToClientMessage_DisconnectIndication_Reason;
}

export enum JoinStreamToClientMessage_DisconnectIndication_Reason {
  UNKNOWN = 0,
  START_TIMEOUT = 1,
  LOBBY_CLOSED = 2,
  REJECTED = 3,
  UNRECOGNIZED = -1,
}

export function joinStreamToClientMessage_DisconnectIndication_ReasonFromJSON(
  object: any
): JoinStreamToClientMessage_DisconnectIndication_Reason {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return JoinStreamToClientMessage_DisconnectIndication_Reason.UNKNOWN;
    case 1:
    case "START_TIMEOUT":
      return JoinStreamToClientMessage_DisconnectIndication_Reason.START_TIMEOUT;
    case 2:
    case "LOBBY_CLOSED":
      return JoinStreamToClientMessage_DisconnectIndication_Reason.LOBBY_CLOSED;
    case 3:
    case "REJECTED":
      return JoinStreamToClientMessage_DisconnectIndication_Reason.REJECTED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return JoinStreamToClientMessage_DisconnectIndication_Reason.UNRECOGNIZED;
  }
}

export function joinStreamToClientMessage_DisconnectIndication_ReasonToJSON(
  object: JoinStreamToClientMessage_DisconnectIndication_Reason
): string {
  switch (object) {
    case JoinStreamToClientMessage_DisconnectIndication_Reason.UNKNOWN:
      return "UNKNOWN";
    case JoinStreamToClientMessage_DisconnectIndication_Reason.START_TIMEOUT:
      return "START_TIMEOUT";
    case JoinStreamToClientMessage_DisconnectIndication_Reason.LOBBY_CLOSED:
      return "LOBBY_CLOSED";
    case JoinStreamToClientMessage_DisconnectIndication_Reason.REJECTED:
      return "REJECTED";
    default:
      return "UNKNOWN";
  }
}

export interface GetInfoRequest {
  lobbyId: string;
}

export interface GetInfoResponse {
  opponentNickname: string;
  gameInfo: GameInfo | undefined;
  availableGames: GameInfo[];
  settings: Settings | undefined;
}

export interface GetSaveDataRequest {
  lobbyId: string;
}

export interface GetSaveDataResponse {
  saveData: Uint8Array;
}

function createBaseGameInfo(): GameInfo {
  return { romName: "", patch: undefined };
}

export const GameInfo = {
  encode(
    message: GameInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.romName !== "") {
      writer.uint32(10).string(message.romName);
    }
    if (message.patch !== undefined) {
      GameInfo_Patch.encode(message.patch, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.romName = reader.string();
          break;
        case 2:
          message.patch = GameInfo_Patch.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameInfo {
    return {
      romName: isSet(object.romName) ? String(object.romName) : "",
      patch: isSet(object.patch)
        ? GameInfo_Patch.fromJSON(object.patch)
        : undefined,
    };
  },

  toJSON(message: GameInfo): unknown {
    const obj: any = {};
    message.romName !== undefined && (obj.romName = message.romName);
    message.patch !== undefined &&
      (obj.patch = message.patch
        ? GameInfo_Patch.toJSON(message.patch)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameInfo>, I>>(object: I): GameInfo {
    const message = createBaseGameInfo();
    message.romName = object.romName ?? "";
    message.patch =
      object.patch !== undefined && object.patch !== null
        ? GameInfo_Patch.fromPartial(object.patch)
        : undefined;
    return message;
  },
};

function createBaseGameInfo_Patch(): GameInfo_Patch {
  return { name: "", version: "" };
}

export const GameInfo_Patch = {
  encode(
    message: GameInfo_Patch,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameInfo_Patch {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameInfo_Patch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.version = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameInfo_Patch {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      version: isSet(object.version) ? String(object.version) : "",
    };
  },

  toJSON(message: GameInfo_Patch): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.version !== undefined && (obj.version = message.version);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameInfo_Patch>, I>>(
    object: I
  ): GameInfo_Patch {
    const message = createBaseGameInfo_Patch();
    message.name = object.name ?? "";
    message.version = object.version ?? "";
    return message;
  },
};

function createBaseSettings(): Settings {
  return { open: false };
}

export const Settings = {
  encode(
    message: Settings,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.open === true) {
      writer.uint32(8).bool(message.open);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Settings {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.open = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Settings {
    return {
      open: isSet(object.open) ? Boolean(object.open) : false,
    };
  },

  toJSON(message: Settings): unknown {
    const obj: any = {};
    message.open !== undefined && (obj.open = message.open);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Settings>, I>>(object: I): Settings {
    const message = createBaseSettings();
    message.open = object.open ?? false;
    return message;
  },
};

function createBaseCreateStreamToServerMessage(): CreateStreamToServerMessage {
  return { createReq: undefined, acceptReq: undefined, rejectReq: undefined };
}

export const CreateStreamToServerMessage = {
  encode(
    message: CreateStreamToServerMessage,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.createReq !== undefined) {
      CreateStreamToServerMessage_CreateRequest.encode(
        message.createReq,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.acceptReq !== undefined) {
      CreateStreamToServerMessage_AcceptRequest.encode(
        message.acceptReq,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.rejectReq !== undefined) {
      CreateStreamToServerMessage_RejectRequest.encode(
        message.rejectReq,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CreateStreamToServerMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateStreamToServerMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.createReq = CreateStreamToServerMessage_CreateRequest.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.acceptReq = CreateStreamToServerMessage_AcceptRequest.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.rejectReq = CreateStreamToServerMessage_RejectRequest.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateStreamToServerMessage {
    return {
      createReq: isSet(object.createReq)
        ? CreateStreamToServerMessage_CreateRequest.fromJSON(object.createReq)
        : undefined,
      acceptReq: isSet(object.acceptReq)
        ? CreateStreamToServerMessage_AcceptRequest.fromJSON(object.acceptReq)
        : undefined,
      rejectReq: isSet(object.rejectReq)
        ? CreateStreamToServerMessage_RejectRequest.fromJSON(object.rejectReq)
        : undefined,
    };
  },

  toJSON(message: CreateStreamToServerMessage): unknown {
    const obj: any = {};
    message.createReq !== undefined &&
      (obj.createReq = message.createReq
        ? CreateStreamToServerMessage_CreateRequest.toJSON(message.createReq)
        : undefined);
    message.acceptReq !== undefined &&
      (obj.acceptReq = message.acceptReq
        ? CreateStreamToServerMessage_AcceptRequest.toJSON(message.acceptReq)
        : undefined);
    message.rejectReq !== undefined &&
      (obj.rejectReq = message.rejectReq
        ? CreateStreamToServerMessage_RejectRequest.toJSON(message.rejectReq)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateStreamToServerMessage>, I>>(
    object: I
  ): CreateStreamToServerMessage {
    const message = createBaseCreateStreamToServerMessage();
    message.createReq =
      object.createReq !== undefined && object.createReq !== null
        ? CreateStreamToServerMessage_CreateRequest.fromPartial(
            object.createReq
          )
        : undefined;
    message.acceptReq =
      object.acceptReq !== undefined && object.acceptReq !== null
        ? CreateStreamToServerMessage_AcceptRequest.fromPartial(
            object.acceptReq
          )
        : undefined;
    message.rejectReq =
      object.rejectReq !== undefined && object.rejectReq !== null
        ? CreateStreamToServerMessage_RejectRequest.fromPartial(
            object.rejectReq
          )
        : undefined;
    return message;
  },
};

function createBaseCreateStreamToServerMessage_CreateRequest(): CreateStreamToServerMessage_CreateRequest {
  return {
    nickname: "",
    gameInfo: undefined,
    availableGames: [],
    settings: undefined,
    saveData: new Uint8Array(),
  };
}

export const CreateStreamToServerMessage_CreateRequest = {
  encode(
    message: CreateStreamToServerMessage_CreateRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.nickname !== "") {
      writer.uint32(10).string(message.nickname);
    }
    if (message.gameInfo !== undefined) {
      GameInfo.encode(message.gameInfo, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.availableGames) {
      GameInfo.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.settings !== undefined) {
      Settings.encode(message.settings, writer.uint32(34).fork()).ldelim();
    }
    if (message.saveData.length !== 0) {
      writer.uint32(42).bytes(message.saveData);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CreateStreamToServerMessage_CreateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateStreamToServerMessage_CreateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nickname = reader.string();
          break;
        case 2:
          message.gameInfo = GameInfo.decode(reader, reader.uint32());
          break;
        case 3:
          message.availableGames.push(GameInfo.decode(reader, reader.uint32()));
          break;
        case 4:
          message.settings = Settings.decode(reader, reader.uint32());
          break;
        case 5:
          message.saveData = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateStreamToServerMessage_CreateRequest {
    return {
      nickname: isSet(object.nickname) ? String(object.nickname) : "",
      gameInfo: isSet(object.gameInfo)
        ? GameInfo.fromJSON(object.gameInfo)
        : undefined,
      availableGames: Array.isArray(object?.availableGames)
        ? object.availableGames.map((e: any) => GameInfo.fromJSON(e))
        : [],
      settings: isSet(object.settings)
        ? Settings.fromJSON(object.settings)
        : undefined,
      saveData: isSet(object.saveData)
        ? bytesFromBase64(object.saveData)
        : new Uint8Array(),
    };
  },

  toJSON(message: CreateStreamToServerMessage_CreateRequest): unknown {
    const obj: any = {};
    message.nickname !== undefined && (obj.nickname = message.nickname);
    message.gameInfo !== undefined &&
      (obj.gameInfo = message.gameInfo
        ? GameInfo.toJSON(message.gameInfo)
        : undefined);
    if (message.availableGames) {
      obj.availableGames = message.availableGames.map((e) =>
        e ? GameInfo.toJSON(e) : undefined
      );
    } else {
      obj.availableGames = [];
    }
    message.settings !== undefined &&
      (obj.settings = message.settings
        ? Settings.toJSON(message.settings)
        : undefined);
    message.saveData !== undefined &&
      (obj.saveData = base64FromBytes(
        message.saveData !== undefined ? message.saveData : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<CreateStreamToServerMessage_CreateRequest>, I>
  >(object: I): CreateStreamToServerMessage_CreateRequest {
    const message = createBaseCreateStreamToServerMessage_CreateRequest();
    message.nickname = object.nickname ?? "";
    message.gameInfo =
      object.gameInfo !== undefined && object.gameInfo !== null
        ? GameInfo.fromPartial(object.gameInfo)
        : undefined;
    message.availableGames =
      object.availableGames?.map((e) => GameInfo.fromPartial(e)) || [];
    message.settings =
      object.settings !== undefined && object.settings !== null
        ? Settings.fromPartial(object.settings)
        : undefined;
    message.saveData = object.saveData ?? new Uint8Array();
    return message;
  },
};

function createBaseCreateStreamToServerMessage_AcceptRequest(): CreateStreamToServerMessage_AcceptRequest {
  return { opponentId: 0 };
}

export const CreateStreamToServerMessage_AcceptRequest = {
  encode(
    message: CreateStreamToServerMessage_AcceptRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.opponentId !== 0) {
      writer.uint32(8).uint32(message.opponentId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CreateStreamToServerMessage_AcceptRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateStreamToServerMessage_AcceptRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.opponentId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateStreamToServerMessage_AcceptRequest {
    return {
      opponentId: isSet(object.opponentId) ? Number(object.opponentId) : 0,
    };
  },

  toJSON(message: CreateStreamToServerMessage_AcceptRequest): unknown {
    const obj: any = {};
    message.opponentId !== undefined &&
      (obj.opponentId = Math.round(message.opponentId));
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<CreateStreamToServerMessage_AcceptRequest>, I>
  >(object: I): CreateStreamToServerMessage_AcceptRequest {
    const message = createBaseCreateStreamToServerMessage_AcceptRequest();
    message.opponentId = object.opponentId ?? 0;
    return message;
  },
};

function createBaseCreateStreamToServerMessage_RejectRequest(): CreateStreamToServerMessage_RejectRequest {
  return { opponentId: 0 };
}

export const CreateStreamToServerMessage_RejectRequest = {
  encode(
    message: CreateStreamToServerMessage_RejectRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.opponentId !== 0) {
      writer.uint32(8).uint32(message.opponentId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CreateStreamToServerMessage_RejectRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateStreamToServerMessage_RejectRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.opponentId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateStreamToServerMessage_RejectRequest {
    return {
      opponentId: isSet(object.opponentId) ? Number(object.opponentId) : 0,
    };
  },

  toJSON(message: CreateStreamToServerMessage_RejectRequest): unknown {
    const obj: any = {};
    message.opponentId !== undefined &&
      (obj.opponentId = Math.round(message.opponentId));
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<CreateStreamToServerMessage_RejectRequest>, I>
  >(object: I): CreateStreamToServerMessage_RejectRequest {
    const message = createBaseCreateStreamToServerMessage_RejectRequest();
    message.opponentId = object.opponentId ?? 0;
    return message;
  },
};

function createBaseCreateStreamToClientMessage(): CreateStreamToClientMessage {
  return {
    disconnectInd: undefined,
    createResp: undefined,
    joinInd: undefined,
    acceptResp: undefined,
    rejectResp: undefined,
  };
}

export const CreateStreamToClientMessage = {
  encode(
    message: CreateStreamToClientMessage,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.disconnectInd !== undefined) {
      CreateStreamToClientMessage_DisconnectIndication.encode(
        message.disconnectInd,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.createResp !== undefined) {
      CreateStreamToClientMessage_CreateResponse.encode(
        message.createResp,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.joinInd !== undefined) {
      CreateStreamToClientMessage_JoinIndication.encode(
        message.joinInd,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.acceptResp !== undefined) {
      CreateStreamToClientMessage_AcceptResponse.encode(
        message.acceptResp,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.rejectResp !== undefined) {
      CreateStreamToClientMessage_RejectResponse.encode(
        message.rejectResp,
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CreateStreamToClientMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateStreamToClientMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.disconnectInd =
            CreateStreamToClientMessage_DisconnectIndication.decode(
              reader,
              reader.uint32()
            );
          break;
        case 2:
          message.createResp =
            CreateStreamToClientMessage_CreateResponse.decode(
              reader,
              reader.uint32()
            );
          break;
        case 3:
          message.joinInd = CreateStreamToClientMessage_JoinIndication.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.acceptResp =
            CreateStreamToClientMessage_AcceptResponse.decode(
              reader,
              reader.uint32()
            );
          break;
        case 5:
          message.rejectResp =
            CreateStreamToClientMessage_RejectResponse.decode(
              reader,
              reader.uint32()
            );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateStreamToClientMessage {
    return {
      disconnectInd: isSet(object.disconnectInd)
        ? CreateStreamToClientMessage_DisconnectIndication.fromJSON(
            object.disconnectInd
          )
        : undefined,
      createResp: isSet(object.createResp)
        ? CreateStreamToClientMessage_CreateResponse.fromJSON(object.createResp)
        : undefined,
      joinInd: isSet(object.joinInd)
        ? CreateStreamToClientMessage_JoinIndication.fromJSON(object.joinInd)
        : undefined,
      acceptResp: isSet(object.acceptResp)
        ? CreateStreamToClientMessage_AcceptResponse.fromJSON(object.acceptResp)
        : undefined,
      rejectResp: isSet(object.rejectResp)
        ? CreateStreamToClientMessage_RejectResponse.fromJSON(object.rejectResp)
        : undefined,
    };
  },

  toJSON(message: CreateStreamToClientMessage): unknown {
    const obj: any = {};
    message.disconnectInd !== undefined &&
      (obj.disconnectInd = message.disconnectInd
        ? CreateStreamToClientMessage_DisconnectIndication.toJSON(
            message.disconnectInd
          )
        : undefined);
    message.createResp !== undefined &&
      (obj.createResp = message.createResp
        ? CreateStreamToClientMessage_CreateResponse.toJSON(message.createResp)
        : undefined);
    message.joinInd !== undefined &&
      (obj.joinInd = message.joinInd
        ? CreateStreamToClientMessage_JoinIndication.toJSON(message.joinInd)
        : undefined);
    message.acceptResp !== undefined &&
      (obj.acceptResp = message.acceptResp
        ? CreateStreamToClientMessage_AcceptResponse.toJSON(message.acceptResp)
        : undefined);
    message.rejectResp !== undefined &&
      (obj.rejectResp = message.rejectResp
        ? CreateStreamToClientMessage_RejectResponse.toJSON(message.rejectResp)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateStreamToClientMessage>, I>>(
    object: I
  ): CreateStreamToClientMessage {
    const message = createBaseCreateStreamToClientMessage();
    message.disconnectInd =
      object.disconnectInd !== undefined && object.disconnectInd !== null
        ? CreateStreamToClientMessage_DisconnectIndication.fromPartial(
            object.disconnectInd
          )
        : undefined;
    message.createResp =
      object.createResp !== undefined && object.createResp !== null
        ? CreateStreamToClientMessage_CreateResponse.fromPartial(
            object.createResp
          )
        : undefined;
    message.joinInd =
      object.joinInd !== undefined && object.joinInd !== null
        ? CreateStreamToClientMessage_JoinIndication.fromPartial(object.joinInd)
        : undefined;
    message.acceptResp =
      object.acceptResp !== undefined && object.acceptResp !== null
        ? CreateStreamToClientMessage_AcceptResponse.fromPartial(
            object.acceptResp
          )
        : undefined;
    message.rejectResp =
      object.rejectResp !== undefined && object.rejectResp !== null
        ? CreateStreamToClientMessage_RejectResponse.fromPartial(
            object.rejectResp
          )
        : undefined;
    return message;
  },
};

function createBaseCreateStreamToClientMessage_CreateResponse(): CreateStreamToClientMessage_CreateResponse {
  return { lobbyId: "" };
}

export const CreateStreamToClientMessage_CreateResponse = {
  encode(
    message: CreateStreamToClientMessage_CreateResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.lobbyId !== "") {
      writer.uint32(10).string(message.lobbyId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CreateStreamToClientMessage_CreateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateStreamToClientMessage_CreateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lobbyId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateStreamToClientMessage_CreateResponse {
    return {
      lobbyId: isSet(object.lobbyId) ? String(object.lobbyId) : "",
    };
  },

  toJSON(message: CreateStreamToClientMessage_CreateResponse): unknown {
    const obj: any = {};
    message.lobbyId !== undefined && (obj.lobbyId = message.lobbyId);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<CreateStreamToClientMessage_CreateResponse>, I>
  >(object: I): CreateStreamToClientMessage_CreateResponse {
    const message = createBaseCreateStreamToClientMessage_CreateResponse();
    message.lobbyId = object.lobbyId ?? "";
    return message;
  },
};

function createBaseCreateStreamToClientMessage_JoinIndication(): CreateStreamToClientMessage_JoinIndication {
  return {
    opponentId: 0,
    opponentNickname: "",
    gameInfo: undefined,
    saveData: new Uint8Array(),
  };
}

export const CreateStreamToClientMessage_JoinIndication = {
  encode(
    message: CreateStreamToClientMessage_JoinIndication,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.opponentId !== 0) {
      writer.uint32(8).uint32(message.opponentId);
    }
    if (message.opponentNickname !== "") {
      writer.uint32(18).string(message.opponentNickname);
    }
    if (message.gameInfo !== undefined) {
      GameInfo.encode(message.gameInfo, writer.uint32(26).fork()).ldelim();
    }
    if (message.saveData.length !== 0) {
      writer.uint32(34).bytes(message.saveData);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CreateStreamToClientMessage_JoinIndication {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateStreamToClientMessage_JoinIndication();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.opponentId = reader.uint32();
          break;
        case 2:
          message.opponentNickname = reader.string();
          break;
        case 3:
          message.gameInfo = GameInfo.decode(reader, reader.uint32());
          break;
        case 4:
          message.saveData = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateStreamToClientMessage_JoinIndication {
    return {
      opponentId: isSet(object.opponentId) ? Number(object.opponentId) : 0,
      opponentNickname: isSet(object.opponentNickname)
        ? String(object.opponentNickname)
        : "",
      gameInfo: isSet(object.gameInfo)
        ? GameInfo.fromJSON(object.gameInfo)
        : undefined,
      saveData: isSet(object.saveData)
        ? bytesFromBase64(object.saveData)
        : new Uint8Array(),
    };
  },

  toJSON(message: CreateStreamToClientMessage_JoinIndication): unknown {
    const obj: any = {};
    message.opponentId !== undefined &&
      (obj.opponentId = Math.round(message.opponentId));
    message.opponentNickname !== undefined &&
      (obj.opponentNickname = message.opponentNickname);
    message.gameInfo !== undefined &&
      (obj.gameInfo = message.gameInfo
        ? GameInfo.toJSON(message.gameInfo)
        : undefined);
    message.saveData !== undefined &&
      (obj.saveData = base64FromBytes(
        message.saveData !== undefined ? message.saveData : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<CreateStreamToClientMessage_JoinIndication>, I>
  >(object: I): CreateStreamToClientMessage_JoinIndication {
    const message = createBaseCreateStreamToClientMessage_JoinIndication();
    message.opponentId = object.opponentId ?? 0;
    message.opponentNickname = object.opponentNickname ?? "";
    message.gameInfo =
      object.gameInfo !== undefined && object.gameInfo !== null
        ? GameInfo.fromPartial(object.gameInfo)
        : undefined;
    message.saveData = object.saveData ?? new Uint8Array();
    return message;
  },
};

function createBaseCreateStreamToClientMessage_AcceptResponse(): CreateStreamToClientMessage_AcceptResponse {
  return { sessionId: "" };
}

export const CreateStreamToClientMessage_AcceptResponse = {
  encode(
    message: CreateStreamToClientMessage_AcceptResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionId !== "") {
      writer.uint32(10).string(message.sessionId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CreateStreamToClientMessage_AcceptResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateStreamToClientMessage_AcceptResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sessionId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateStreamToClientMessage_AcceptResponse {
    return {
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
    };
  },

  toJSON(message: CreateStreamToClientMessage_AcceptResponse): unknown {
    const obj: any = {};
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<CreateStreamToClientMessage_AcceptResponse>, I>
  >(object: I): CreateStreamToClientMessage_AcceptResponse {
    const message = createBaseCreateStreamToClientMessage_AcceptResponse();
    message.sessionId = object.sessionId ?? "";
    return message;
  },
};

function createBaseCreateStreamToClientMessage_RejectResponse(): CreateStreamToClientMessage_RejectResponse {
  return {};
}

export const CreateStreamToClientMessage_RejectResponse = {
  encode(
    _: CreateStreamToClientMessage_RejectResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CreateStreamToClientMessage_RejectResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateStreamToClientMessage_RejectResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): CreateStreamToClientMessage_RejectResponse {
    return {};
  },

  toJSON(_: CreateStreamToClientMessage_RejectResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<CreateStreamToClientMessage_RejectResponse>, I>
  >(_: I): CreateStreamToClientMessage_RejectResponse {
    const message = createBaseCreateStreamToClientMessage_RejectResponse();
    return message;
  },
};

function createBaseCreateStreamToClientMessage_DisconnectIndication(): CreateStreamToClientMessage_DisconnectIndication {
  return { reason: 0 };
}

export const CreateStreamToClientMessage_DisconnectIndication = {
  encode(
    message: CreateStreamToClientMessage_DisconnectIndication,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.reason !== 0) {
      writer.uint32(8).int32(message.reason);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CreateStreamToClientMessage_DisconnectIndication {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message =
      createBaseCreateStreamToClientMessage_DisconnectIndication();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reason = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateStreamToClientMessage_DisconnectIndication {
    return {
      reason: isSet(object.reason)
        ? createStreamToClientMessage_DisconnectIndication_ReasonFromJSON(
            object.reason
          )
        : 0,
    };
  },

  toJSON(message: CreateStreamToClientMessage_DisconnectIndication): unknown {
    const obj: any = {};
    message.reason !== undefined &&
      (obj.reason =
        createStreamToClientMessage_DisconnectIndication_ReasonToJSON(
          message.reason
        ));
    return obj;
  },

  fromPartial<
    I extends Exact<
      DeepPartial<CreateStreamToClientMessage_DisconnectIndication>,
      I
    >
  >(object: I): CreateStreamToClientMessage_DisconnectIndication {
    const message =
      createBaseCreateStreamToClientMessage_DisconnectIndication();
    message.reason = object.reason ?? 0;
    return message;
  },
};

function createBaseJoinStreamToServerMessage(): JoinStreamToServerMessage {
  return { joinReq: undefined };
}

export const JoinStreamToServerMessage = {
  encode(
    message: JoinStreamToServerMessage,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.joinReq !== undefined) {
      JoinStreamToServerMessage_JoinRequest.encode(
        message.joinReq,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): JoinStreamToServerMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJoinStreamToServerMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.joinReq = JoinStreamToServerMessage_JoinRequest.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): JoinStreamToServerMessage {
    return {
      joinReq: isSet(object.joinReq)
        ? JoinStreamToServerMessage_JoinRequest.fromJSON(object.joinReq)
        : undefined,
    };
  },

  toJSON(message: JoinStreamToServerMessage): unknown {
    const obj: any = {};
    message.joinReq !== undefined &&
      (obj.joinReq = message.joinReq
        ? JoinStreamToServerMessage_JoinRequest.toJSON(message.joinReq)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JoinStreamToServerMessage>, I>>(
    object: I
  ): JoinStreamToServerMessage {
    const message = createBaseJoinStreamToServerMessage();
    message.joinReq =
      object.joinReq !== undefined && object.joinReq !== null
        ? JoinStreamToServerMessage_JoinRequest.fromPartial(object.joinReq)
        : undefined;
    return message;
  },
};

function createBaseJoinStreamToServerMessage_JoinRequest(): JoinStreamToServerMessage_JoinRequest {
  return {
    nickname: "",
    lobbyId: "",
    gameInfo: undefined,
    saveData: new Uint8Array(),
  };
}

export const JoinStreamToServerMessage_JoinRequest = {
  encode(
    message: JoinStreamToServerMessage_JoinRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.nickname !== "") {
      writer.uint32(10).string(message.nickname);
    }
    if (message.lobbyId !== "") {
      writer.uint32(18).string(message.lobbyId);
    }
    if (message.gameInfo !== undefined) {
      GameInfo.encode(message.gameInfo, writer.uint32(26).fork()).ldelim();
    }
    if (message.saveData.length !== 0) {
      writer.uint32(34).bytes(message.saveData);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): JoinStreamToServerMessage_JoinRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJoinStreamToServerMessage_JoinRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nickname = reader.string();
          break;
        case 2:
          message.lobbyId = reader.string();
          break;
        case 3:
          message.gameInfo = GameInfo.decode(reader, reader.uint32());
          break;
        case 4:
          message.saveData = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): JoinStreamToServerMessage_JoinRequest {
    return {
      nickname: isSet(object.nickname) ? String(object.nickname) : "",
      lobbyId: isSet(object.lobbyId) ? String(object.lobbyId) : "",
      gameInfo: isSet(object.gameInfo)
        ? GameInfo.fromJSON(object.gameInfo)
        : undefined,
      saveData: isSet(object.saveData)
        ? bytesFromBase64(object.saveData)
        : new Uint8Array(),
    };
  },

  toJSON(message: JoinStreamToServerMessage_JoinRequest): unknown {
    const obj: any = {};
    message.nickname !== undefined && (obj.nickname = message.nickname);
    message.lobbyId !== undefined && (obj.lobbyId = message.lobbyId);
    message.gameInfo !== undefined &&
      (obj.gameInfo = message.gameInfo
        ? GameInfo.toJSON(message.gameInfo)
        : undefined);
    message.saveData !== undefined &&
      (obj.saveData = base64FromBytes(
        message.saveData !== undefined ? message.saveData : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<JoinStreamToServerMessage_JoinRequest>, I>
  >(object: I): JoinStreamToServerMessage_JoinRequest {
    const message = createBaseJoinStreamToServerMessage_JoinRequest();
    message.nickname = object.nickname ?? "";
    message.lobbyId = object.lobbyId ?? "";
    message.gameInfo =
      object.gameInfo !== undefined && object.gameInfo !== null
        ? GameInfo.fromPartial(object.gameInfo)
        : undefined;
    message.saveData = object.saveData ?? new Uint8Array();
    return message;
  },
};

function createBaseJoinStreamToClientMessage(): JoinStreamToClientMessage {
  return {
    disconnectInd: undefined,
    joinResp: undefined,
    acceptInd: undefined,
  };
}

export const JoinStreamToClientMessage = {
  encode(
    message: JoinStreamToClientMessage,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.disconnectInd !== undefined) {
      JoinStreamToClientMessage_DisconnectIndication.encode(
        message.disconnectInd,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.joinResp !== undefined) {
      JoinStreamToClientMessage_JoinResponse.encode(
        message.joinResp,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.acceptInd !== undefined) {
      JoinStreamToClientMessage_AcceptIndication.encode(
        message.acceptInd,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): JoinStreamToClientMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJoinStreamToClientMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.disconnectInd =
            JoinStreamToClientMessage_DisconnectIndication.decode(
              reader,
              reader.uint32()
            );
          break;
        case 2:
          message.joinResp = JoinStreamToClientMessage_JoinResponse.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.acceptInd = JoinStreamToClientMessage_AcceptIndication.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): JoinStreamToClientMessage {
    return {
      disconnectInd: isSet(object.disconnectInd)
        ? JoinStreamToClientMessage_DisconnectIndication.fromJSON(
            object.disconnectInd
          )
        : undefined,
      joinResp: isSet(object.joinResp)
        ? JoinStreamToClientMessage_JoinResponse.fromJSON(object.joinResp)
        : undefined,
      acceptInd: isSet(object.acceptInd)
        ? JoinStreamToClientMessage_AcceptIndication.fromJSON(object.acceptInd)
        : undefined,
    };
  },

  toJSON(message: JoinStreamToClientMessage): unknown {
    const obj: any = {};
    message.disconnectInd !== undefined &&
      (obj.disconnectInd = message.disconnectInd
        ? JoinStreamToClientMessage_DisconnectIndication.toJSON(
            message.disconnectInd
          )
        : undefined);
    message.joinResp !== undefined &&
      (obj.joinResp = message.joinResp
        ? JoinStreamToClientMessage_JoinResponse.toJSON(message.joinResp)
        : undefined);
    message.acceptInd !== undefined &&
      (obj.acceptInd = message.acceptInd
        ? JoinStreamToClientMessage_AcceptIndication.toJSON(message.acceptInd)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JoinStreamToClientMessage>, I>>(
    object: I
  ): JoinStreamToClientMessage {
    const message = createBaseJoinStreamToClientMessage();
    message.disconnectInd =
      object.disconnectInd !== undefined && object.disconnectInd !== null
        ? JoinStreamToClientMessage_DisconnectIndication.fromPartial(
            object.disconnectInd
          )
        : undefined;
    message.joinResp =
      object.joinResp !== undefined && object.joinResp !== null
        ? JoinStreamToClientMessage_JoinResponse.fromPartial(object.joinResp)
        : undefined;
    message.acceptInd =
      object.acceptInd !== undefined && object.acceptInd !== null
        ? JoinStreamToClientMessage_AcceptIndication.fromPartial(
            object.acceptInd
          )
        : undefined;
    return message;
  },
};

function createBaseJoinStreamToClientMessage_JoinResponse(): JoinStreamToClientMessage_JoinResponse {
  return { status: 0 };
}

export const JoinStreamToClientMessage_JoinResponse = {
  encode(
    message: JoinStreamToClientMessage_JoinResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): JoinStreamToClientMessage_JoinResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJoinStreamToClientMessage_JoinResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): JoinStreamToClientMessage_JoinResponse {
    return {
      status: isSet(object.status)
        ? joinStreamToClientMessage_JoinResponse_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: JoinStreamToClientMessage_JoinResponse): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = joinStreamToClientMessage_JoinResponse_StatusToJSON(
        message.status
      ));
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<JoinStreamToClientMessage_JoinResponse>, I>
  >(object: I): JoinStreamToClientMessage_JoinResponse {
    const message = createBaseJoinStreamToClientMessage_JoinResponse();
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseJoinStreamToClientMessage_AcceptIndication(): JoinStreamToClientMessage_AcceptIndication {
  return { sessionId: "" };
}

export const JoinStreamToClientMessage_AcceptIndication = {
  encode(
    message: JoinStreamToClientMessage_AcceptIndication,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionId !== "") {
      writer.uint32(10).string(message.sessionId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): JoinStreamToClientMessage_AcceptIndication {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJoinStreamToClientMessage_AcceptIndication();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sessionId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): JoinStreamToClientMessage_AcceptIndication {
    return {
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
    };
  },

  toJSON(message: JoinStreamToClientMessage_AcceptIndication): unknown {
    const obj: any = {};
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<JoinStreamToClientMessage_AcceptIndication>, I>
  >(object: I): JoinStreamToClientMessage_AcceptIndication {
    const message = createBaseJoinStreamToClientMessage_AcceptIndication();
    message.sessionId = object.sessionId ?? "";
    return message;
  },
};

function createBaseJoinStreamToClientMessage_DisconnectIndication(): JoinStreamToClientMessage_DisconnectIndication {
  return { reason: 0 };
}

export const JoinStreamToClientMessage_DisconnectIndication = {
  encode(
    message: JoinStreamToClientMessage_DisconnectIndication,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.reason !== 0) {
      writer.uint32(8).int32(message.reason);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): JoinStreamToClientMessage_DisconnectIndication {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJoinStreamToClientMessage_DisconnectIndication();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reason = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): JoinStreamToClientMessage_DisconnectIndication {
    return {
      reason: isSet(object.reason)
        ? joinStreamToClientMessage_DisconnectIndication_ReasonFromJSON(
            object.reason
          )
        : 0,
    };
  },

  toJSON(message: JoinStreamToClientMessage_DisconnectIndication): unknown {
    const obj: any = {};
    message.reason !== undefined &&
      (obj.reason = joinStreamToClientMessage_DisconnectIndication_ReasonToJSON(
        message.reason
      ));
    return obj;
  },

  fromPartial<
    I extends Exact<
      DeepPartial<JoinStreamToClientMessage_DisconnectIndication>,
      I
    >
  >(object: I): JoinStreamToClientMessage_DisconnectIndication {
    const message = createBaseJoinStreamToClientMessage_DisconnectIndication();
    message.reason = object.reason ?? 0;
    return message;
  },
};

function createBaseGetInfoRequest(): GetInfoRequest {
  return { lobbyId: "" };
}

export const GetInfoRequest = {
  encode(
    message: GetInfoRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.lobbyId !== "") {
      writer.uint32(10).string(message.lobbyId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetInfoRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetInfoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lobbyId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetInfoRequest {
    return {
      lobbyId: isSet(object.lobbyId) ? String(object.lobbyId) : "",
    };
  },

  toJSON(message: GetInfoRequest): unknown {
    const obj: any = {};
    message.lobbyId !== undefined && (obj.lobbyId = message.lobbyId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetInfoRequest>, I>>(
    object: I
  ): GetInfoRequest {
    const message = createBaseGetInfoRequest();
    message.lobbyId = object.lobbyId ?? "";
    return message;
  },
};

function createBaseGetInfoResponse(): GetInfoResponse {
  return {
    opponentNickname: "",
    gameInfo: undefined,
    availableGames: [],
    settings: undefined,
  };
}

export const GetInfoResponse = {
  encode(
    message: GetInfoResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.opponentNickname !== "") {
      writer.uint32(10).string(message.opponentNickname);
    }
    if (message.gameInfo !== undefined) {
      GameInfo.encode(message.gameInfo, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.availableGames) {
      GameInfo.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.settings !== undefined) {
      Settings.encode(message.settings, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetInfoResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.opponentNickname = reader.string();
          break;
        case 2:
          message.gameInfo = GameInfo.decode(reader, reader.uint32());
          break;
        case 3:
          message.availableGames.push(GameInfo.decode(reader, reader.uint32()));
          break;
        case 4:
          message.settings = Settings.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetInfoResponse {
    return {
      opponentNickname: isSet(object.opponentNickname)
        ? String(object.opponentNickname)
        : "",
      gameInfo: isSet(object.gameInfo)
        ? GameInfo.fromJSON(object.gameInfo)
        : undefined,
      availableGames: Array.isArray(object?.availableGames)
        ? object.availableGames.map((e: any) => GameInfo.fromJSON(e))
        : [],
      settings: isSet(object.settings)
        ? Settings.fromJSON(object.settings)
        : undefined,
    };
  },

  toJSON(message: GetInfoResponse): unknown {
    const obj: any = {};
    message.opponentNickname !== undefined &&
      (obj.opponentNickname = message.opponentNickname);
    message.gameInfo !== undefined &&
      (obj.gameInfo = message.gameInfo
        ? GameInfo.toJSON(message.gameInfo)
        : undefined);
    if (message.availableGames) {
      obj.availableGames = message.availableGames.map((e) =>
        e ? GameInfo.toJSON(e) : undefined
      );
    } else {
      obj.availableGames = [];
    }
    message.settings !== undefined &&
      (obj.settings = message.settings
        ? Settings.toJSON(message.settings)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetInfoResponse>, I>>(
    object: I
  ): GetInfoResponse {
    const message = createBaseGetInfoResponse();
    message.opponentNickname = object.opponentNickname ?? "";
    message.gameInfo =
      object.gameInfo !== undefined && object.gameInfo !== null
        ? GameInfo.fromPartial(object.gameInfo)
        : undefined;
    message.availableGames =
      object.availableGames?.map((e) => GameInfo.fromPartial(e)) || [];
    message.settings =
      object.settings !== undefined && object.settings !== null
        ? Settings.fromPartial(object.settings)
        : undefined;
    return message;
  },
};

function createBaseGetSaveDataRequest(): GetSaveDataRequest {
  return { lobbyId: "" };
}

export const GetSaveDataRequest = {
  encode(
    message: GetSaveDataRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.lobbyId !== "") {
      writer.uint32(10).string(message.lobbyId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSaveDataRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSaveDataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lobbyId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetSaveDataRequest {
    return {
      lobbyId: isSet(object.lobbyId) ? String(object.lobbyId) : "",
    };
  },

  toJSON(message: GetSaveDataRequest): unknown {
    const obj: any = {};
    message.lobbyId !== undefined && (obj.lobbyId = message.lobbyId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetSaveDataRequest>, I>>(
    object: I
  ): GetSaveDataRequest {
    const message = createBaseGetSaveDataRequest();
    message.lobbyId = object.lobbyId ?? "";
    return message;
  },
};

function createBaseGetSaveDataResponse(): GetSaveDataResponse {
  return { saveData: new Uint8Array() };
}

export const GetSaveDataResponse = {
  encode(
    message: GetSaveDataResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.saveData.length !== 0) {
      writer.uint32(10).bytes(message.saveData);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSaveDataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSaveDataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.saveData = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetSaveDataResponse {
    return {
      saveData: isSet(object.saveData)
        ? bytesFromBase64(object.saveData)
        : new Uint8Array(),
    };
  },

  toJSON(message: GetSaveDataResponse): unknown {
    const obj: any = {};
    message.saveData !== undefined &&
      (obj.saveData = base64FromBytes(
        message.saveData !== undefined ? message.saveData : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetSaveDataResponse>, I>>(
    object: I
  ): GetSaveDataResponse {
    const message = createBaseGetSaveDataResponse();
    message.saveData = object.saveData ?? new Uint8Array();
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  arr.forEach((byte) => {
    bin.push(String.fromCharCode(byte));
  });
  return btoa(bin.join(""));
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
