class Slider{
	constructor(elem){
		elem.style.display = 'none';
		this.slides = elem.querySelectorAll('.slide');
		this.createElements();
		// console.log(this.slider);
		elem.after(this.slider);
	}
	makeElement(type, classes, attributes){
		let elem = document.createElement(type);
		if (classes){;
			elem.classList.add(...classes);
		}
		if (attributes){
			for (attr in attributes){
				elem[attr] = attributes[attr];
			}
		}
		return elem;
	}
	createElements(){
		this.slider = this.makeElement('div', ['slider-content']);
		this.buttons = this.makeElement('div', ['slider-buttons']);
		this.buttons.innerHTML = '<div class="prev"><span></span><span></span></div><div class="next"><span></span><span></span></div>';
		
		this.sliderControls = this.makeElement('div', ['slider-controls']);
		this.sliderList = this.makeElement('div', ['slider-list', 'd-flex'])
		this.sliderList.append(this.slides[0]);
		this.constructControls();
		this.slider.append(...[this.buttons, this.sliderControls, this.sliderList]);
		this.slidesToggle = setInterval(() => {this.nextSlide(this.slider.querySelector('.next'))}, 5000);
		this.buttons.querySelectorAll('div').forEach(elem => (elem.addEventListener('click', () => {
			this.nextSlide(elem);
		})));
	}
	constructControls(){
		for (let i = 0; i < this.slides.length; i++){
			let circle = this.makeElement('div', ['circle']);
			if (i == 0) {circle.classList.add('active')}
			this.slides[i].dataset.num = i;
			circle.dataset.num = i;
			circle.addEventListener('click', () => {
				clearInterval(this.slidesToggle);
				this.slideToggle(circle.dataset.num);
			})
			this.sliderControls.append(circle);
		}
	}
	nextSlide(button){
		// console.log(button);
		const current = Number(this.slider.querySelector('.slide').dataset.num);
		let next = 0;
		// console.log(current);
		if (button.classList.contains('next')){
			next = (current == this.slides.length - 1) ? 0 : (current + 1);
		}else{
			next = (current == 0) ? (this.slides.length - 1) : (current - 1);
		}
		this.slideToggle(next);
	}
	slideToggle(next){
		clearInterval(this.slidesToggle);
		const currentSlide = this.slider.querySelector('.slide');
		const current = Number(currentSlide.dataset.num);
		const nextSlide = this.slides[next];
		const circles = this.sliderControls.querySelectorAll('.circle');
		if (next != current){
			if (nextSlide.classList.contains('from-left')){nextSlide.classList.remove('from-left')}
			if (nextSlide.classList.contains('from-right')){nextSlide.classList.remove('from-right')}
			if ((next == this.slides.length - 1 && current == 0) || (next < current && next != 0) || (next == 0 && current == 1)){
				//листаем слева (назад)
				nextSlide.classList.add('from-left')
				currentSlide.before(nextSlide)
				currentSlide.classList.add('from-right');
				setTimeout(function(){nextSlide.classList.remove('from-left');}, 0)
			}else{
				//листаем справа (вперед)
				nextSlide.classList.add('from-right')
				currentSlide.after(nextSlide);
				currentSlide.classList.add('from-left');
				setTimeout(function(){nextSlide.classList.remove('from-right');}, 0)
			}
			circles[current].classList.remove('active')
			circles[next].classList.add('active')
			currentSlide.remove();
		}
		this.slidesToggle = setInterval(() => {this.nextSlide(this.slider.querySelector('.next'))}, 5000);
	}
}

document.querySelector('.burger').onclick = function(){
	this.classList.toggle('active');
	document.querySelector('#menu').classList.toggle('active')
	document.querySelector('body').classList.toggle('locked')
}
// document.onload = SliderInit(document.querySelector('.slider'));
document.onload = new Slider(document.querySelector('.slider'));


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

document.querySelector('.arrow-down').addEventListener('click', function(){
	// console.log(document.querySelector('.discover-screen').offsetTop)
	document.querySelector('.discover-screen').scrollIntoView({behavior: "smooth"});
	// document.scrollTop = document.querySelector('.discover-screen').offsetTop;
})


window.onload = () => {
    document.addEventListener('scroll', parralax)
}

function parralax(){
	let targets = document.querySelectorAll('.parralaxed');
	let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        	if (entry.isIntersecting){
        		requestAnimationFrame(function(){
        			let heading = entry.target.querySelector('h2');
	        		let screenHeight = window.screen.height / 2;
	        		let elemoffset = entry.target.offsetTop;
	        		let documentOffset = pageYOffset;
	        		let coeficent = 0.1;
	        		translate = (screenHeight + documentOffset - elemoffset) * coeficent;
	        		console.log(translate);
	        		heading.style.transform = `translateY(${translate}px)`;
        		})
        		
        	}
        })
    }, { threshold: 0.5 })
    targets.forEach(target => {observer.observe(target)})
}



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