const socket = io.connect("http://localhost:8080", {
  transports: ["websocket"],
});
socket.on("chat", (playload) => {
  // const div = document.createElement("div");
  let message = `
  <div class=" col-md-12 bg-light chatroom-messages">
  <div class="row justify-content-between messages">
    <div class="col-4">
      <h6>${playload.sender_id}</h6>
    </div>
    <div class="col-4 msg-date-time">
      <h6>2020-01-17</h6>
    </div>
    <div class="col-12">
      <p>${playload.message}</p>
    </div>
  </div>
</div>`;
// div.innerHTML = message;

  console.log(
    `Chat message have reached out with ${playload.name} and ${playload.message}`
  );
  document.getElementById("message-box").innerHTML += message;
});

const postMessage = () => {
  const message = document.querySelector("#text-message").value;
  if (message == "") {
    console.log("You cannot sent empty string!!!");
  } else {
    socket.emit("chatroom", {
      user_id: 0023441,
      name: "Patrick Ishimwe",
      message: message,
    });
  }
};

document.querySelector("#post-message").addEventListener("click", postMessage);
