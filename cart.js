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
//Main start
const productsTable = document.querySelector(".products-table");
const subtotal = document.querySelector(".subtotal span");
const updateBtn = document.querySelector(".update-btn");
const couponInput = document.querySelector(".coupon-box input");
const applyBtn = document.querySelector(".coupon-box button");
const removeIcon = document.querySelector(".remove-icon");
const emptyContainer = document.querySelector(".empty-container");
const cartProductList = [
  {
    id: 1,
    title: "gömlek",
    image: "images/arrival1.png",
    price: 100,
    quantity: 2,
  },
  {
    id: 2,
    title: "gömlek",
    image: "images/arrival2.png",
    price: 100,
    quantity: 2,
  },
  {
    id: 3,
    title: "gömlek",
    image: "images/arrival3.png",
    price: 100,
    quantity: 2,
  },
];

const coupons = [
  {
    id: 1,
    kod: "YUZDE10",
    discount: 10,
  },
  {
    id: 2,
    kod: "YUZDE20",
    discount: 20,
  },
];

localStorage.setItem("cartProducts", JSON.stringify(cartProductList));

function renderCartProducts() {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  if (cartProducts.length > 0) {
    productsTable.innerHTML = cartProducts
      .map((product) => {
        return `<tr><td onclick="deleteFromCardProducts(${
          product.id
        })" class="image-td"><img src=${product.image}><p>${
          product.title
        }</p><img class="remove-icon" src="images/remove.png"/></td>
    <td>${product.price}</td>
    <td><span class="quantity-box">${
      product.quantity
    }<span ><img class="up-icon" onclick="incrementQuantity(${
          product.id
        })" src="images/angle-up-solid.svg"> <img class="down-icon" onclick="decrementQuantity(${
          product.id
        })" src="images/angle-down-solid.svg"> </span></span>
    </td>
    <td>${product.quantity * product.price}</td></tr>`;
      })
      .join("");
  } else {
    emptyContainer.innerHTML = `<div class="empty-cart"><h1>Your cart is empty</h1>
    <p>Looks like you have no items in your shopping cart.</p><button class="red-button"><a href="index.html">Shop Now</a></button></div>`;
  }
}

renderCartProducts();
function incrementQuantity(productId) {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const updatedProducts = cartProducts.map((product) => {
    if (product.id === productId) {
      return { ...product, quantity: product.quantity + 1 };
    }
    return product;
  });
  localStorage.setItem("cartProducts", JSON.stringify(updatedProducts));
  renderCartProducts();
}

function deleteFromCart(deletedProductId) {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const filteredProducts = cartProducts.filter(
    (product) => product.id !== deletedProductId
  );
  localStorage.setItem("cartProducts", JSON.stringify(filteredProducts));
  renderCartProducts();
}

function decrementQuantity(productId) {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

  const updatedProducts = cartProducts
    .map((product) => {
      if (productId === product.id) {
        if (product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        } else {
          deleteFromCart(product.id);
          return null;
        }
      }
      return product;
    })
    .filter(Boolean);

  localStorage.setItem("cartProducts", JSON.stringify(updatedProducts));
  renderCartProducts();
}

function calculateTotal() {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const total = cartProducts.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  return total.toFixed(2);
}

subtotal.innerHTML = calculateTotal();
updateBtn.addEventListener("click", () => {
  subtotal.innerHTML = calculateTotal();
});

function makeDiscount(price, discount) {
  return price - (price * discount) / 100;
}

function applyDiscount() {
  const totalPrice = calculateTotal();
  const inputValue = couponInput.value;
  const coupon = coupons.find((coupon) => coupon.kod === inputValue);
  if (coupon) {
    const updatedPrice = makeDiscount(totalPrice, coupon.discount);
    subtotal.textContent = `${updatedPrice}`;
  } else {
    alert("Invalid coupon!");
  }
}

applyBtn.addEventListener("click", () => {
  applyDiscount();
});

function deleteFromCardProducts(deletedProductId) {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const filteredProducts = cartProducts.filter(
    (product) => product.id !== deletedProductId
  );
  localStorage.setItem("cartProducts", JSON.stringify(filteredProducts));
  renderCartProducts();
}

//main end
