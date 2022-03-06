function addToCart(cartId, productId){
	fetch(`/api/cart/${cartId}/productos`,{
		method:'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		body: {productId}
	})
		.then( res => {
			console.log(res);
		})
		.catch( err => {
			console.log(err);
		});
}