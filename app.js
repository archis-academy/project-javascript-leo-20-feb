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

//Searchbar start
const searchIcon = document.querySelector("#header-search-icon");
const searchInput = document.querySelector(".searchbar input");
const listbar = document.querySelector("#product-list");

searchInput.addEventListener("input", async function () {
  const inputValue = searchInput.value.trim().toLowerCase();

  const response = await fetch("https://fakestoreapi.com/products");
  const dataProducts = await response.json();
  console.log(dataProducts);
  const filteredProducts = dataProducts.filter((product) =>
    product.title.toLowerCase().includes(inputValue)
  );
  listbar.classList.add("product-lists");
  if (filteredProducts.length === 0) {
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

//Woman-Men Pop-up start
const menLink = document.querySelector(".men-element");
const womanLink = document.querySelector(".woman-element");
const menPopup = document.createElement("ul");
const womanPopup = document.createElement("ul");

async function getMenProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const dataProducts = await response.json();

  const menProducts = dataProducts.filter(
    (product) => product.category === "men's clothing"
  );
  menLink.appendChild(menPopup);
  menPopup.classList.add("men-popup");
  menPopup.innerHTML = menProducts
    .map((item) => `<li>${item.title}</li>`)
    .join("");
}

menLink.addEventListener("mouseenter", function () {
  getMenProducts();
});
menLink.addEventListener("mouseleave", function () {
  menLink.removeChild(menPopup);
});

async function getWomanProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const dataProducts = await response.json();
  const womanProducts = dataProducts.filter(
    (product) => product.category === "women's clothing"
  );
  womanLink.appendChild(womanPopup);
  womanPopup.classList.add("woman-popup");
  womanPopup.innerHTML = womanProducts
    .map((item) => `<li>${item.title}</li>`)
    .join("");
}

womanLink.addEventListener("mouseenter", function () {
  getWomanProducts();
});
womanLink.addEventListener("mouseleave", function () {
  womanLink.removeChild(womanPopup);
});
//Woman-Men Pop-up end

//Slider start

//Slider end
//Sebile/End of Homepage-Header
