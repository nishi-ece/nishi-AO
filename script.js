document.addEventListener("DOMContentLoaded", () => {
    // Initial fade-in
    document.body.classList.add("fade-in");
  
    // Slide-up elements on scroll
    const slideElements = document.querySelectorAll('.slide-up');
  
    const revealOnScroll = () => {
      slideElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add('visible');
        }
      });
    };
  
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load
  });
  