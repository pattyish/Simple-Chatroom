const BASE = "http://localhost:8080/api/v1";
const login = async function () {
  // e.preventDefault();
  const username = document.querySelector("#log-username").value;
  const password = document.querySelector("#log-password").value;
  const messageDisplay = document.querySelector("#response-msg");

  if (password == "" || username == "") {
    console.log("Please User-name and password required!!");
  } else {
    try {
      const auth = {
        username: username,
        password: password,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(`${BASE}/chat/user/sign_in`, auth, config);
      if (res.status === 200) {
        localStorage.setItem("CC_Token", res.data.token);
        console.log(window.location);
        console.log(location)
        // window.location.href = `https://pattyish.github.io/FSE_Chatroom/front-end/chatroom.html`;
      }
    } catch (error) {
      console.log(error.response.data.message);
      messageDisplay.innerHTML = `
        <div class="alert alert-danger fade show" role="alert">
        ${error.response.data.message}  </div>`;
    }
  }
};
document.querySelector("#login").addEventListener("click", login);
