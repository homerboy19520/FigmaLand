const burgerIcon = document.querySelector(".header__burger-wrapper");
const burgerWindow = document.querySelector(".header__list");
const headerIcon = document.querySelector(".svg-header-svg");
const body = document.querySelector("body");

if (burgerIcon) {
  burgerIcon.addEventListener("click", () => {
    burgerWindow.classList.toggle("m-open");
    body.classList.toggle("body_hidden");
    headerIcon.classList.toggle("svg-header-svg_black");
  });
}

const input = document.querySelector(".header__input");
const submit = document.querySelector(".header__button");

const error = () => {
  input.classList.add("header__input_eror");
};

const success = () => {
  input.classList.remove("header__input_eror");
};

submit.addEventListener("click", () => {
  let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (input.value !== 0) {
    if (!regex.test(input.value)) {
      error();
    } else {
      success();
    }
  } else {
    error();
  }
});

input.onfocus = function() {
  if (input.onfocus && input.classList.contains("header__input_eror")) {
    input.classList.remove("header__input_eror");
  }
};
