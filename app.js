const bestProductsContainer = document.querySelector("#bestProductsContainer");

let discountPrice = (price, discount) =>
  (price - (price * discount) / 100).toFixed(2);

function getStars(rating) {
  let stars = "";
  for (let i = 0; i < rating.toFixed(0); i++) {
    stars += `<img src="images/one-star.png"/>`;
  }
  return stars;
}

let allProducts = [];

async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  allProducts = data;
  const firstFourProducts = data.slice(0, 4);

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
              <img class="wishlist-img" onClick="addToWishlist(${
                product.id
              })" src="images/wishlist-icon.svg"/>
              <img class="cart-img" onClick="addToCart(${
                product.id
              })" src="images/cart-icon.svg"/>
              </div>
              <span class="sale-price">%30</span>
            </div>`;
    })
    .join("");
}

function addToWishlist(productId) {
  const wishlistProducts =
    JSON.parse(localStorage.getItem("wishlistProducts")) || [];

  const wishlistProduct = wishlistProducts.find(
    (product) => product.id === productId
  );

  if (!wishlistProduct) {
    const productToAddWishlist = allProducts.find(
      (product) => product.id === productId
    );
    localStorage.setItem(
      "wishlistProducts",
      JSON.stringify([...wishlistProducts, productToAddWishlist])
    );
  } else {
    deleteProductWishlist(productId);
  }
}

function deleteProductWishlist(deletedProductId) {
  const wishlistProducts =
    JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  const filteredWishlistProducts = wishlistProducts.filter(
    (product) => product.id !== deletedProductId
  );
  localStorage.setItem(
    "wishlistProducts",
    JSON.stringify(filteredWishlistProducts)
  );
}

function addToCart(productId) {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

  const cartProduct = cartProducts.find((product) => product.id === productId);

  if (!cartProduct) {
    const productToAddCart = allProducts.find(
      (product) => product.id === productId
    );
    localStorage.setItem(
      "cartProducts",
      JSON.stringify([...cartProducts, productToAddCart])
    );
  } else {
    deleteProductCart(productId);
  }
}

function deleteProductCart(deletedProductId) {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const filteredCartProducts = cartProducts.filter(
    (product) => product.id !== deletedProductId
  );
  localStorage.setItem("cartProducts", JSON.stringify(filteredCartProducts));
}

getProducts();
