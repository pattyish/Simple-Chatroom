import moment from "moment";
class MessageSchema {
  constructor(msg) {
    this.sender = msg.sender;
    this.message = msg.message;
    this.createdAt = moment().format();
  }

  static chatMessage() {
    return {
      user: this.sender,
      msg: this.message,
    };
  }
}

export { MessageSchema as default };
