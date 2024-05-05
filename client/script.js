const burger = document.querySelector(".burger-menu");
const nav = document.querySelector(".header-nav");
const overlay = document.querySelector(".overlay");

// Nav menu
const navSlide = () => {
  burger.addEventListener("click", () => {
    if (nav.classList.contains("nav-active")) {
      nav.classList.remove("nav-active");
      burger.classList.remove("toggle");
      overlay.classList.remove("overlay-opn");
    } else {
      nav.classList.add("nav-active");
      burger.classList.add("toggle");
      overlay.classList.add("overlay-opn");
    }
  });
};
navSlide();

function closeNavFromOutside() {
  document.addEventListener("click", function (e) {
    if (!e.target.closest("nav") && e.target != burger) {
      if (nav.classList.contains("nav-active")) {
        nav.classList.remove("nav-active");
        burger.classList.remove("toggle");
        overlay.classList.remove("overlay-opn");
      }
    }
  });
}
closeNavFromOutside();
