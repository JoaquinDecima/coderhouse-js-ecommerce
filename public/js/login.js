function login(){
	let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;

	fetch('/api/auth/login',{
		method:'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({email,password})
	})
		.then(async response => {
			if (response.status === 200){
				const myresponse = await response.json();
				localStorage.setItem('token', myresponse.token);
				fetch('/api/auth/',{
					method:'GET',
					headers: {
						'Content-Type': 'application/json',
						'token': localStorage.getItem('token')
					}
				})
					.then(async tempres => {
						const user =  await tempres.json();
						localStorage.setItem('email', user.email);
						localStorage.setItem('name', user.name);
						localStorage.setItem('isSeller', user.isSeller);
						localStorage.setItem('avatar', user.avatar);
						window.location.replace('/');
					})
					.catch(err => console.log(err));
			}
		})
		.catch(err => {
			console.log(err);
		});
}