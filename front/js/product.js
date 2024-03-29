// Récupérer l'id dans l'URL
const productId = new URL(location.href).searchParams.get("id");
(async () => {
  const product = await getOneProduct();
  displayProduct(product);
})();
const button = document.querySelector("button");
const result = document.querySelector(".item");

// Récupérer un produit de l'API avec l'id
async function getOneProduct() {
  try {
    const response = await fetch(
      `http://localhost:3000/api/products/${productId}`
    );
    const body = await response.json();
    return body;
  } catch (e) {
    alert("Il y a un problème avec le serveur, merci de réessayer plus tard")
  }
}

// Afficher le produit
function displayProduct(product) {
  // Création du titre
  document.title = `${product.name}`;

  // Création de l'image
  const itemImg = document.querySelector(".item__img");
  const img = document.createElement("img");
  img.setAttribute("src", `${product.imageUrl}`);
  img.setAttribute("alt", `${product.altTxt}`);
  itemImg.appendChild(img);

  // Création du h1
  const itemContent = document.querySelector(".item__content__titlePrice");
  const h1 = document.createElement("h1");
  h1.textContent = `${product.name}`;
  itemContent.appendChild(h1);

  // Création du paragraphe prix
  const itemPrice = document.querySelector("#price");
  itemPrice.textContent = `${product.price}`;

  // Création de la description
  const itemDescription = document.querySelector("#description");
  itemDescription.textContent = `${product.description}`;

  // Création des couleurs
  const select = document.querySelector("select");
  for (let color of product.colors) {
    const option = document.createElement("option");
    option.textContent = color;
    option.value = color;
    select.appendChild(option);
  }
  const containerButton = document.querySelector(".item__content__addButton");
  containerButton.appendChild(button);
}

// Création du localStorage
async function createLS() {
  const inputQuantity = document.querySelector("#quantity");
  const product = await getOneProduct();
  const select = document.querySelector("select");
  const obj = {
    id: product._id,
    quantity: parseInt(inputQuantity.value),
    color: select.value,
    name: product.name,
    imageUrl: product.imageUrl,
  };
  let kanap = getProductLS();
  let kanapFind = kanap.find((item) => {
    return item.id == product._id && item.color == select.value;
  });
  // Si l'item n'est pas encore présent dans le LS
  if (
    (inputQuantity.value < 1 || inputQuantity.value > 100) &&
    select.value == ""
  ) {
    alert(
      "Merci de choisir une couleur et de rentrer une quantité comprise entre 1 et 100"
    );
  } else if (select.value == "") {
    alert("Merci de choisir une couleur");
  } else if (inputQuantity.value < 1 || inputQuantity.value > 100) {
    alert("Merci de rentrer une quantité comprise entre 1 et 100");
  } else {
    alert(
      `Le produit ${product.name} a été ajouté au panier en ${inputQuantity.value} quantité(s)`
    );
    if (!kanapFind) {
      kanap.push(obj);
      // Si présent dans LS avec même couleur
    } else if (kanapFind) {
      kanapFind.quantity += parseInt(inputQuantity.value);
      // Si présent dans LS mais couleur différente
    } else if (kanapFind && kanapFind.color != select.value) {
      kanap.push(obj);
    }
    saveProductLS(kanap);
  }
}

// Sauvegarder dans le localStorage
function saveProductLS(product) {
  return localStorage.setItem("product", JSON.stringify(product));
}

// Récupérer le localStorage
function getProductLS() {
  let product = JSON.parse(localStorage.getItem("product"));
  if (product == null) {
    return [];
  } else {
    return product;
  }
}

button.addEventListener("click", createLS);
