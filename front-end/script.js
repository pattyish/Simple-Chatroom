const BASE = "http://localhost:8080/api/v1";
// user login
const register = async () => {
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
      // console.log({ name: name, username: username, password: password});
      // console.log(BASE);
      const res = await axios.post(`${BASE}/chat/user/sign_in`, auth, config);
      console.log(res);
      if (res.status === 200) {
      } else {
        console.log(`problem`);
      }
    } catch (error) {
      console.log(error);
    }
  }
};
