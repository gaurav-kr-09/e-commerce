import { cart, removeFromCart, updateCartQuantity, saveToStorage, updateDeliveryOption } from '../../data/cart.js'
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { findContainer } from '../utils/containerFinder.js';  //named export
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from '../../data/deliveryOption.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSumary() {

  let cartsummaryHTML = '';

  if(cart.length !== 0){
    cart.forEach((cartItem) => {
      const productId = cartItem.productId;
  
      const matchingproduct = getProduct(productId);
  
      const deliveryOptionId = cartItem.deliveryOptionId || '3';
      cartItem.deliveryOptionId = deliveryOptionId;
  
      const deliveryOption = getDeliveryOption(deliveryOptionId);
  
      const dateString = calculateDeliveryDate(deliveryOption);
  
      cartsummaryHTML += `
      <div class="cart-item-container js-cart-item-container 
      js-cart-item-container-${matchingproduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>
  
        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingproduct.image}">
  
            <div class="cart-item-details">
            <div class="product-name js-product-name">
              ${matchingproduct.name}
            </div>
            <div class="product-price">
              ${matchingproduct.getPrice()}
            </div>
            <div class="product-quantity js-product-quantity-${matchingproduct.id}">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-quantity-link"
              data-product-id = ${matchingproduct.id}>
                Update
              </span>
  
              <input type="number" min="0" class="quantity-input">
              <span class="save-quantity-link link-primary js-save-quantity-link"
              data-product-id = ${matchingproduct.id}>
              Save</span>
            
              <span class="delete-quantity-link link-primary js-delete-link
              js-delete-link-${matchingproduct.id}"
              data-product-id = ${matchingproduct.id}>
                Delete
              </span>
            </div>
          </div>
  
          <div class="delivery-options ">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionHTML(matchingproduct, cartItem)}
          </div>
          
        </div>
  
      </div>
  
      `;
    });
  
    function deliveryOptionHTML(matchingproduct, cartItem){
      let html = '';
  
      deliveryOptions.forEach((deliveryOption) => {
        
        const dateString = calculateDeliveryDate(deliveryOption);
  
        const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} - `;
  
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
  
        html +=
        `
          <div class="delivery-option js-delivery-option js-delivery-option-${matchingproduct.id}-${deliveryOption.id}"
          data-product-id = "${matchingproduct.id}"
          data-delivery-option-id = "${deliveryOption.id}">
              <input type="radio"
                ${isChecked ? 'checked': ''}
                class="delivery-option-input js-delivery-option-input-${matchingproduct.id}-${deliveryOption.id}"
                name="delivery-option-${matchingproduct.id}">
  
              <div>
                <div class="delivery-option-date">
                  ${dateString}
                </div>
                <div class="delivery-option-price">
                  ${priceString} Shipping
                </div>
              </div>
  
          </div>
        `
      });
  
      return html;
    }
  
    document.querySelector('.js-return-to-home-link')
      .innerHTML = updateCartQuantity();
  
    document.querySelector('.js-order-summary')
      .innerHTML = cartsummaryHTML;
  
    document.querySelectorAll('.js-delete-link')
      .forEach((link) => {
        link.addEventListener('click', () => {
          const { productId } = link.dataset;
          removeFromCart(productId);
  
          // const container = document.querySelector(`.js-cart-item-container-${productId}`);
          // container.remove();
          renderOrderSumary();
  
          renderPaymentSummary();
      })
    })
  
    function updateQuantityLabel(link, productId, newQuantity){
      const container = findContainer(link);
  
      if(newQuantity <= 0){
        removeFromCart(productId);
        renderOrderSumary();
      }else{
        const cartItem = cart.find(item => item.productId === productId);
        if (cartItem) {
          cartItem.quantity = newQuantity;
        }
        // container.querySelector('.quantity-label').innerText = newQuantity;
        renderOrderSumary();
      }
  
    }
  
    function saveQuantity(link){
      const { productId } = link.dataset;
      const container = findContainer(link);
  
      updateQuantityLabel(link, productId, Number(container.querySelector('.quantity-input').value));
  
      container.querySelector('.js-save-quantity-link').classList.remove('is-editing-quantity');
      container.querySelector('.quantity-input').classList.remove('is-editing-quantity');
      container.querySelector('.js-update-quantity-link').classList.remove('hide-quantityNupdate');
      container.querySelector('.quantity-label').classList.remove('hide-quantityNupdate');
  
      // document.querySelector('.js-return-to-home-link')
      //   .innerHTML = updateCartQuantity();
  
      renderOrderSumary();
  
      renderPaymentSummary();
  
      saveToStorage();
    }
  
    document.querySelectorAll('.js-update-quantity-link')
      .forEach((link) => {
        link.addEventListener('click', () => {
          const container = findContainer(link);
  
          container.querySelector('.js-save-quantity-link').classList.add('is-editing-quantity');
          container.querySelector('.quantity-input').classList.add('is-editing-quantity');
          container.querySelector('.js-update-quantity-link').classList.add('hide-quantityNupdate');
          container.querySelector('.quantity-label').classList.add('hide-quantityNupdate');
  
        });
    })
  
    document.querySelectorAll('.js-save-quantity-link')
      .forEach((link) => {
        link.addEventListener('click', () => saveQuantity(link));
    });
  
    document.querySelectorAll('.quantity-input')
      .forEach((input) => {
        input.addEventListener('keydown', (event) => {
          if (event.key === 'Enter'){
            const container = input.closest('.cart-item-container');
            const link = container.querySelector('.js-save-quantity-link');
            saveQuantity(link);
          }
        })
      })
  
    document.querySelectorAll('.js-delivery-option')
      .forEach((element) => {
        element.addEventListener('click', () =>{
          const {productId, deliveryOptionId} = element.dataset;
          updateDeliveryOption(productId, deliveryOptionId);
  
          renderOrderSumary();
          renderPaymentSummary();
        });
      });
  }else{
    cartsummaryHTML += `<h1>Oops! Your cart is empty.</h1>
    <h2><a href="amazon.html">Click here to shop.</a></h2>
    `
    document.querySelector('.js-order-summary')
      .innerHTML = cartsummaryHTML;
  }
}

