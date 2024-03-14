const usernameInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const loginBtn = document.querySelector("#loginBtn");

//Inputs Value Check
usernameInput.addEventListener("input", toggleButtonState);
passwordInput.addEventListener("input", toggleButtonState);

function toggleButtonState() {
  if (usernameInput.value !== "" && passwordInput.value !== "") {
    loginBtn.removeAttribute("disabled");
  } else {
    loginBtn.setAttribute("disabled", true);
  }
}

//User Login Code
const users = [
  {
    id: 1,
    username: "archisAdmin",
    password: "admin",
    role: "admin",
  },
  {
    id: 2,
    username: "archisUser",
    password: "user",
    role: "user",
  },
];

localStorage.setItem("isUserLogin", false);
localStorage.setItem("userList", JSON.stringify(users));

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const userList = JSON.parse(localStorage.getItem("userList")) || [];
  const user = userList.find((user) => {
    return (
      user.username === usernameInput.value &&
      user.password === passwordInput.value
    );
  });

  usernameInput.value = "";
  passwordInput.value = "";

  if (user) {
    if (user.role === "admin") {
      alert(`${user.username} Admin Giriş Başarılı.`);
      localStorage.setItem("isUserLogin", true);
      localStorage.setItem("userRole" , "admin");
      location.href = "index.html";
    } else {
      alert(`${user.username} User Giriş Başarılı.`);
      localStorage.setItem("isUserLogin", true);
      localStorage.setItem("userRole" , "user");
      location.href = "index.html";
    }
  } else {
    alert(`Kullanıcı adı veye şifre yanlış`);
  }
});



