const BASE = "http://localhost:8080/api/v1";
// user login
const register = async function () {
  // e.preventDefault();
  const name = document.querySelector("#reg-name").value;
  const username = document.querySelector("#reg-username").value;
  const password = document.querySelector("#reg-password").value;

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
      // const res = await axios.get('https://api.github.com/users')
      console.log("Hello world!!");
      console.log(res)
      if (res.status === 201) {
        console.log(res);
      } else {
        console.log(`problem`);
      }
    } catch (error) {
      console.log(error.response);
    }
  }
};
document.querySelector("#register").addEventListener("click", register);

