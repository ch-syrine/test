let current = 0;
const testimonials = document.querySelectorAll(".testimonial");

function showSlide(index) {
  testimonials.forEach((t, i) => {
    t.classList.remove("active");
    if (i === index) {
      t.classList.add("active");
    }
  });
}

function nextSlide() {
  current = (current + 1) % testimonials.length;
  showSlide(current);
}

function prevSlide() {
  current = (current - 1 + testimonials.length) % testimonials.length;
  showSlide(current);
}

// Auto slide every 4 seconds
setInterval(nextSlide, 4000);
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.category-card');

    // Intersection Observer to trigger animation on scroll
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a small delay for each card to create a "stagger" effect
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Set initial state for cards
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
        
        // Optional: Simple click effect
        card.addEventListener('click', () => {
            console.log(`Navigating to: ${card.querySelector('h3').innerText}`);
            // window.location.href = '/your-link-here';
        });
    });
});