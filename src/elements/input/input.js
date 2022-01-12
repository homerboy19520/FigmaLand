function validation(inputMain, submitMain) {
  const input = document.querySelector(inputMain);
  const submit = document.querySelector(submitMain);

  const error = () => {
    input.classList.add("input_eror");
    setTimeout(() => {
      input.classList.remove("input_eror");
      input.value = "";
    }, 2000);
  };

  const success = () => {
    input.classList.remove("input_eror");
    input.classList.add("input_valid");
    setTimeout(() => {
      input.classList.remove("input_valid");
      input.value = "";
    }, 2000);
  };

  input.onfocus = function() {
    if (input.onfocus && input.classList.contains("input_eror")) {
      input.classList.remove("input_eror");
    }
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
}
