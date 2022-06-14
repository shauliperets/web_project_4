const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_disabled",
  inputErrorClass: "popup__form-input_type_error",
  errorClass: "popup__form-error_visible",
};

function showInputError(form, input) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.textContent = input.validationMessage;
  input.classList.add("popup__input_active");
  errorElement.classList.add("popup__input-error_active");
}

function hideInputError(form, input) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove("popup__input_active");
  errorElement.classList.remove("popup__input-error_active");
}

function checkInputValidity(form, input) {
  if (input.validity.valid) {
    hideInputError(form, input);
  } else {
    showInputError(form, input);
  }
}

function hasInvalidInput(inputs) {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
}

function toggleButtonState(inputs, button) {
  if (hasInvalidInput(inputs)) {
    button.classList.add("popup__button_inactive");
  } else {
    button.classList.remove("popup__button_inactive");
  }
}

function setEventListeners(form) {
  const inputs = Array.from(form.querySelectorAll(".popup__input"));
  const button = form.querySelector(".popup__button");

  popupName.value = title.textContent;
  popupAboutMe.value = subtitle.textContent;

  toggleButtonState(inputs, button);

  document.addEventListener("click", handleOverlay);

  document.addEventListener("keypress", function (event) {
    if (event.target.getAttribute("type") != "text" && event.target.getAttribute("type") != "url") {
      event.preventDefault();
    }

    if (event.key == "Escape") {
      editProfilePopup.classList.remove("popup_open");

      addCardPopup.classList.remove("popup_open");

      imagePopup.classList.remove("popup_open");
    }
  });

  inputs.forEach(function (input) {
    input.addEventListener("input", function () {
      checkInputValidity(form, input);

      toggleButtonState(inputs, button);
    });

    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        button.click();
      }
    });
  });
}

function enableValidation(settings) {
  const forms = Array.from(document.querySelectorAll(".popup__form"));

  forms.forEach(function (form) {
    setEventListeners(form);
  });
}

function handleOverlay(event) {
  const classesList = Object.assign([], event.target.classList);

  if (classesList.includes("popup")) {
    event.target.classList.remove("popup_open");
  }
}

enableValidation(settings);
