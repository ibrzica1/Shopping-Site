import { products } from "../data/products.js";

const cartProductsGrid = document.getElementById("cartProductsGrid");
const cartOrdersGrid = document.getElementById("cartOrdersGrid");
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
}
cartProductsCount(cart);
