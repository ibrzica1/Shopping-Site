import { cart, cartProductsCount } from "./cart-data.js";
import { orders } from "./orders-data.js";
import { products } from "../data/products.js";
import { formatTime } from "../utils/dates.js";


const cartCounter = document.getElementById("cartCounter");
const ordersGrid = document.getElementById("ordersGrid");

cartProductsCount(cart);

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
              <button>Buy it again</button>
            </div>
            <button class="orders-track-package" id="ordertrackPackage">Track package</button>
          </div>
        `;
      })
    })
}

renderOrdersGrid(orders);





