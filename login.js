//Sebile/Beginning of Homepage-Header
// Language start
const languages = [
  {
    id: "en",
    name: "English",
  },
  {
    id: "tr",
    name: "Turkish",
  },
];
const selectBtn = document.querySelector("#select-btn");
const option1 = document.querySelector("#value1");
option1.textContent = languages[0].name;

selectBtn.addEventListener("click", () => {
  selectBtn.innerHTML = languages.map(
    (lang) => `<option>${lang.name}</option>`
  );
});
// Language end
//Responsive Navbar start
const menuBtn = document.querySelector("#menuBtn");
const headerNavbar = document.querySelector(".header-navbar");
menuBtn.addEventListener("click", () => {
  headerNavbar.classList.toggle("show-navbar");
});

document.addEventListener("click", (event) => {
  if (
    !event.target.closest(".header-navbar") &&
    !event.target.closest("#menuBtn")
  ) {
    headerNavbar.classList.remove("show-navbar");
  }
});

//Responsive Navbar end

let allProducts = [];
async function getProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    allProducts = data;
  } catch (error) {
    console.error(error);
  }
}

getProducts();

//Searchbar start
const searchIcon = document.querySelector("#header-search-icon");
const searchInput = document.querySelector(".searchbar input");
const listbar = document.querySelector("#product-list");

searchInput.addEventListener("keyup", (e) => {
  const inputValue = e.target.value.trim().toLowerCase();

  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(inputValue)
  );

  listbar.classList.add("product-lists");
  if (filteredProducts.length <= 0) {
    listbar.innerHTML = "<p>Ürün Bulunamadı</p>";
  } else {
    listbar.innerHTML = filteredProducts
      .map((item) => `<li><a href="#">${item.title}</a></li>`)
      .join("");
  }

  if (inputValue === "") {
    listbar.innerHTML = "";
    listbar.classList.remove("product-lists");
  }
});

//Searchbar end

//Sebile/End of Homepage-Header

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
      localStorage.setItem("userRole", "admin");
      location.href = "index.html";
    } else {
      alert(`${user.username} User Giriş Başarılı.`);
      localStorage.setItem("isUserLogin", true);
      localStorage.setItem("userRole", "user");
      location.href = "index.html";
    }
  } else {
    alert(`Kullanıcı adı veye şifre yanlış`);
  }
});
