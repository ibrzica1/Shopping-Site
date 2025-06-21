import { products } from "../data/products.js";
import { formatCurrency } from "../utils/money.js";


const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const category = document.getElementById("category");
const sortPrice = document.getElementById("sortPrice");

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

function filterProducts(){
  let sorted = [];
  let categorised = [];
  const inputTerm = searchInput.value.toLowerCase().trim();
  const categories = category.value;
  
  products.forEach(product => {
    if(product.name.toLowerCase().includes(inputTerm)){
      sorted.push(product)
    }
  })
  sorted.forEach(product => {
    if(categories === "Categories"){
      categorised.push(product);
    }
    else if (categories === product.category) {
      categorised.push(product);
    }
  });

  if(sortPrice.value === "highest")
  {
    categorised = categorised.sort((a,b) => b.priceCents - a.priceCents);
    renderProductsGrid(categorised);
  }
  else if (sortPrice.value === "lowest")
  {
    categorised = categorised.sort((a,b) => a.priceCents - b.priceCents);
    renderProductsGrid(categorised);
  }
  else{
    renderProductsGrid(categorised);
  }
  
}

filterProducts()

searchInput.addEventListener("input",filterProducts);
category.addEventListener("change",filterProducts);
sortPrice.addEventListener("change",filterProducts)
