const slides = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
const totalSlides = dots.length;
const intervalTime = 4000;

let touchStartX = 0;
let touchEndX = 0;

function updateCarousel() {
    if (!slides) return;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
}

function previousSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

let autoSlideInterval = setInterval(nextSlide, intervalTime);

function resetInterval() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, intervalTime);
}

slides.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

slides.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) > swipeThreshold) {
        if (difference > 0) {
            nextSlide();
        } else {
            previousSlide();
        }
        resetInterval();
    }
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
        resetInterval();
    });
});

const electionEndDate = new Date('2025-03-21T23:59:59'); 

function updateCountdown() {
    const now = new Date();
    const timeRemaining = electionEndDate - now;

    const countdownElement = document.querySelector('.countdown');
    if (!countdownElement) return;

    if (timeRemaining > 0) {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        const formatNumber = (num) => num.toString().padStart(2, '0');

        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');

        if (daysElement) daysElement.textContent = formatNumber(days);
        if (hoursElement) hoursElement.textContent = formatNumber(hours);
        if (minutesElement) minutesElement.textContent = formatNumber(minutes);
        if (secondsElement) secondsElement.textContent = formatNumber(seconds);
    } else {
        countdownElement.innerHTML = "<h2>The election has ended!</h2>";
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();
updateCarousel();

const searchInput = document.getElementById('searchInput');
        const cards = document.querySelectorAll('.candidate-card');

        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();

            cards.forEach(card => {
                const name = card.querySelector('.candidate-name').textContent.toLowerCase();
                const bio = card.querySelector('.candidate-bio').textContent.toLowerCase();
                const manifesto = card.querySelector('.candidate-manifesto').textContent.toLowerCase();

                if (name.includes(searchTerm) || 
                    bio.includes(searchTerm) || 
                    manifesto.includes(searchTerm)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });

        if (cards) {
            cards.forEach(card => {
                card.addEventListener('click', function() {
                    const name = this.querySelector('.candidate-name').textContent;
                    alert(`You clicked on ${name}'s profile. This could link to a detailed profile page.`);
                });
            });
        }

document.addEventListener('DOMContentLoaded', function() {
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    const quickLinks = document.querySelectorAll('.quick-links a');
    quickLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href').substring(1);
            const element = document.getElementById(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});