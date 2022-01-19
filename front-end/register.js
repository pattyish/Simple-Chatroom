const BASE = "http://localhost:8080/api/v1";
// user login
const register = async function () {
  // e.preventDefault();
  const name = document.querySelector("#reg-name").value;
  const username = document.querySelector("#reg-username").value;
  const password = document.querySelector("#reg-password").value;
  const messageDisplay = document.querySelector("#response-msg");

  if (name == "" || password == "" || username == "") {
    console.log("Please All Field Are Required!!");
  } else if (password.length < 6) {
    console.log("Password should have at least six characters!!");
  } else {
    try {
      const auth = {
        name: name,
        username: username,
        password: password,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log({ name: name, username: username, password: password });
      console.log(BASE);
      const res = await axios.post(`${BASE}/chat/user/sign_up`, auth, config);
      if (res.status === 201) {
        messageDisplay.innerHTML = `
        <div class="alert alert-success fade show" role="alert">
        ${res.data.message}  </div>`;
        name.value = "";
        username.value = "";
        password.value = "";
      }
    } catch (error) {
      console.log(error.response.data.message);
      messageDisplay.innerHTML = `
        <div class="alert alert-danger fade show" role="alert">
        ${error.response.data.message}  </div>`;
    }
  }
};
document.querySelector("#register").addEventListener("click", register);
