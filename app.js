const userLogin = JSON.parse(localStorage.getItem("isUserLogin")) || false;

if (!userLogin) {
  window.location.href = "login.html";
}

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

//Yüsra PR-2 Homepage Todays Products
const productCarousel = document.getElementById("productCarousel");
let currentIndex = 0;

async function getProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    allProducts = data;
    showProducts();
    getBestSellingProducts();
  } catch (error) {
    console.error("Hata oluştu.", error);
  }
}
getProducts();

function showProducts() {
  const productsToShow = allProducts.slice(currentIndex, currentIndex + 4);
  productCarousel.innerHTML = productsToShow
    .map((product) => {
      return `<div class="product-card">
                    <img class ="product-card-img" src ="${
                      product.image
                    }" alt = "${product.title}" />
                    <button onclick="addToCart(${
                      product.id
                    })" class="add-to-cart-btn" >Add To Cart</button>
                    <p class = "discount-rate">-50%</p>
                    <h3 class ="product-title">${product.title}</h3>
                    <div class="product-prices-container">
                        <p class ="product-price-discounted">$${(
                          product.price * 0.5
                        ).toFixed(2)}</p>
                        <s class ="product-price"> $${product.price}</s>
                     </div>
                    <p>${getStars(product.rating.rate)} (${
        product.rating.count
      })</p>

    
                    <div class="product-card-icons">
                        <svg onclick="addToWishlist(${
                          product.id
                        })" width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path id="heartIcon${
                            product.id
                          }" d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <img onclick="addToCart(${
                          product.id
                        })" src="images/cart-icon.svg"  class="cart-icon" id="cartIcon${
        product.id
      }" />
                     </div>
                     
                </div>`;
    })
    .join("");

  setHeartIcons();
  setCartIcons();
}
function getStars(rating) {
  let stars = ``;
  for (let i = 0; i < rating.toFixed(0); i++) {
    stars += `<img src="images/one-star.png" />`;
  }
  return stars;
}

function addToWishlist(productId, iconState) {
  // if (iconState === "bestSelling") {
  //   heartIcon = document.getElementById(`heartIconBestSelling${productId}`);
  // } else {
  //   heartIcon = document.getElementById(`heartIcon${productId}`);
  // }

  const heartIconParameter =
    iconState === "bestSelling"
      ? `heartIconBestSelling${productId}`
      : `heartIcon${productId}`;

  const heartIcon = document.getElementById(heartIconParameter);

  heartIcon.style.fill = "red";
  heartIcon.style.stroke = "red";

  // const heartIcon = document.getElementById(`heartIcon${productId}`);
  // const heartIcon = document.getElementById(
  //   `heartIconBestSelling${productId}`
  // );
  heartIcon.style.fill = "red";
  heartIcon.style.stroke = "red";

  const wishlistProducts =
    JSON.parse(localStorage.getItem("wishlistProducts")) || [];

  const wishlistProduct = wishlistProducts.find(
    (product) => product.id === productId
  );

  if (!wishlistProduct) {
    const productToAdd = allProducts.find(
      (product) => product.id === productId
    );
    localStorage.setItem(
      "wishlistProducts",
      JSON.stringify([...wishlistProducts, { ...productToAdd, quantity: 1 }])
    );
  } else {
    deleteFromWishlist(productId, iconState);
  }
}

function deleteFromWishlist(deletedProductId, iconState) {
  const heartIconParameter =
    iconState === "bestSelling"
      ? `heartIconBestSelling${deletedProductId}`
      : `heartIcon${deletedProductId}`;

  const heartIcon = document.getElementById(heartIconParameter);

  heartIcon.style.fill = "none";
  heartIcon.style.stroke = "black";

  const wishlistProducts =
    JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  const filteredProducts = wishlistProducts.filter(
    (product) => product.id !== deletedProductId
  );
  localStorage.setItem("wishlistProducts", JSON.stringify(filteredProducts));
}

function addToCart(productId) {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

  const cartProduct = cartProducts.find((product) => product.id === productId);

  if (!cartProduct) {
    const productToAdd = allProducts.find(
      (product) => product.id === productId
    );
    localStorage.setItem(
      "cartProducts",
      JSON.stringify([...cartProducts, productToAdd])
    );
    const cartIcon = document.getElementById(`cartIcon${productId}`);
    cartIcon.setAttribute("src", "images/check-icon.svg");
  } else {
    deleteFromCart(productId);
  }
}

function deleteFromCart(deletedProductId) {
  const cartIcon = document.getElementById(`cartIcon${deletedProductId}`);
  cartIcon.setAttribute("src", "images/cart-icon.svg");

  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const filteredProducts = cartProducts.filter(
    (product) => product.id !== deletedProductId
  );
  localStorage.setItem("cartProducts", JSON.stringify(filteredProducts));
}

function nextProduct() {
  currentIndex = (currentIndex + 1) % allProducts.length;
  showProducts();
}

function prevProduct() {
  currentIndex = (currentIndex - 1 + allProducts.length) % allProducts.length;
  showProducts();
}
const viewAllBtn = document.getElementById("viewAllBtn");

viewAllBtn.addEventListener("click", function () {
  if (viewAllBtn.textContent === "View All Products") {
    showAllProducts();
    viewAllBtn.textContent = "View Less";
  } else {
    showProducts();
    viewAllBtn.textContent = "View All Products";
  }
});

