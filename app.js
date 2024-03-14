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

//Carousel start
const carouselImage = document.querySelector("#carouselImage");

const carouselDots = document.querySelectorAll(".dot");

function handleDotClick(index) {
  carouselDots.forEach((dot, i) => {
    dot.classList.toggle("active-dot", i === index);
  });
  carouselImage.src = `./images/carousel${index + 1}.png`;
}

carouselDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    handleDotClick(index);
  });
});

setInterval(() => {
  let activeDotIndex = 0;
  carouselDots.forEach((dot, index) => {
    if (dot.classList.contains("active-dot")) {
      activeDotIndex = index;
    }
  });
  activeDotIndex = (activeDotIndex + 1) % carouselDots.length;
  handleDotClick(activeDotIndex);
}, 3000);
//Carousel end

//Sebile/End of Homepage-Header
