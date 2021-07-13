document.querySelector('.burger').onclick = function(){
	this.classList.toggle('active');
	document.querySelector('#menu').classList.toggle('active')
	document.querySelector('body').classList.toggle('locked')
}

document.querySelector('.theme-settings .field').onclick =function(){
	this.classList.toggle('switch-dark')
	document.body.classList.toggle('dark');
}

window.addEventListener('scroll', function(){
	let discoverSection = document.querySelector('.discover-screen');
		console.log(discoverSection.offsetTop);
		menu = document.querySelector('.burger');
	if (pageYOffset > discoverSection.offsetTop){
		if (!menu.classList.contains('left')){menu.classList.add('left')}
	}else{
		if (menu.classList.contains('left')){menu.classList.remove('left')}
	}
})