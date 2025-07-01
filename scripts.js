// Add visible class when section enters viewport
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  },
  {
    threshold: 0.25,
  }
);

document.querySelectorAll(".section").forEach((section) => observer.observe(section));

// Highlight active nav link on scroll
const navLinks = document.querySelectorAll("nav a");
function setActiveLink() {
  const fromTop = window.scrollY + 100;
  navLinks.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
window.addEventListener("scroll", setActiveLink);

// Close mobile nav on click (if you add a burger later)