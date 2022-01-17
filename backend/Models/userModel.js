import moment from "moment";
import bcrypt from "bcryptjs";

class UserSchema {
  constructor(user) {
    this.name = user.name;
    this.username = user.username;
    this.password = bcrypt.hashSync(user.password, 10);
    this.createdAt = moment().format();
  }

  static user() {
    return {
      name: this.name,
      username: this.username,
    };
  }
}

export { UserSchema as default };
