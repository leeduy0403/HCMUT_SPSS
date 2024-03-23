let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [];
}
function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  