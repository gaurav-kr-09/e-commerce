function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadFromStorage () {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
    
      if (!this.cartItems) {
        this.cartItems = [{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
        }];
      }
    },

    saveToStorage () {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addToCart(productId, quantity = 1){
      let matchingItem;
    
      this.cartItems.forEach((CartItem) => {
        if (productId === CartItem.productId) {
          matchingItem = CartItem;
        }
      });
    
      if(matchingItem) {
        matchingItem.quantity += quantity;
      }else{
        this.cartItems.push({productId, quantity});
      }
    
      this.saveToStorage();
    },

    removeFromCart(productId) {
      const newCart = [];
    
      this.cartItems.forEach((cartItem) => {
        if(cartItem.productId !== productId){
          newCart.push(cartItem);
        }
      });
      
      this.cartItems = newCart;
      document.querySelector('.js-return-to-home-link')
        .innerHTML = updateCartQuantity();
    
      this.saveToStorage();
    },

    updateCartQuantity(){
      let cartQuantity = 0;
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
    
      return cartQuantity;
    },

    updateDeliveryOption(productId, deliveryOptionId){
      let matchingItem;
    
      this.cartItems.forEach((CartItem) => {
        if (productId === CartItem.productId) {
          matchingItem = CartItem;
        }
      });
    
      if(!matchingItem){
        return;
      }
    
      matchingItem.deliveryOptionId = deliveryOptionId;
    
      this.saveToStorage();
    }

  };
  return cart;
}

const cart = Cart('cart-oop');
const BuisnessCart = Cart('cart-buisneess');

cart.loadFromStorage();

BuisnessCart.loadFromStorage();

// console.log(cart);
// console.log(BuisnessCart);