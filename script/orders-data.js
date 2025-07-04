import { cart, getTotal } from "./cart-data.js";
import { formatCurrency } from "../utils/money.js";


export let orders = JSON.parse(localStorage.getItem("orderItem")) || [];

export function addToOrders(array) {
  let orderId;
  const time = new Date;
  const total = formatCurrency(getTotal(cart));
  while(true) {
    orderId = Math.floor(Math.random()*10000000);
    const exists = orders.some(order => order.id === orderId);
    if(!exists) break;
  }
  if(array.length === 0){
    console.log("Cart is empty");
    return;
  }
  else {
    orders.push({
    id: orderId,
    cart: JSON.parse(JSON.stringify(array)),
    time: time,
    total: total,
    status: 1
    });
    localStorage.setItem("orderItem", JSON.stringify(orders));
    localStorage.removeItem("cartItems");
    cart.length = 0;
  }
}

export function removeOrder(id) {
  const index = orders.findIndex(order => order.id === id);
  if (index !== -1) {
    orders.splice(index, 1);
    localStorage.setItem("orderItem", JSON.stringify(orders));
  }
}

const orderCounter = document.getElementById("orderCounter");

export function countOrders(array) {
  let number = 0;
  array.forEach(order => {
    number++
  })
  orderCounter.innerHTML = number;
}