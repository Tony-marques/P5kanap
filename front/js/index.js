(async () => {
  const products = await getProducts();
  displayProducts(products);
})();

const result = document.querySelector("#items");

// Récupérer les produits de l'API
async function getProducts() {
  const response = await fetch(
    "http://localhost:3000/api/products"
  );
  const body = await response.json();
  return body;
}

// Afficher les produits
function displayProducts(products) {
  const product = products
    .map((product) => {
      return `
    <a href="./product.html?id=${product._id}">
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="${product.name}">${product.name}</h3>
      <p class="${product.description}">${product.description}</p>
    </article>
  </a>
    `;
    })
    .join("");
  result.innerHTML = product;
}
