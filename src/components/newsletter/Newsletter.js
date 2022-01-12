const inputNewsletter = document.querySelector(".input_newsletter");
const buttonNewsletter = document.querySelector(".button_newsletter");

const errorNewsletter = () => {
  inputNewsletter.classList.add("input_eror");
};

const successNewsletter = () => {
  inputNewsletter.classList.remove("input_eror");
};

buttonNewsletter.addEventListener("click", () => {
  let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (inputNewsletter.value !== 0) {
    if (!regex.test(inputNewsletter.value)) {
      errorNewsletter();
    } else {
      successNewsletter();
    }
  } else {
    errorNewsletter();
  }
});

inputNewsletter.onfocus = function() {
  if (
    inputNewsletter.onfocus &&
    inputNewsletter.classList.contains("input_eror")
  ) {
    inputNewsletter.classList.remove("input_eror");
  }
};
