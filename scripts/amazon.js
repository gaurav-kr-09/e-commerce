import { addToCart } from '../data/cart.js';
import { products, loadProducts } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { updateCartQuantity } from '../data/cart.js';

loadProducts(renderrProductsGrid);

export function renderrProductsGrid() {
  let productHTML = '';

  // const urlParams = new URLSearchParams(location.search);
  // const search = urlParams.get('search')?.toLowerCase();

  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  let filteredProducts = products;

  if (search) {
    filteredProducts = products.filter((product) => {
    
      let matchingKeyword = false;

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(search.toLowerCase())) {
          matchingKeyword = true;
        }
      });

      return matchingKeyword ||
        product.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  if(filteredProducts.length === 0) {
    document.querySelector('.js-search-message').innerHTML = `
      <h1>No items found for ur search: <strong>${search}</strong></h1>
      <h2><a href="amazon.html">Click here to go to home page</a></h2>
    `;
  }else{
    filteredProducts.forEach((product) => {
      productHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image" src="${product.image}">
          </div>
  
          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>
  
          <div class="product-rating-container">
            <img class="product-rating-stars" src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>
  
          <div class="product-price">
            ${product.getPrice()}
          </div>
  
          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              ${[...Array(10)].map((_, i) => `<option value="${i + 1}" ${i === 0 ? 'selected' : ''}>${i + 1}</option>`).join('')}
            </select>
          </div>
  
          ${product.extraInfoHTML()}
  
          <div class="product-spacer"></div>
  
          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>
  
          <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
      `;
    });
  }

  document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity();

  document.querySelector('.js-products-grid').innerHTML = productHTML;

  function findQuantity(productId) {
    const selector = document.querySelector(`.js-quantity-selector-${productId}`);
    return Number(selector?.value || 1);
  }

  let timeouts = {};
  function displayAdded(productId) {
    const addedMsg = document.querySelector(`.js-added-to-cart-${productId}`);
    addedMsg.classList.add('js-added-to-cart');

    if (timeouts[productId]) {
      clearTimeout(timeouts[productId]);
    }

    timeouts[productId] = setTimeout(() => {
      addedMsg.classList.remove('js-added-to-cart');
    }, 2000);
  }

  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        const quantity = findQuantity(productId);

        addToCart(productId, quantity);
        document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity();
        displayAdded(productId);
      });
    });

  document.querySelector('.js-search-button')
    .addEventListener('click', () => {
      const searchValue = document.querySelector('.js-search-bar').value;
      window.location.href = `amazon.html?search=${searchValue}`;
    });

  document.querySelector('.js-search-bar')
    .addEventListener('keydown', (event) => {
      if(event.key === 'Enter'){
        const searchValue = document.querySelector('.js-search-bar').value;
        window.location.href = `amazon.html?search=${searchValue}`;
      }
    })
}
