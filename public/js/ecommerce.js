function addToCart(cartId, productID){
	fetch(`/api/cart/${cartId}/productos`,{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({productID})
	})
		.then (() => {
			drawCart();
		})
		.catch(err => {
			console.log(err);
		});
}