const productCarousel = document.getElementById("productCarousel");
let currentIndex = 0;



async function getProducts() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Hata oluştu.", error);
    }
}

function showProducts(products){
    const productsToShow = products.slice(currentIndex, currentIndex+4);

     productCarousel.innerHTML = productsToShow.map(product => `
            <div class="product-card">
                <img class ="product-card-img" src ="${product.image}" alt = "${product.title}" />
                <h3 class ="product.title">${product.title}</h3>
                <p>Discounted Price: $${product.price * 0.5}</p>
                <p> $${product.price}</p>
             </div>
    `).join("");
}

async function loadProducts() {
    try {
        const fetchedProducts = await getProducts();
        products = fetchedProducts; 
        showProducts(products);
    } catch (error) {
        console.error('Ürünler yüklenirken hata oluştu:', error);
    }
}

function nextProduct() {
    currentIndex = (currentIndex + 1) % products.length;
    showProducts(products);
}

function prevProduct() {
    currentIndex = (currentIndex - 1 + products.length) % products.length;
    showProducts(products);
}

loadProducts();