updateCartQuantity();
document.querySelectorAll(".increase").forEach((button) => {
  button.addEventListener("click", () => {
    const paperID = button.dataset.counterId;
    let data;
    data = document.getElementById(paperID).value;
    data = Number(data) + 1;
    document.getElementById(paperID).value = data;
  });
});
document.querySelectorAll(".decrease").forEach((button) => {
  button.addEventListener("click", () => {
    const paperID = button.dataset.counterId;
    let data;
    data = document.getElementById(paperID).value;
    data = Number(data) - 1;
    document.getElementById(paperID).value = data;
  });
});
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const paperId = button.dataset.paperId;
    let matchingItem;
    cart.forEach((item) => {
      if (paperId === item.id) {
        matchingItem = item;
      }
    });
    counterId = paperId + "-counter";
    data = document.getElementById(counterId).value;
    if (matchingItem) {
      if (Number(data) > 0) {
        if (matchingItem.limit - Number(data) < 0) {
          alert('Number of purchases exceed limit!');
        } else {
          matchingItem.quantity += Number(data);
          matchingItem.limit -= Number(data);
        }
        console.log(matchingItem.limit);
      }
    } else {
      if (Number(data) > 0) {
        cart.push({
          id: paperId,
          quantity: Number(data),
          limit: 50 - Number(data),
        });
      }
    }
    saveToStorage();
    updateCartQuantity();
    document.getElementById(counterId).value = 0;
  });
});
function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += 1;
  });
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  updateQuantity();
}
function updateQuantity() {
  products.forEach((item) => {
    let matchingItem;
    cart.forEach((cartItem) => {
      if (item.id === cartItem.id) {
        matchingItem = cartItem;
      }
    });
    paperId = "js-" + item.id + "-quantity";
    if (matchingItem) {
      document.getElementById(paperId).innerHTML = matchingItem.quantity;
    } else {
      document.getElementById(paperId).innerHTML = 0;
    }
  });
}
