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

//WİSLİST PAGE JS
const productCarousel = document.getElementById("productCarousel");
const wishlistIsEmpty = document.querySelector(".wishlist-is-empty");
const wishlistLength = document.querySelector(".wishlist-counter");
const movetoLeftIcon = document.querySelector(".move-to-left-icon");
const movetoRightIcon = document.querySelector(".move-to-right-icon");
let currIndex = 0;
let products = [];


function getWishlistProducts() {
  try {
    const response = JSON.parse(localStorage.getItem("wishlistProducts")) || [];
    products = response;
    showProducts();
  } catch (error) {
    console.log("Hata Oluştu.", error);
  }
}

function showProducts() {
  if (products.length === 0) {
    wishlistIsEmpty.innerHTML = `<div class = "whislist-empty">
    <h1>Your Wishlist is Empty</h1>
    <p>Add some products to your wishlist to start shopping</p>
    <a href="index.html" class="back-to-shop-btn">Back to Shop</a>
    </div>`;
    wishlistLength.innerHTML = `Wishlist (${products.length})`;
    productCarousel.innerHTML = "";
  } else {
    productCarousel.innerHTML = products
      .map((product) => {
        return `<div class="product-card">
    <img class ="product-card-img" src ="${product.image}" alt = "${product.title}"/> 
    <button class="add-to-cart-btn" id="addToCartBtn" onclick="addToCart(${product.id})">Add To Cart</button>
    <p class = "discount-rate">-50%</p>
    <h3 class ="product-title">${product.title}</h3>
    <div class="product-prices-container">
      <p class ="product-price-discounted">$${(product.price * 0.5).toFixed(2)}</p>
      <s class ="product-price"> $${product.price}</s>
    </div>
    <div class="product-card-icons">
      <img onclick="deleteFromWishlist(${product.id})" src="images/trash.svg" class="trash-icon" />
    </div>
    </div>`;
      })
      .join("");
    wishlistLength.innerHTML = `Wishlist (${products.length})`;
  }
}

getWishlistProducts();

function deleteFromWishlist(deletedProductId) {
  const wishlistProducts =
     JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  const filteredProducts = wishlistProducts.filter(
    (product) => product.id !== deletedProductId
  );
  localStorage.setItem("wishlistProducts", JSON.stringify(filteredProducts));
  getWishlistProducts();
  console.log(products);
}

function addToCart(productId) {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const cartProduct = cartProducts.find((product) => product.id === productId);

  if (!cartProduct) {
    const productToAdd = products.find((product) => product.id === productId);
    localStorage.setItem(
      "cartProducts",
      JSON.stringify([...cartProducts, productToAdd])
    );
  } else {
    deleteFromCart(productId);
  }
}

function deleteFromCart(deletedProductId) {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const filteredProducts = cartProducts.filter(
    (product) => product.id !== deletedProductId
  );
  localStorage.setItem("cartProducts", JSON.stringify(filteredProducts));
}

// ALL TO BAG MOVE CODES
function moveAllToBag() {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const filteredProducts = products.filter(
    (product) =>
      !cartProducts.some((cartProduct) => cartProduct.id === product.id)
  );
  localStorage.setItem(
    "cartProducts",
    JSON.stringify([...cartProducts, ...filteredProducts])
  );
}
