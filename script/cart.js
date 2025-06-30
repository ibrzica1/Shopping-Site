import { products } from "../data/products.js";
import { formatCurrency } from "../utils/money.js";

const cartProductsGrid = document.getElementById("cartProductsGrid");
const cartTotalContainer = document.getElementById("cartTotalContainer");
const cartCounter = document.getElementById("cartCounter");


export let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

export function addToCart(productId,number){
 const existingCartItem = cart.find(item => item.productId === productId);

  if (existingCartItem) {
    existingCartItem.quantity += number;
  } else {
    cart.push({
      productId: productId,
      quantity: number
    });
  }

  localStorage.setItem("cartItems", JSON.stringify(cart));
  console.log(cart);
  cartProductsCount(cart);
}

export function cartProductsCount(array) {
  let count = 0;
  array.forEach(product => {
    count += product.quantity;
  });
  cartCounter.innerHTML = count;
  return count;
}
cartProductsCount(cart);

function renderCartProductsGrid(array) {
    cartProductsGrid.innerHTML = "";

  array.forEach(product => {
    const matchingProduct = products.find(item => item.id === product.productId);
    cartProductsGrid.innerHTML += `
      <div class="cart-product-container"
      id="js-cart-product-container-${matchingProduct.id}">
            <div class="cart-product-image-container">
            <img src="${matchingProduct.image}">
            </div>
            <div class="cart-product-name">${matchingProduct.name}</div>
            <div class="cart-product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
            <div class="cart-product-quantity">Quantity: ${product.quantity} </div>
            <div class="cart-product-update">
            <p class="cart-update-btn"  data-product-id="${matchingProduct.id}">Update</p>
            <input class="cart-quantity-update" js-cart-quantity-update data-product-id="${matchingProduct.id}"></input>
            <p class="cart-save-btn" js-cart-save-btn  data-product-id="${matchingProduct.id}">Save</p>
            <p class="cart-delete-btn"  data-product-id="${matchingProduct.id}">Delete</p>
            </div>
          </div>
    `;
  })
}
renderCartProductsGrid(cart);

document.querySelectorAll(".cart-update-btn").forEach(link => {
  link.addEventListener("click",()=>{
    const productId = link.dataset.productId;
    const container = document.querySelector(`#js-cart-product-container-${productId}`);
    console.log(container)
    container.classList.add("not-hidden");
  })
})







function renderTotalSummary(array) {
  cartTotalContainer.innerHTML = "";
  let total = 0;
  let tax = 0;
  array.forEach(product => {
    const matchingProduct = products.find(item => item.id === product.productId);
    total += (matchingProduct.priceCents * product.quantity);
  })
  
  tax = (total*10)/100;
  cartTotalContainer.innerHTML = `
    <h2>Order Summary</h2>
    <div class="order-items-container"><p>Items(${cartProductsCount(cart)}):</p><p>$${formatCurrency(total)}</p></div>
    <div class="order-items-container"><p>Estimated tax (10%):</p><p>$${formatCurrency(tax)}</p></div>
    <div class="order-items-total"><p>Order total:</p><p>$${formatCurrency(total+ tax)}</p></div>
  `;
}
renderTotalSummary(cart);


