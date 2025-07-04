import { products } from "../data/products.js";
import { formatCurrency } from "../utils/money.js";import { cart, cartProductsCount,modifyCart } from "./cart-data.js";
import { addToOrders } from "./orders-data.js";

const cartProductsGrid = document.getElementById("cartProductsGrid");
const cartTotalContainer = document.getElementById("cartTotalContainer");




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
            <input class="cart-quantity-update" id="js-cart-quantity-update-${matchingProduct.id}" data-product-id="${matchingProduct.id}"></input>
            <p class="cart-save-btn" js-cart-save-btn  data-product-id="${matchingProduct.id}">Save</p>
            <p class="cart-delete-btn" data-product-id="${matchingProduct.id}">Delete</p>
            </div>
          </div>
    `;
  })

  document.querySelectorAll(".cart-update-btn").forEach(link => {
  link.addEventListener("click",()=>{
    const productId = link.dataset.productId;
    const container = document.querySelector(`#js-cart-product-container-${productId}`);
    console.log(container)
    container.classList.add("not-hidden");
  })
});

document.querySelectorAll(".cart-save-btn")
.forEach(link => {
  link.addEventListener("click",()=>{
    const productId = link.dataset.productId;
    const input = document.getElementById(`js-cart-quantity-update-${productId}`);
    const newQuantity = Number(input.value);
    const product = cart.find(item => item.productId === productId)
    product.quantity += newQuantity;
    localStorage.setItem("cartItems", JSON.stringify(cart));
    renderCartProductsGrid(cart);
    renderTotalSummary(cart);
    cartProductsCount(cart);
  })
});

document.querySelectorAll(".cart-delete-btn").
forEach(link => {
  link.addEventListener("click",()=>{
    const productId = link.dataset.productId;
    modifyCart(productId);
    renderCartProductsGrid(cart);
    renderTotalSummary(cart);
    cartProductsCount(cart);
  })
});
}
renderCartProductsGrid(cart);







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
    <button id="js-place-order-btn">Place Your Order</button>
  `;

  document.querySelector("#js-place-order-btn").addEventListener("click",()=>{
    addToOrders(cart);
    renderTotalSummary(cart);
    renderCartProductsGrid(cart);
  })
}
renderTotalSummary(cart);


