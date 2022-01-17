import DbOperation from "../Database/dbOperation.js";

const db = new DbOperation("chat_messages");
class ChatroomController {
  static async getChats(req, res) {
    try {
      const chats = await db.getAll();
      if (!chats.rows) {
        return res.status(404).json({
          status: 404,
          message: "No Chats Found yet!!!",
        });
      }
      res.status(200).json({
        status: 200,
        message: "All Chats",
        chats: chats.rows,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        msg: "Server Error!!",
      });
    }
  }
}

export { ChatroomController as default };
