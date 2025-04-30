// class Cart {
//  cartItems= undefined;
// 	localStorageKey = undefined;

// 	loadFromStorage () {
// 		this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
	
// 		if (!this.cartItems) {
// 			this.cartItems = [{
// 				productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
// 				quantity: 2,
// 				deliveryOptionId: '1'
// 			},
// 			{
// 				productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
// 				quantity: 1,
// 				deliveryOptionId: '2'
// 			}];
// 		}
// 	}

// 	saveToStorage () {
// 		localStorage.setItem(this.ocalStorageKey, JSON.stringify(this.cartItems));
// 	}

// 	addToCart(productId, quantity = 1){
// 		let matchingItem;
	
// 		this.cartItems.forEach((CartItem) => {
// 			if (productId === CartItem.productId) {
// 				matchingItem = CartItem;
// 			}
// 		});
	
// 		if(matchingItem) {
// 			matchingItem.quantity += quantity;
// 		}else{
// 			this.cartItems.push({productId, quantity});
// 		}
	
// 		this.saveToStorage();
// 	}

// 	removeFromCart(productId) {
// 		const newCart = [];
	
// 		this.cartItems.forEach((cartItem) => {
// 			if(cartItem.productId !== productId){
// 				newCart.push(cartItem);
// 			}
// 		});
		
// 		this.cartItems = newCart;
// 		document.querySelector('.js-return-to-home-link')
// 			.innerHTML = updateCartQuantity();
	
// 		this.saveToStorage();
// 	}

// 	updateCartQuantity(){
// 		let cartQuantity = 0;
// 		this.cartItems.forEach((cartItem) => {
// 			cartQuantity += cartItem.quantity;
// 		});
	
// 		return cartQuantity;
// 	}

// 	updateDeliveryOption(productId, deliveryOptionId){
// 		let matchingItem;
	
// 		this.cartItems.forEach((CartItem) => {
// 			if (productId === CartItem.productId) {
// 				matchingItem = CartItem;
// 			}
// 		});
	
// 		if(!matchingItem){
// 			return;
// 		}
	
// 		matchingItem.deliveryOptionId = deliveryOptionId;
	
// 		this.saveToStorage();
// 	}

// }

// const cart = new Cart();  //each object that we generate from a class is called an instance. here both are instances.
// const buisnessCart = new Cart();

// cart.localStorageKey = 'cart-oop';
// buisnessCart.localStorageKey = 'cart-buisness'

// cart.loadFromStorage();

// buisnessCart.loadFromStorage();

// console.log(cart);
// console.log(buisnessCart);

// //checking if a given object was generated from the given class

// console.log(buisnessCart instanceof Cart);

// //-------->>>>>>> using an constructor <<<<<<--------;

class Cart {
	cartItems; // same as cartItems= undefined; //public property can be accessed anywhere.
	#localStorageKey; //private class can only be used inside the class not outside the class.

	constructor(localStorageKey) {
		this.#localStorageKey = localStorageKey;
		this.#loadFromStorage();
	}

	#loadFromStorage () {
		this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

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
	}

	saveToStorage () {
		localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
	}

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
	}

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
	}

	updateCartQuantity(){
		let cartQuantity = 0;
		this.cartItems.forEach((cartItem) => {
			cartQuantity += cartItem.quantity;
		});

		return cartQuantity;
	}

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

}

const cart = new Cart('cart-oop');
const buisnessCart = new Cart('cart-buisness');

// cart.#localStorageKey = 'test'; //Error dega kyuki ye private hai.

// console.log(cart);
// console.log(buisnessCart);

// console.log(buisnessCart instanceof Cart);