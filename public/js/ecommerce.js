/* eslint-disable no-undef,no-unused-vars */

let myToastEl = document.getElementById('notify-toast');
const notifyToast = bootstrap.Toast.getOrCreateInstance(myToastEl);
let myToastErrorEl = document.getElementById('notify-toast-error');
const notifyToastError = bootstrap.Toast.getOrCreateInstance(myToastErrorEl);

async function addToCart(cartID, productID){
	fetch(`/api/cart/${cartID}/productos`,{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'token': localStorage.getItem('token')
		},
		body: JSON.stringify({productID})
	})
		.then (() => {
			document.getElementById('notify-data').innerHTML = 'Se agrego producto al carrito';
			notifyToast.show();
			drawCart();
		})
		.catch(err => {
			document.getElementById('notify-data-error').innerHTML = `Error al agregar producto al carrito ${err}`;
			notifyToastError.show();
			console.log(err);
		});
}

async function deleteForCart(cartID, productID){
	fetch(`/api/cart/${cartID}/productos/${productID}`,{
		method:'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'token': localStorage.getItem('token')
		},
		body: JSON.stringify({productID})
	})
		.then (async () => {
			document.getElementById('notify-data').innerHTML = 'Se elmino producto del carrito';
			notifyToast.show();
			await drawCart();
			await drawCartList();
		})
		.catch(err => {
			document.getElementById('notify-data-error').innerHTML = `Ocurrio un error al elminar producto del carrito : ${err}`;
			notifyToastError.show();
			console.log(err);
		});
}

async function buyCart(cartID){
	fetch(`/api/cart/${cartID}/buy`,{
		method:'POST',
		headers: {
			'Content-Type': 'application/json',
			'token': localStorage.getItem('token')
		}
	})
		.then (async () => {
			document.getElementById('notify-data').innerHTML = 'Gracias por su compra';
			notifyToast.show();
			await drawCart();
			await drawCartList();
		})
		.catch(err => {
			document.getElementById('notify-data-error').innerHTML = `Error al comprar el carrito ${err}`;
			notifyToastError.show();
			console.log(err);
		});
}