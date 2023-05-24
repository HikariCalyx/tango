pub fn parser(charset: &[String]) -> crate::msg::Parser {
    crate::msg::Parser::builder()
        .add_stop_rule(b"\xe5")
        .add_charset_rules(charset, 0xe4)
        .add_text_rule(b"\xe8", "\n")
        .add_command_rule(b"\xe6", 1)
        .add_command_rule(b"\xe7\x01", 0)
        .add_command_rule(b"\xe7\x02", 0)
        .add_command_rule(b"\xe7\x03", 0)
        .add_command_rule(b"\xed\x00", 2)
        .add_command_rule(b"\xf0\x00", 1)
        .add_command_rule(b"\xfc\x06", 0)
        .build()
}
