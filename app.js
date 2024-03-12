const bestProductsContainer = document.querySelector("#bestProductsContainer");

async function getBestProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  console.log(data);
  const firstFourProducts = data.slice(0, 4);

  bestProductsContainer.innerHTML = firstFourProducts
    .map((product) => {
      return `<div class="best-products">
              <img class="best-products-img" src="${product.image}" alt="${product.title}">
              <h2> ${product.title}</h2>
              <p>${product.price}</p>
              <p>${product.rating.rate}</p>
              <p>${product.rating.count}</p>
            </div>`;
    })
    .join("");
}

getBestProducts();
