let localStorage = window.localStorage;
const root = document.documentElement;
let isDark = false || localStorage.getItem('isDark');
const themeButton = document.getElementById('theme-changer');

updateTheme();

function updateTheme(){
	if (isDark) {
		root.style.setProperty('--bg-site-g' , '#333');
		root.style.setProperty('--bg-site', '#222');
		root.style.setProperty('--bg-site-2', '#111');
		root.style.setProperty('--bg-site-3', 'rgba(80, 80, 80, 0.1)');
		root.style.setProperty('--a-color-2', '#6A7C92');
		root.style.setProperty('--text-color', 'rgba(240, 240, 240, 0.55)');
		root.style.setProperty('--text-title', '#999');
		themeButton.innerHTML = '<i class="fa fa-sun fa-2x" aria-hidden="true"></i>';
	} else {
		root.style.setProperty('--bg-site-g' , '#FFF');
		root.style.setProperty('--bg-site', '#3763EB');
		root.style.setProperty('--bg-site-2', '#EFF2F9');
		root.style.setProperty('--bg-site-3', 'rgba(106, 124, 146, 0.1)');
		root.style.setProperty('--a-color-2', '#6A7C92');
		root.style.setProperty('--text-color', 'rgba(106, 124, 146, 0.55)');
		root.style.setProperty('--text-title', '#051441');
		themeButton.innerHTML = '<i class="fa fa-moon fa-2x" aria-hidden="true"></i>';
	}
}

function changeTheme(){
	isDark = !isDark;
	localStorage.setItem('isDark', isDark);
	updateTheme();
}
