const socket = io.connect("http://localhost:8080", {
  transports: ["websocket"],
});
socket.on("chat", (playload) => {
  console.log(
    `Chat message have reached out with ${playload.name} and ${playload.message}`
  );
  document.getElementById("name").innerHTML = playload.name;
  document.getElementById("message").innerHTML = playload.message;
});
socket.emit("chatroom", {
  user_id: 12222,
  name: "Patrick Ishimwe",
  message: "This is start of the semester",
});
