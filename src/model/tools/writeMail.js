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