document.querySelector('.burger').onclick = function(){
	this.classList.toggle('active');
	document.querySelector('#menu').classList.toggle('active')
	document.querySelector('body').classList.toggle('locked')
}
document.onload = SliderInit(document.querySelector('.slider'));

document.querySelector('.theme-settings .field').onclick =function(){
	this.classList.toggle('switch-dark')
	document.body.classList.toggle('dark');
}

window.addEventListener('scroll', function(){
	let discoverSection = document.querySelector('.discover-screen');
		// console.log(discoverSection.offsetTop);
		menu = document.querySelector('.burger');
	if (pageYOffset > discoverSection.offsetTop){
		if (!menu.classList.contains('left')){menu.classList.add('left')}
	}else{
		if (menu.classList.contains('left')){menu.classList.remove('left')}
	}
})

let mainScreen = document.querySelector('.main-screen');
mainScreen.addEventListener('mousemove', ParralaxMouseOver);

function ParralaxMouseOver(e){
	
	let zeroPointX = window.innerWidth / 2;
		zeroPointY = window.innerHeight / 2;
		mouseX = e.clientX;
		mouseY = e.clientY;
		coeficent = 0.015;

	let coordX = zeroPointX = (mouseX - zeroPointX) * coeficent;
		coordY = zeroPointY = (mouseY - zeroPointY) * coeficent;
		coordtop = coordY + 10;
		coordleft = coordX + 10;

	mainScreen.style.backgroundPosition = `top ${coordtop}% left ${coordleft}%`;
}

function SliderInit(sliderElem){
	sliderElem.style.display = 'none';
	let slider = document.createElement('div');
		buttons = document.createElement('div');
		sliderControls = document.createElement('div');
		slides = sliderElem.querySelectorAll('.slide');
		sliderList = document.createElement('div');

	slider.classList.add('slider-content');
	buttons.classList.add('slider-buttons');
	sliderControls.classList.add('slider-controls');
	buttons.innerHTML = '<div class="prev"><span></span><span></span></div><div class="next"><span></span><span></span></div>';
	slider.appendChild(buttons);
	sliderList.classList.add('slider-list');
	sliderList.classList.add('d-flex');

	for (i = 0; i < slides.length; i++){
		// sliderList.appendChild(slides[i]);
		slides[i].dataset.num = i;
		let circle = document.createElement('div');
		circle.classList.add('circle');
		circle.dataset.num = i;
		if (i == 0){
			circle.classList.add('active');
		}
		circle.addEventListener('click', function(){SlideToggle(this.dataset.num)});
		sliderControls.appendChild(circle);
	}
	sliderList.appendChild(slides[0]);
	slider.appendChild(sliderControls);
	slider.appendChild(sliderList);

	sliderElem.after(slider);
	
	buttons.querySelectorAll('div').forEach(elem => (elem.addEventListener('click', function(){NextSlide(elem)})));

	let SlideToggle = setInterval(function(){
		NextSlide(buttons.querySelector('.next'));
	}, 3000)
}

function NextSlide(button){
	// console.log(sliderList);
	let currentSlide = sliderList.querySelector('.slide');
		currentNumSlide = currentSlide.dataset.num;

	// console.log(currentNumSlide);
	if (button.classList.contains('next')){
		if (currentNumSlide < slides.length - 1){
			newSlideNum = Number(currentNumSlide) + 1	
		}else{
			newSlideNum = 0;
		}
	}else{
		if (Number(currentNumSlide) > 0){
			newSlideNum = Number(currentNumSlide) - 1;
		}else{
			newSlideNum = slides.length - 1;
		}
	}
	// console.log(currentNumSlide, newSlideNum);
	SlideToggle(newSlideNum);
}

function SlideToggle(next){
	let currentSlide = sliderList.querySelector('.slide');
		currentNumSlide = Number(currentSlide.dataset.num);
		nextSlide = slides[next];

		console.log(next, currentNumSlide);

	if (next != currentNumSlide){
		if (nextSlide.classList.contains('from-left')){nextSlide.classList.remove('from-left')}
		if (nextSlide.classList.contains('from-right')){nextSlide.classList.remove('from-right')}
			// console.log(next, currentNumSlide);
		if (next == slides.length - 1 || next < currentNumSlide){
			// console.log('right');
			//листаем влево
			nextSlide.classList.add('from-right')
			currentSlide.after(nextSlide);
			currentSlide.classList.add('from-left');
			setTimeout(function(){nextSlide.classList.remove('from-right');}, 0);
			
		}else{
			//листаем впрао
			nextSlide.classList.add('from-left')
			currentSlide.before(nextSlide)
			currentSlide.classList.add('from-right');
			setTimeout(function(){nextSlide.classList.remove('from-left');}, 0)
		}
		let circles = sliderControls.querySelectorAll('.circle');
		// console.log(circles[currentNumSlide]);
		circles[currentNumSlide].classList.remove('active');
		circles[next].classList.add('active')
		// console.log(slides);

		setTimeout(function(){
			if (currentSlide.classList.contains('from-left')){currentSlide.classList.remove('from-left')}
			if (currentSlide.classList.contains('from-right')){currentSlide.classList.remove('from-right')}
				currentSlide.remove();
		}, 300);
	}
}