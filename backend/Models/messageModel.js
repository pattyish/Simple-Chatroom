class MessageSchema {
  constructor(msg) {
    this.sender_id = msg.sender_id;
    this.message = msg.message;
    // this.createdAt = moment().format();
  }

  static chatMessage() {
    return {
      user: this.sender,
      msg: this.message,
    };
  }
}

export { MessageSchema as default };
