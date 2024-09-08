document.addEventListener(
  "DOMContentLoaded",
  (event) => {
    particlesJS.load("particles-js", "assets/js/particles.json", function () {
      console.log("particles.js loaded - callback");
    });
  },
  false
);

// Animation
document.addEventListener('DOMContentLoaded', function() {
  const skills = document.querySelectorAll('.skill');
  
  const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
  };
  
  const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
          } else {
              entry.target.classList.remove('visible');
          }
      });
  };
  
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  
  skills.forEach(skill => {
      observer.observe(skill);
  });
});
