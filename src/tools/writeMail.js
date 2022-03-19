export function register(user){
	return `
    <html>
        <head>
            <title>Se registro nuevo usuario en Lynx Store </title>
        </head>
        <body>
            <h1>Nuevo usuario registrado</h1>
            <p>
                Se registro un nuevo usuario en Lynx Store. El mismo ya tiene acceso segun los siguientes datos:
            </p>
            <ul>
                <li><b>Email:</b> ${user.email}</li>
                <li><b>Nombre:</b> ${user.name} ${user.lastname}</li>
                <li><b>Edad:</b> ${user.age}</li>
                <li><b>Telefono:</b> ${user.phone}</li>
                <li><b>Es vendedor:</b> ${user.isSeler ? 'Si' : 'No'}</li>
            </ul>
        </body>
    </html>
    `;
}

export function compra(products, nombre, correo, telefono, direccion){
	let total = 0;
	let html = `
    <html>
        <head>
            <title>Se realizo una nueva compra </title>
        </head>
        <body>
            <h1>Nuevo pedido de ${nombre} ${correo}</h1>
            <p>
                Se registro un nuevo pedido
            </p>
            <ul>
                <li><b>Email:</b> ${correo}</li>
                <li><b>Nombre:</b> ${nombre} </li>
                <li><b>Telefono:</b> ${telefono}</li>
                <li><b>Direccion:</b> ${direccion}</li>
            </ul>
        	<p>El pedido esta compuesto por:</p>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Nombre</th>
						<th>Precio</th>
						<th>Cantidad</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
    `;

	products.forEach(product =>{
		html = html.concat(`
					<tr>
						<th>${product._id}</th>
						<td>${product.nombre}</td>
						<td>$ ${product.precio}</td>
						<td>${product.cant}</td>
						<td>$ ${parseInt(product.cant, 10) * parseInt(product.precio, 10)}</td>
					</tr>
		`);
		total +=  (parseInt(product.cant, 10) * parseInt(product.precio, 10));
	});

	html = html.concat(`
					<tr>
						<th colspan="4">Total</th>
						<td>$ ${total}</td>
					</tr>
				</tbody>
			</table>
		</body>
    </html>`);

	return html;
}