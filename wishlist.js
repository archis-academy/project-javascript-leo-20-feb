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
const wishlistLength = document.querySelector(".wishlist-counter");
const movetoLeftIcon = document.querySelector(".move-to-left-icon");
const movetoRightIcon = document.querySelector(".move-to-right-icon");
let currIndex = 0;
let products = [
  {
    id: 1,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    price: 109.95,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops ",
  },
  {
    id: 2,
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    price: 22.3,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
  },
  {
    id: 3,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    price: 109.95,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  },
  {
    id: 4,
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    price: 22.3,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
  },
  {
    id: 5,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    price: 109.95,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  },
  {
    id: 6,
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    price: 22.3,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
  },
];

localStorage.setItem("wishlistProducts", JSON.stringify(products));

function getProducts() {
  try {
    const response = JSON.parse(localStorage.getItem("wishlistProducts")) || [];
    products = response;
    showProducts();
  } catch (error) {
    console.log("Hata Oluştu.", error);
  }
}

function showProducts() {
 
  productCarousel.innerHTML = products
    .map((product) => {
      return `<div class="product-card">
      <svg id="favoriteIcon${product.id}" onclick="addToWishlist(${product.id})" class="explore-svg-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="favoriteIconPath${product.id}" d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
    <img class ="product-card-img" src ="${product.image}" alt = "${
        product.title
      }" /> 
    <button class="add-to-cart-btn" id="addToCartBtn" onclick="addToCart(${product.id})">Add To Cart</button>
    <p class = "discount-rate">-50%</p>
    <h3 class ="product-title">${product.title}</h3>
    
    <div class="product-prices-container">
        <p class ="product-price-discounted">$${(product.price * 0.5).toFixed(2)}</p>
        <s class ="product-price"> $${product.price}</s>
     </div>
    

    <div class="product-card-icons">
        <img onclick="deleteFromWishlist(${
          product.id
        })" src="images/trash.svg" class="trash-icon" />
     </div>
     
</div>`;
    })
    .join("");
  wishlistLength.innerHTML = `Wishlist (${products.length})`;
}

getProducts(); 

function deleteFromWishlist(deletedProductId){
    const wishlistProducts =
    JSON.parse(localStorage.getItem("wishlistProducts")) || [];
    const filteredProducts = wishlistProducts.filter(
        (product) => product.id !== deletedProductId
    );
    localStorage.setItem("wishlistProducts", JSON.stringify(filteredProducts));
    getProducts();
}

function addToCart(productId) {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const cartProduct = cartProducts.find((product) => product.id === productId);

    if(!cartProduct){
    const productToAdd = products.find((product) => product.id === productId);
    localStorage.setItem("cartProducts", JSON.stringify([...cartProducts, productToAdd]));
    } else{
        deleteFromCart(productId);
    }
}

function deleteFromCart(deletedProductId){
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
      (product) => !cartProducts.some((cartProduct) => cartProduct.id === product.id)
    );
    localStorage.setItem("cartProducts", JSON.stringify([...cartProducts, ...filteredProducts]));
}
