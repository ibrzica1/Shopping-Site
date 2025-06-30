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

export function modifyCart(productId) {
  let newCart = [];
      cart.forEach(item => {
        if(item.productId !== productId) {
          newCart.push(item);
        }
      })
      cart = newCart;
      localStorage.setItem("cartItems", JSON.stringify(cart));
}