import { products } from "../data/products.js";
import { formatCurrency } from "../utils/money.js";


const productsGrid = document.getElementById("productsGrid");

function renderProductsGrid(array) {
  let productsGridHTML = "";
  array.forEach(product => {
    productsGridHTML += `
    <div class="product-container">
      <div class="product-image-container">
      <img src="${product.image}">
      </div>
      <div class="product-name">${product.name}</div>
      <div class="product-price">$${formatCurrency(product.priceCents)}</div>
      <button id="js-add-to-cart" data-product-id="${product.id}">Add to Cart</button>
    </div>
    `
  });
  productsGrid.innerHTML = productsGridHTML;
}

renderProductsGrid(products);

