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
    (lang) => `<option class="language-option">${lang.name}</option>`
  );
});
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
async function getProductsForNavbar() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    allProducts = data;
  } catch (error) {
    console.error(error);
  }
}

getProductsForNavbar();

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

//sebile/PR-13 Founders start
const employeeInformations = [
  {
    image: "images/Tom-Cruise.png",
    name: "Tom Cruise",
    position: "Founder & Chairman",
    instagram: "https://www.instagram.com/tomcruise?igsh=b2NjOXBnOHVwZjl2",
    twitter: "https://x.com/tomcruise?s=21&t=xJ9BZGywG-kvR4l7Us4d4w",
  },
  {
    image: "images/Emma-Watson.png",
    name: "Emma Watson",
    position: "Managing Director",
    instagram: "https://www.instagram.com/emmawatson?igsh=bzJncWEyeHo0cHdw",
    twitter: "https://x.com/emmawatson?s=21&t=xJ9BZGywG-kvR4l7Us4d4w",
  },
  {
    image: "images/Will-Smith.png",
    name: "Will Smith",
    position: "Product Designer",
    instagram: "https://www.instagram.com/willsmith?igsh=MXM3OTNlb3RzaG9haw==",
    twitter: "https://x.com/teamwilldaily?s=21&t=xJ9BZGywG-kvR4l7Us4d4w",
  },
  {
    image: "images/Will-Smith.png",
    name: "Max Verstappen",
    position: "Data Analyst",
    instagram:
      "https://www.instagram.com/maxverstappen1?igsh=MXYwcnp2a3EzYjg1eA==",
    twitter: "https://x.com/max33verstappen?s=21&t=xJ9BZGywG-kvR4l7Us4d4w",
  },
  {
    image: "images/Tom-Cruise.png",
    name: "Charles Leclerc",
    position: "Digital Marketing Specialist",
    instagram:
      "https://www.instagram.com/charles_leclerc?igsh=MWNnNWhzOHh0MmR3eQ==",
    twitter: "https://x.com/charles_leclerc?s=21&t=xJ9BZGywG-kvR4l7Us4d4w",
  },
  {
    image: "images/Emma-Watson.png",
    name: "Anya Taylor-Joy",
    position: "Logistics Coordinator",
    instagram: "https://www.instagram.com/anyataylorjoy?igsh=bGx5YTlnMDYxOTA2",
    twitter: "https://x.com/anyajoynews?s=21&t=xJ9BZGywG-kvR4l7Us4d4w",
  },
];

const employeeCards = document.querySelector(".employee-cards");

let currIndex = 0;

function renderCards() {
  employeeCards.innerHTML = "";
  for (let i = currIndex; i < currIndex + 3; i++) {
    let employee = employeeInformations[i];

    let cardBox = document.createElement("div");
    cardBox.classList.add("card-box");

    cardBox.innerHTML = `<img src=${employee.image} alt=${employee.name}/>
        <h3>${employee.name}</h3><p>${employee.position}</p><div><a href=${employee.twitter} target="_blank"><img src="images/Vector-twitter.svg"/></a><a href=${employee.instagram} target="_blank"><img src="images/Vector-instagram.svg"/></a></div>`;
    employeeCards.appendChild(cardBox);
  }
}
renderCards();
const carouselDots = document.querySelectorAll(".dot");
function handleDotClick(index) {
  carouselDots.forEach((dot, i) => {
    dot.classList.toggle("active-dot", i === index);
  });
  if (currIndex === 0) {
    currIndex += 3;
  } else {
    currIndex -= 3;
  }
  renderCards();
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
//sebile/PR-13 Founders end
// Quantity icon start
function addToWishCount() {
  const wishCount = JSON.parse(localStorage.getItem("wishlistProducts") || []);
  const wishItemCountElement = document.getElementById("wish-item-count");
  if (wishCount.length > 0) {
    wishItemCountElement.textContent = `${wishCount.length}`;
    wishItemCountElement.classList.add("quantity-icon");
  } else {
    wishItemCountElement.textContent = ``;
    wishItemCountElement.classList.remove("quantity-icon");
  }
}
addToWishCount();

function addToCartCount() {
  const cartCount = JSON.parse(localStorage.getItem("cartProducts") || []);
  console.log(cartCount);
  const totalQuantity = cartCount.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);
  const cartItemCountElement = document.getElementById("cart-item-count");
  if (totalQuantity > 0) {
    cartItemCountElement.textContent = `${totalQuantity}`;
    cartItemCountElement.classList.add("quantity-icon");
  } else {
    cartItemCountElement.textContent = ``;
    cartItemCountElement.classList.remove("quantity-icon");
  }
}
addToCartCount();
// Quantity icon end
