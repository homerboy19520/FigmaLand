const burgerIcon = document.querySelector(".header__burger-wrapper");
const burgerWindow = document.querySelector(".header__list");
const headerIcon = document.querySelector(".svg-header-svg");

if (burgerIcon) {
  headerIcon.addEventListener("click", () => {
    burgerWindow.classList.toggle("m-open");
    body.classList.toggle("body_hidden");
    headerIcon.classList.toggle("svg-header-svg_black");
  });
}

validation(".header__input", ".header__button");
