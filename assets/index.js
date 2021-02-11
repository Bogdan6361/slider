// Slide class
class Slide {
	
	// Constructor
    constructor(src, description) {
        this._src = src;
        this._description = description;
    }
	
	// Get image src
    get src() {
        return this._src;
    }
	
	// Get image alt
    get description() {
        return this._description;
    }
}

// Carousel class
class Carousel {
	
	// Constructor
    constructor(slides, currentIndex=0) {
        this._slides = slides;
        this._currentIndex = currentIndex;
    }
	
	// Get active image index in array
    get currentIndex() {
        return this._currentIndex;
    }
	
	// Set active image index in array
    set currentIndex(value) {
        if (typeof value !== "number")
            throw new TypeError();
        if (!Number.isSafeInteger(value) || value < 0 || value >= this._slides.length)
            throw new RangeError();
        this._currentIndex = value;
    }
	
	// Get current slide index
    get currentSlide() {
        return this._slides[this._currentIndex];
    }
	
	// Get current next index
    get nextSlide() {
        return this._slides[this.nextIndex];
    }
	
	// Get current prev index
    get prevSlide() {
        return this._slides[this.prevIndex];
    }

	// Get next index
    get nextIndex() {
        return (this._currentIndex + 1) % this._slides.length;
    }
	
	// Get prev index
    get prevIndex() {
        return (this._currentIndex - 1 + this._slides.length) % this._slides.length;
    }
}

// Create slider
const carousel = new Carousel([
	new Slide("https://ar.culture.ru/attachments/attachment/preview/59fb125697d8bed4466cd9ca-preview.jpg","Ван Гог Звёздная ночь"),
	new Slide("https://cdnimg.rg.ru/img/content/188/44/86/edvard-munch-1332621_1920_d_850.jpg","Крик Мунк"),
	new Slide("https://cdnimg.rg.ru/img/content/152/44/11/667_t_650x433.jpg","Неизвестная Крамской"),
	new Slide("https://scientificrussia.ru/data/shared/top_10/kartiny/141.jpg","девочка с персиками Валентин Серов"),
	new Slide("https://scientificrussia.ru/data/shared/top_10/kartiny/Die_drei_Bogatyr.jpg","богатыри Васнецов")
]);

// Event on Slider click
const sliderClick = (direction="next")=>(e)=>{
    carousel.currentIndex = carousel[direction == "next" ? "nextIndex" : "prevIndex"];
    updateSlide(direction);
};

// Action on prev click
document.querySelector(".prev").addEventListener("click", sliderClick("prev"));
document.querySelector(".prevImage").addEventListener("click", sliderClick("prev"));

// Action on next click
document.querySelector(".next").addEventListener("click", sliderClick("next"));
document.querySelector(".nextImage").addEventListener("click", sliderClick("next"));

// Update slider
function updateSlide(direction) {

    //console.log(direction);

    const prevImg = document.querySelector(".prevImage");
    const currentImg = document.querySelector(".currentImage");
    const nextImg = document.querySelector(".nextImage");

    const oldCurrentImg = document.querySelector(".currentImage");
    const newCurrentImg = document.querySelector(".nextImage");

    const prevSlide = carousel.prevSlide;
    const currentSlide = carousel.currentSlide;
    const nextSlide = carousel.nextSlide;

    prevImg.setAttribute("src", prevSlide.src);
    currentImg.setAttribute("src", currentSlide.src);
    nextImg.setAttribute("src", nextSlide.src);

}

updateSlide();