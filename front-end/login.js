const login = async function () {
    // e.preventDefault();
    const username = document.querySelector("#log-username").value;
    const password = document.querySelector("#log-password").value;
  
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
        console.log("Hello world!!");
        if (res.status === 200) {
            window.location.href = `chatroom.html`;
        } else {
          console.log(`problem`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  document.querySelector("#login").addEventListener("click", login);
  