const burger = document.querySelector(".burger-menu");
const nav = document.querySelector(".header-nav");

// Nav menu
const navSlide = () => {
  burger.addEventListener("click", () => {
    if (nav.classList.contains("nav-active")) {
      nav.classList.remove("nav-active");
      burger.classList.remove("toggle");
    } else {
      nav.classList.add("nav-active");
      burger.classList.add("toggle");
    }
  });
};
navSlide();
