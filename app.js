const productCarousel = document.getElementById("productCarousel");
let currentIndex = 0;
let products = [];

async function getProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    console.log(data);
    products = data;
    showProducts();
  } catch (error) {
    console.error("Hata oluştu.", error);
  }
}

function showProducts() {
  const productsToShow = products.slice(currentIndex, currentIndex + 4);
  productCarousel.innerHTML = productsToShow
    .map((product) => {
      return `<div class="product-card">
                    <img class ="product-card-img" src ="${
                      product.image
                    }" alt = "${product.title}" />
                    <button class="add-to-cart-btn" id="addToCartBtn">Add To Cart</button>
                    <p class = "discount-rate">-50%</p>
                    <h3 class ="product-title">${product.title}</h3>
                    <div class="product-prices-container">
                        <p class ="product-price-discounted">$${
                          product.price * 0.5
                        }</p>
                        <s class ="product-price"> $${product.price}</s>
                     </div>
                    <p>${product.rating.rate} (${product.rating.count})</p>
    
                    <div class="product-card-icons">
                        <img onclick="addToWishlist(${
                          product.id
                        })" src="images/wishlist-icon.svg" class="wishlist-icon" />
                        <img onclick="addToCart(${
                          product.id
                        })" src="images/cart-icon.svg"  class="cart-icon" />
                     </div>
                     
                </div>`;
    })
    .join("");
}

getProducts();

function addToWishlist(productId) {
  const wishlistProducts =
    JSON.parse(localStorage.getItem("wishlistProducts")) || [];

  const wishlistProduct = wishlistProducts.find(
    (product) => product.id === productId
  );

  if (!wishlistProduct) {
    const productToAdd = products.find((product) => product.id === productId);
    localStorage.setItem(
      "wishlistProducts",
      JSON.stringify([...wishlistProducts, productToAdd])
    );
  } else {
    deleteFromWishlist(productId);
  }
}

function deleteFromWishlist(deletedProductId) {
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

function nextProduct() {
  currentIndex = (currentIndex + 1) % products.length;
  showProducts();
}

function prevProduct() {
  currentIndex = (currentIndex - 1 + products.length) % products.length;
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
  productCarousel.innerHTML = products
    .map((product) => {
      return `<div class="product-card">
                    <img class ="product-card-img" src ="${
                      product.image
                    }" alt = "${product.title}" />
                    <button class="add-to-cart-btn" id="addToCartBtn">Add To Cart</button>
                    <p class = "discount-rate">-50%</p>
                    <h3 class ="product-title">${product.title}</h3>
                    <div class="product-prices-container">
                        <p class ="product-price-discounted">$${
                          product.price * 0.5
                        }</p>
                        <s class ="product-price"> $${product.price}</s>
                     </div>
                    <p>${product.rating.rate} (${product.rating.count})</p>
    
                    <div class="product-card-icons">
                        <img onclick="addToWishlist(${
                          product.id
                        })" src="images/wishlist-icon.svg" class="wishlist-icon" />
                        <img onclick="addToCart(${
                          product.id
                        })" src="images/cart-icon.svg"  class="cart-icon" />
                     </div>
                     
                </div>`;
    })
    .join("");
}
