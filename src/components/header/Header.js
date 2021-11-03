const burgerIcon = document.querySelector(".header__burger-wrapper");
const burgerWindow = document.querySelector(".header__list");
const headerIcon = document.querySelector(".svg-header-svg");
const body = document.querySelector(".body");

if (burgerIcon) {
  headerIcon.addEventListener("click", () => {
    burgerWindow.classList.toggle("m-open");
    body.classList.toggle("body_hidden");
    headerIcon.classList.toggle("svg-header-svg_black");
    console.log("work");
  });
}

validation(".header__input", ".header__button");
