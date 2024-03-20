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
getProducts();

function showProducts() {
  const productsToShow = products.slice(currentIndex, currentIndex + 4);
  productCarousel.innerHTML = productsToShow
    .map((product) => {
      return `<div class="product-card">
                    <img class ="product-card-img" src ="${product.image
        }" alt = "${product.title}" />
                    <button onclick="addToCart(${product.id
        })" class="add-to-cart-btn" >Add To Cart</button>
                    <p class = "discount-rate">-50%</p>
                    <h3 class ="product-title">${product.title}</h3>
                    <div class="product-prices-container">
                        <p class ="product-price-discounted">$${(
          product.price * 0.5
        ).toFixed(2)}</p>
                        <s class ="product-price"> $${product.price}</s>
                     </div>
                    <p>${getStars(product.rating.rate)} (${product.rating.count
        })</p>

    
                    <div class="product-card-icons">
                        <svg onclick="addToWishlist(${product.id
        })" width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path id="heartIcon${product.id
        }" d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <img onclick="addToCart(${product.id
        })" src="images/cart-icon.svg"  class="cart-icon" id="cartIcon${product.id
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


function addToWishlist(productId) {
  const heartIcon = document.getElementById(`heartIcon${productId}`);
  heartIcon.style.fill = "red";
  heartIcon.style.stroke = "red";

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
  const heartIcon = document.getElementById(`heartIcon${deletedProductId}`);
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
    const productToAdd = products.find((product) => product.id === productId);
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
                    <img class ="product-card-img" src ="${product.image
        }" alt = "${product.title}" />
                    <button onclick="addToCart(${product.id
        })" class="add-to-cart-btn" >Add To Cart</button>
                    <p class = "discount-rate">-50%</p>
                    <h3 class ="product-title">${product.title}</h3>
                    <div class="product-prices-container">
                        <p class ="product-price-discounted">$${(
          product.price * 0.5
        ).toFixed(2)}</p>
                        <s class ="product-price"> $${product.price}</s>
                     </div>
                    <p>${getStars(product.rating.rate)} (${product.rating.count
        })</p>

    
                    <div class="product-card-icons">
                        <svg onclick="addToWishlist(${product.id
        })" width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path id="heartIcon${product.id
        }" d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <img onclick="addToCart(${product.id
        })" src="images/cart-icon.svg"  class="cart-icon" id="cartIcon${product.id
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
    if (product.id) { // product.id tanımlı mı diye kontrol et
      const heartIcon = document.getElementById(`heartIcon${product.id}`);
      if (heartIcon) { // heartIcon null değil mi diye kontrol et
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
