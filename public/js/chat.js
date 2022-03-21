/* eslint-disable no-undef,no-unused-vars */

const socket = io.connect();

socket.on('update-menssajes', data => {
	let chatMenssajes = '';
	console.log(data);
	for (let elem of data){
		if (elem.author.email == localStorage.getItem('email')) {
			chatMenssajes += `
            <li class="message right appeared">
                <div class="avatar" style="background-image: url('/img/profile/${elem.author.avatar}')"></div>
                <div class="text_wrapper">
                    <b>${formatDate(elem.date)} | ${elem.author.nombre}</b>
                    <div class="text">${elem.menssaje}</div>
                </div>
            </li>
            `;
		}else{
			chatMenssajes += `
            <li class="message left appeared">
                <div class="avatar" style="background-image: url('/img/profile/${elem.author.avatar}')"></div>
                <div class="text_wrapper">
                    <b>${formatDate(elem.date)} | ${elem.author.nombre}</b>
                    <div class="text">${elem.menssaje}</div>
                </div>
            </li>
            `;
		}
	}
	document.getElementById('message-area').innerHTML = chatMenssajes;
});

function formatDate(date){
	const localdate = new Date(date);
	return `[${localdate.getDate()}/${localdate.getMonth()}/${localdate.getFullYear()} ${localdate.getHours()}:${localdate.getMinutes()}:${localdate.getSeconds()}]`;
}

function sendMenssaje(){
	const data = {
		usuario: localStorage.getItem('email'),
		mensaje: document.getElementById('chat-mensaje').value,
		name: localStorage.getItem('name'),
		avatar: localStorage.getItem('avatar')
	};

	socket.emit('add-menssaje', data);
	document.getElementById('chat-mensaje').value = '';
}