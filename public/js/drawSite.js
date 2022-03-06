async function drawUserSection(){
	let userSection = document.getElementById('user-section');
	let html = '';
	if(localStorage.getItem('email') != 'false'){
		html = `
			<button type="button" id="cart-section" class="btn position-relative" style="color: var(--text-color)">
			</button>
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
					${localStorage.getItem('name')}
					<div style="
							height: 54px;
							width: 54px;
							margin: 0px 20px;
							border-radius: 100%;
							background-image: url('/img/profile/${localStorage.getItem('avatar')}');
							background-repeat: no-repeat;
							background-position: center center;
							background-size: cover">
					</div>
				</a>
				<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
					<li><a class="dropdown-item disabled" href="#">Perfil</a></li>
					${ localStorage.getItem('isSeller') ? '<li><a class="dropdown-item" href="/products/add">Vender Producto &nbsp; &nbsp; &nbsp; <i class="fa fa-plus-circle ms-auto" aria-hidden="true"></i></a></li>' : ''}
					<li><hr class="dropdown-divider"></li>
					<li>
						<a class="dropdown-item" href="/auth/logout">
							Salir <i class="fa fa-sign-out ms-auto" aria-hidden="true"></i>
						</a>
					</li>
				</ul>
			</li>`;
	}else {
		html = `
			<li class="nav-item">
				<a class="page-scroll" title="Iniciar Sesion" href="/auth/login">
					<i class="fa fa-sign-in" aria-hidden="true"></i>
				</a>
			</li>
			<li class="nav-item">
				<a class="page-scroll" title="Registrarse" href="/auth/register">
					<i class="fa fa-user-plus" aria-hidden="true"></i>
				</a>
			</li>`;
	}
	userSection.innerHTML = html;
	localStorage.getItem('email') != 'false' ? drawCart() : null;
}

function drawCart(){
	let cartSection = document.getElementById('cart-section') ;
	let request = new XMLHttpRequest();

	request.open('GET', `/api/cart/${localStorage.getItem('email')}/productos/`);
	request.responseType = 'json';

	request.onload = function() {
		cartSection.innerHTML = `
			<i class="fa fa-shopping-cart" aria-hidden="true"></i>
			<span class="translate-middle badge rounded-pill" style="background: var(--site-color); top: -5px; left: 15px;">
				${request.response.length}
				<span class="visually-hidden">Porductos</span>
			</span>`;
	};

	request.send();
}

async function drawProducts(){
	let productsSection = document.getElementById('products-section') ;
	let request = new XMLHttpRequest();

	request.open('GET', '/api/products/');
	request.responseType = 'json';

	request.onload = function() {
		let html = '';
		request.response.forEach(elem =>{
			html = html.concat(`
				<div class="col">
					<div class="card h-100">
						<img src="/img/productos/${elem.foto}" class="card-img-top" alt="${elem.nombre}">
						<div class="card-body">
							<h5 class="card-title">${elem.nombre}</h5>
							<br />
							<p class="card-text">${elem.descripcion}</p>
						</div>
						<div class="card-footer container">
							<div class="row">
								<a href="/products/${elem.codigo}" class="btn btn-primary col-12" style="margin-bottom: 10px">Ver producto</a>
								<div class="col-6 text-center" style="margin: auto; font-weight: bold; font-size: 30px;">
									$ ${elem.precio}
								</div>
								${localStorage.getItem('email') != 'false' ? `
									<a href="#" onclick="addToCart('${localStorage.getItem('email')}','${elem.codigo}')" class="btn btn-primary col-6">
										<i class="fa fa-cart-plus" aria-hidden="true"></i>
									</a>` : ''}
							</div>
						</div>
					</div>
				</div>`);
		});
		productsSection.innerHTML = html;
	};

	request.send();
}

drawUserSection();