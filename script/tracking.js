import { orders } from "./orders-data.js";
import { products } from "../data/products.js";
import { deliveryDate } from "../utils/dates.js";
import { cartProductsCount, cart } from "./cart-data.js";

const trackingGrid = document.getElementById("js-tracking-grid");
const cartCounter = document.getElementById("cartCounter");

cartProductsCount(cart)

function getParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

window.addEventListener("DOMContentLoaded",()=> {
  const orderId = parseInt(getParam("orderId"));
  const productId = getParam("productId");
  const quantity = parseInt(getParam("quantity"));

  renderTrackingGrid(orderId, productId, quantity);
})

export function renderTrackingGrid(orderId,productId,quantity) {
  trackingGrid.innerHTML = "";

  const matchingOrder = orders.find(order => order.id === orderId);
  const matchingProduct = products.find(product => product.id === productId)

  trackingGrid.innerHTML = `
    <div class="tracking-product-main-container">
      <h2>Arriving on ${deliveryDate(matchingOrder.time)}</h2>
      <p>${matchingProduct.name}</p>
      <p>Quantity: ${quantity}</p>
      <img src="${matchingProduct.image}">
      <div class="shipment-status-container"
      id="js-shipment-status">
        <div class="statuses-container">
          <h2 class="preparing">Preparing</h2>
          <h2 class="shipped">Shipped</h2>
          <h2 class="delivered">Delivered</h2>
        </div>
        <div class="progress-bar">
          <div class="progress-bar-green"></div>
        </div>
      </div>
    </div>
  `;
  let status = document.getElementById("js-shipment-status");
  if(matchingOrder.status === 1) {
    status.classList.add("status-1");
  }
  else if(matchingOrder.status === 2) {
    status.classList.add("status-2");
  }
  else if(matchingOrder.status === 3) {
    status.classList.add("status-3");
  }
}