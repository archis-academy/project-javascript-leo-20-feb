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

//Woman-Men Pop-up start
const menLink = document.querySelector(".men-element");
const womanLink = document.querySelector(".woman-element");
const menPopup = document.createElement("ul");
const womanPopup = document.createElement("ul");

async function getMenProducts() {
  const menProducts = allProducts.filter(
    (product) => product.category === "men's clothing"
  );
  menLink.appendChild(menPopup);
  menPopup.classList.add("men-popup");
  menPopup.innerHTML = menProducts
    .map((item) => `<li>${item.title}</li>`)
    .join("");
}

menLink.addEventListener("mouseenter", () => {
  getMenProducts();
});
menLink.addEventListener("mouseleave", () => {
  menLink.removeChild(menPopup);
});

async function getWomanProducts() {
  const womanProducts = allProducts.filter(
    (product) => product.category === "women's clothing"
  );
  womanLink.appendChild(womanPopup);
  womanPopup.classList.add("woman-popup");
  womanPopup.innerHTML = womanProducts
    .map((item) => `<li>${item.title}</li>`)
    .join("");
}

womanLink.addEventListener("mouseenter", () => {
  getWomanProducts();
});
womanLink.addEventListener("mouseleave", () => {
  womanLink.removeChild(womanPopup);
});
//Woman-Men Pop-up end

//Slider start
let slideIndex = 3;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("my-slides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active-dot", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active-dot";
}
//Slider end
//Sebile/End of Homepage-Header