function showAllProducts() {
  productCarousel.innerHTML = allProducts
    .map((product) => {
      return `<div class="product-card">
                    <img class ="product-card-img" src ="${
                      product.image
                    }" alt = "${product.title}" />
                    <button onclick="addToCart(${
                      product.id
                    })" class="add-to-cart-btn" >Add To Cart</button>
                    <p class = "discount-rate">-50%</p>
                    <h3 class ="product-title">${product.title}</h3>
                    <div class="product-prices-container">
                        <p class ="product-price-discounted">$${(
                          product.price * 0.5
                        ).toFixed(2)}</p>
                        <s class ="product-price"> $${product.price}</s>
                     </div>
                    <p>${getStars(product.rating.rate)} (${
        product.rating.count
      })</p>

    
                    <div class="product-card-icons">
                        <svg onclick="addToWishlist(${
                          product.id
                        }, "flashProducts")" width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path id="heartIcon${
                            product.id
                          }" d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <img onclick="addToCart(${
                          product.id
                        })" src="images/cart-icon.svg"  class="cart-icon" id="cartIcon${
        product.id
      }" />
                     </div>
                     
                </div>`;
    })
    .join("");

  setHeartIcons();
  setCartIcons();
}

function setHeartIcons() {
  const wishlistProducts =
    JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  wishlistProducts.forEach((product) => {
    if (product.id) {
      // product.id tanımlı mı diye kontrol et
      const heartIcon = document.getElementById(`heartIcon${product.id}`);
      if (heartIcon) {
        // heartIcon null değil mi diye kontrol et
        heartIcon.style.fill = "red";
        heartIcon.style.stroke = "red";
      }
    }
  });
}
function setCartIcons() {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  cartProducts.forEach((product) => {
    if (product.id) {
      const cartIcon = document.getElementById(`cartIcon${product.id}`);
      if (cartIcon) {
        cartIcon.setAttribute("src", "images/check-icon.svg");
      }
    }
  });
}

//Yüsra PR-2 Homepage Todays Products End

// Sebile/PR-3 Beginning of browse by category
const categoryContents = [
  {
    image: "images/Category-CellPhone.svg",
    title: "Phones",
  },
  {
    image: "images/Category-Computer.svg",
    title: "Computers",
  },
  {
    image: "images/Category-SmartWatch.svg",
    title: "SmartWatch",
  },
  {
    image: "images/Category-Camera.svg",
    title: "Camera",
  },
  {
    image: "images/Category-Headphone.svg",
    title: "Headphones",
  },
  {
    image: "images/Category-Gamepad.svg",
    title: "Gaming",
  },
  {
    image: "images/Category-CellPhone.svg",
    title: "Phones",
  },
  {
    image: "images/Category-Computer.svg",
    title: "Computers",
  },
];

const categoryBoxes = document.querySelector(".category-boxes");
const movetoLeftIcon = document.querySelector(".move-to-left-icon");
const movetoRightIcon = document.querySelector(".move-to-right-icon");
let currIndex = 0;

function renderCategories() {
  categoryBoxes.innerHTML = "";
  for (let i = currIndex; i < currIndex + 6; i++) {
    let category = categoryContents[i];

    let categoryBox = document.createElement("div");
    categoryBox.classList.add("category-box");

    categoryBox.innerHTML = `<img src=${category.image} alt=${category.title}/>
        <p>${category.title}`;
    categoryBoxes.appendChild(categoryBox);
  }
}
renderCategories();

function movetoLeftCategories() {
  if (currIndex > 0) {
    currIndex--;
    renderCategories();
  }
}
function movetoRightCategories() {
  if (currIndex < categoryContents.length - 6) {
    currIndex++;
    renderCategories();
  }
}

movetoLeftIcon.addEventListener("click", () => {
  movetoLeftCategories();
});
movetoRightIcon.addEventListener("click", () => {
  movetoRightCategories();
});
//Sebile/PR-3 Beginning of browse by category

/* BURASI BENİMKİ (MÜCAHİT) */

const bestProductsContainer = document.querySelector("#bestProductsContainer");

let discountPrice = (price, discount) =>
  (price - (price * discount) / 100).toFixed(2);

function getBestSellingProducts() {
  const firstFourProducts = allProducts.slice(0, 4);

  bestProductsContainer.innerHTML = firstFourProducts
    .map((product) => {
      return `<div class="best-products">
              <img class="best-products-img" src="${product.image}" alt="${
        product.title
      }">
              <h3 class="best-products-title"> ${product.title}</h3>
              <div class="best-products-price">
              <p>$${discountPrice(product.price, 30)}</p>
              <s>$${product.price}</s>
              </div>
              <div class="best-products-rate">
              <p>${getStars(product.rating.rate)}</p>
              <p>(${product.rating.count})</p>
              </div>
              <div class="wishlist-and-cart">
               <svg onclick="addToWishlist(${
                 product.id
               }, 'bestSelling')" width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path id="heartIconBestSelling${
                            product.id
                          }" d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
              <img class="cart-img" onClick="addToCart(${
                product.id
              })" src="images/cart-icon.svg"/>
              </div>
              <span class="sale-price">%30</span>
            </div>`;
    })
    .join("");
}
