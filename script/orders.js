import { cart, cartProductsCount, addToCart } from "./cart-data.js";
import { orders, countOrders, removeOrder } from "./orders-data.js";
import { products } from "../data/products.js";
import { formatTime } from "../utils/dates.js";
import { renderTrackingGrid } from "./tracking.js";


const cartCounter = document.getElementById("cartCounter");
const ordersGrid = document.getElementById("ordersGrid");

cartProductsCount(cart);
countOrders(orders);

function renderOrdersGrid(array) {
    ordersGrid.innerHTML = "";

    array.forEach(order => {
      ordersGrid.innerHTML += `
      <div class="array-orders-main-container">
        <div class="array-orders-header-container">
          <div class="array-orders-time">
            <h2>Order Placed:</h2>
            <p>${formatTime(order.time)}</p>
          </div>
          <div class="array-orders-total">
            <h2>Tolal:</h2>
            <p>$${order.total}</p>
          </div>
          <div class="array-orders-id">
            <h2>Order ID:</h2>
            <p>${order.id}</p>
          </div>
          <div class="cancel-icon">
            <img src="/images/icons/cancel.png"
            class="remove-order"
            id="js-remove-order" 
            data-order-id="${order.id}">
          </div>
        </div>
        <div class="array-orders-body-container">
          <div id="orderProductsGrid${order.id}"></div>
        </div>
      </div>
      `;

      const orderProductsGrid = document.getElementById(`orderProductsGrid${order.id}`);

      orderProductsGrid.innerHTML = "";

      order.cart.forEach(product => {
        const matchingProduct = products.find(item => item.id === product.productId);
        orderProductsGrid.innerHTML += `
          <div class="orders-products-main-container">
            <div class="orders-product-image">
              <img src="${matchingProduct.image}">
            </div>
            <div class="orders-product-info">
              <h2>${matchingProduct.name}</h2>
              <p>Quantity: ${product.quantity}</p>
              <button class="buy-again-button"
              data-product-id="${matchingProduct.id}">Buy it again</button>
            </div>
            
            <a href="tracking.html?orderId=${order.id}&productId=${matchingProduct.id}&quantity=${product.quantity}" class="orders-track-package"
            data-order-id="${order.id}"
            data-product-id="${matchingProduct.id}" data-quantity="${product.quantity}">
            Track package</a>
          </div>
        `;
      })
    })

    document.querySelectorAll(".orders-track-package").forEach(button => {
      button.addEventListener("click",()=>{
        const orderId = parseInt(button.dataset.orderId);
        const productId = button.dataset.productId;
        const quantity = parseInt(button.dataset.quantity);
      })
    })
  
    document.querySelectorAll(".buy-again-button").forEach(button => {
      button.addEventListener("click",()=> {
        const productId = button.dataset.productId;
        addToCart(productId,1);
        cartProductsCount(cart);
      })
    })

    document.querySelectorAll(".remove-order").forEach(button => {
      button.addEventListener("click",()=>{
        const orderId = parseInt(button.dataset.orderId);
        removeOrder(orderId);
        countOrders(orders);
        renderOrdersGrid(orders);
      })
    })
}

renderOrdersGrid(orders);





