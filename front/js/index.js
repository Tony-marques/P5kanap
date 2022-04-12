// Fonction lancée au lancement de la page
const init = async () => {
  const products = await getProducts();
  displayProducts(products);
};

init();

const result = document.querySelector("#items");

// Récupérer les produits de l'API
async function getProducts() {
  try{

    const response = await fetch("http://localhost:3000/api/products");
    const body = await response.json();
    return body;
  } catch(e){
    alert("Il y a un problème avec le serveur, merci de réessayer plus tard")
  }
}



// Afficher les produits
function displayProducts(products) {
  for (const product of products) {
    const a = document.createElement("a");
    const article = document.createElement("article");
    const img = document.createElement("img");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");

    h3.textContent = `${product.name}`;
    p.textContent = `${product.description}`;

    a.setAttribute("href", `./product.html?id=${product._id}`);
    img.setAttribute("src", `${product.imageUrl}`);
    img.setAttribute("alt", `${product.altTxt}`);
    h3.setAttribute("class", `${product.name}`);
    p.setAttribute("class", `${product.description}`);

    result.appendChild(a);
    a.appendChild(article);
    article.appendChild(img);
    article.appendChild(h3);
    article.appendChild(p);
  }
}
