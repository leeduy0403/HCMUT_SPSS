function renderPaymentSummary() {
  let totalQ=0;
  let productPriceCents = 0;
  let paymentSummaryHTML = `
  <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">`;
  cart.forEach((cartItem) => {
    let matchingProduct;
    products.forEach((product) => {
      if (product.id === cartItem.id) {
        matchingProduct = product;
      }
    });
    paymentSummaryHTML+=`
      <div>${matchingProduct.name} (${cartItem.quantity})</div>
      <div class="payment-summary-money">
      ${matchingProduct.priceCents * cartItem.quantity} VND
      </div>`
    totalQ+=cartItem.quantity;
    productPriceCents += matchingProduct.priceCents * cartItem.quantity;
  });

  const totalCents = productPriceCents;

  paymentSummaryHTML += `
        <div>Total (${totalQ}):</div>
        <div class="payment-summary-money">
          ${productPriceCents} VND
        </div>
      </div>
  
      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">
          ${totalCents} VND
        </div>
      </div>
  
      <button class="place-order-button button-primary">
        Place your order
      </button>
    `;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}
renderPaymentSummary();
