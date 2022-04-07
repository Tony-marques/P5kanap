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
  const response = await fetch(
    `http://localhost:3000/api/products/${productId}`
  );
  const body = await response.json();
  return body;
}

// Afficher le produit
function displayProduct(product) {
  result.innerHTML = `
  <article>
  <div class="item__img">
    <img src="${product.imageUrl}" alt="${product.altTxt}">
  </div>
  <div class="item__content">

    <div class="item__content__titlePrice">
      <h1 id="title">${product.name}</h1>
      <p>Prix : <span id="price">${product.price}</span>€</p>
    </div>

    <div class="item__content__description">
      <p class="item__content__description__title">Description :</p>
      <p id="description">${product.description}</p>
    </div>

    <div class="item__content__settings">
      <div class="item__content__settings__color">
        <label for="color-select">Choisir une couleur :</label>
        <select name="color-select" id="colors">
            <option value="">--SVP, choisissez une couleur --</option>

        </select>
      </div>

      <div class="item__content__settings__quantity">
        <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
        <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
      </div>
    </div>

    <div class="item__content__addButton">
      
    </div>

  </div>
</article>
  `;
  const select = document.querySelector("select");
  for (let color of product.colors) {
    const option = document.createElement("option");
    option.innerHTML = color;
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
  if (inputQuantity.value == 0) {
    alert("Merci de rentrer une quantité valide");
  } else {
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
