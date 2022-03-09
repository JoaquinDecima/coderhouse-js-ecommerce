async function addToCart(cartID, productID){
	fetch(`/api/cart/${cartID}/productos`,{
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

async function deleteForCart(cartID, productID){
	fetch(`/api/cart/${cartID}/productos/${productID}`,{
		method:'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({productID})
	})
		.then (async () => {
			await drawCart();
			await drawCartList();
		})
		.catch(err => {
			console.log(err);
		});
}

async function buyCart(cartID){
	fetch(`/api/cart/${cartID}/buy`,{
		method:'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then (async () => {
			await drawCart();
			await drawCartList();
		})
		.catch(err => {
			console.log(err);
		});
}