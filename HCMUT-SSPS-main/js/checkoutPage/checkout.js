function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.id;
    let matchingProduct;
    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

    cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">
            <div class="cart-item-details">
              <div class="product-name">${matchingProduct.name}</div>
              <div class="product-price">${matchingProduct.priceCents} VND</div>
              <div class="product-quantity">
                <span>Quantity: <span class="quantity-label">${cartItem.quantity}</span></span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                  Delete
                </span>
              </div>
            </div>
          </div>
        </div>
      `;
  });

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const newCart = [];

      cart.forEach((cartItem) => {
        if (cartItem.id != productId) {
          newCart.push(cartItem);
        }
      });

      cart = newCart;
      console.log(cart);
      localStorage.setItem('cart', JSON.stringify(cart));

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
      renderPaymentSummary();
    });
  });
}
renderOrderSummary();
