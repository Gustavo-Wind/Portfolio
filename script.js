document.addEventListener("DOMContentLoaded", function(){
    const mobileMenuIcon = document.querySelector(".mobile-menu-icon");
    const mobileMenu = document.querySelector(".menu");

    mobileMenuIcon.addEventListener("click", function(){
        mobileMenu.classList.toggle("mobile-menu-open");
    });
});

/* Slider de depoimentos */

const prevButton = document.querySelector(".prev-testimonial");
const nextButton = document.querySelector(".next-testimonial");
const cards = document.querySelectorAll(".container-testimonials > div");

let currentIndex = 0;

function showCards(){
    cards.forEach((card, index) =>{
        if(index >= currentIndex && index < currentIndex + getVisibleCardCount()){
            card.style.display = "block";
        }
        else{
            card.style.display = "none";
        }
    });

    const disablePrevButton = currentIndex === 0;
    disablePrevButton ? prevButton.classList.add('disable') : prevButton.classList.remove('disable');

    const disableNextButton = currentIndex + getVisibleCardCount() >= cards.length;
    disableNextButton ? nextButton.classList.add('disable') : nextButton.classList.remove('disable');

}

function getVisibleCardCount(){
    const mobileScreenWidth = 1200;

    return window.innerWidth <= mobileScreenWidth ? 1 : 3;
}
function prevCard(){
    if(currentIndex > 0){
        currentIndex -= 1;
    }
    showCards();
}

function nextCard(){
    if(currentIndex + getVisibleCardCount() < cards.length){
        currentIndex += 1;
    }
    showCards();
} 

prevButton.addEventListener("click", prevCard);
nextButton.addEventListener("click", nextCard);
showCards();
window.addEventListener("resize", showCards);