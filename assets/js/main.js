(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initParticles() {
    var holder = document.getElementById("particles-js");
    if (!holder || typeof particlesJS === "undefined") return;
    particlesJS.load("particles-js", "/assets/js/particles.json");
  }

  function initScrollProgress() {
    var bar = document.getElementById("scroll-progress");
    if (!bar) return;
    var update = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var ratio = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = "scaleX(" + ratio + ")";
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function initTyping() {
    var target = document.querySelector("[data-typed]");
    if (!target) return;
    var words = target.getAttribute("data-typed").split("|").filter(Boolean);
    if (!words.length) return;

    if (reduceMotion) {
      target.textContent = words[0];
      return;
    }

    var word = 0;
    var chars = 0;
    var deleting = false;

    function tick() {
      var current = words[word];
      chars += deleting ? -1 : 1;
      target.textContent = current.slice(0, chars);

      var delay = deleting ? 45 : 85;
      if (!deleting && chars === current.length) {
        deleting = true;
        delay = 1900;
      } else if (deleting && chars === 0) {
        deleting = false;
        word = (word + 1) % words.length;
        delay = 350;
      }
      setTimeout(tick, delay);
    }

    tick();
  }

  function initReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(items, function (item) {
        item.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    Array.prototype.forEach.call(items, function (item) {
      Array.prototype.forEach.call(item.children, function (child, index) {
        child.style.setProperty("--stagger", index);
      });
      observer.observe(item);
    });
  }

  function initPointerGlow() {
    var cards = document.querySelectorAll(".skill, .link-card, .certification-card, .education-card, .timeline-card, .project-card");
    Array.prototype.forEach.call(cards, function (card) {
      card.addEventListener("mousemove", function (event) {
        var box = card.getBoundingClientRect();
        card.style.setProperty("--mx", (event.clientX - box.left) + "px");
        card.style.setProperty("--my", (event.clientY - box.top) + "px");
      });
    });
  }

  function initSkillFilter() {
    var bar = document.querySelector("[data-stack-filter]");
    if (!bar) return;
    var buttons = bar.querySelectorAll(".filter-chip");
    var groups = document.querySelectorAll(".stack-group");

    Array.prototype.forEach.call(buttons, function (button) {
      button.addEventListener("click", function () {
        var wanted = button.getAttribute("data-filter");
        Array.prototype.forEach.call(buttons, function (other) {
          other.classList.toggle("is-active", other === button);
        });
        Array.prototype.forEach.call(groups, function (group) {
          var match = wanted === "all" || group.getAttribute("data-group") === wanted;
          group.hidden = !match;
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initParticles();
    initScrollProgress();
    initTyping();
    initReveal();
    initPointerGlow();
    initSkillFilter();
  });
})();
