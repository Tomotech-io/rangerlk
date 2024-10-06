let slideIndex = 0;
const slides = document.querySelector('.slides');
const slideItems = document.querySelectorAll('.slide');
const totalSlides = slideItems.length;

// Function to show the slide based on the current index
function showSlide(index) {
    const slideWidth = slides.getBoundingClientRect().width; // Get the width of the slider
    slides.style.transform = `translateX(-${index * slideWidth}px)`; // Slide horizontally
}

// Add event listeners to the buttons
document.getElementById('prev').addEventListener('click', () => {
    slideIndex = (slideIndex > 0) ? slideIndex - 1 : totalSlides - 1;
    showSlide(slideIndex);
});

document.getElementById('next').addEventListener('click', () => {
    slideIndex = (slideIndex < totalSlides - 1) ? slideIndex + 1 : 0;
    showSlide(slideIndex);
});

// Recalculate the slide width if the window is resized
window.addEventListener('resize', () => showSlide(slideIndex));
