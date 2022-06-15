const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_active",
  errorClass: "popup__input-error_active",
};

function showInputError(form, input) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.textContent = input.validationMessage;
  input.classList.add(settings.inputErrorClass);
  errorElement.classList.add(settings.errorClass);
}

function hideInputError(form, input) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
}

function checkInputValidity(form, input, settings) {
  if (input.validity.valid) {
    hideInputError(form, input, settings);
  } else {
    showInputError(form, input, settings);
  }
}

function hasInvalidInput(inputs) {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
}

function toggleButtonState(inputs, button, settings) {
  if (hasInvalidInput(inputs)) {
    button.classList.add(settings.inactiveButtonClass);
  } else {
    button.classList.remove(settings.inactiveButtonClass);
  }
}

function setEventListeners(form, settings) {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const button = form.querySelector(settings.submitButtonSelector);

  popupName.value = title.textContent;
  popupAboutMe.value = subtitle.textContent;

  toggleButtonState(inputs, button, settings);

  document.addEventListener("click", handleOverlay);

  inputs.forEach(function (input) {
    input.addEventListener("input", function () {
      checkInputValidity(form, input, settings);

      toggleButtonState(inputs, button, settings);
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
  const forms = Array.from(document.querySelectorAll(settings.formSelector));

  forms.forEach(function (form) {
    setEventListeners(form, settings);
  });
}

function handleOverlay(event) {
  const classesList = Object.assign([], event.target.classList);

  if (classesList.includes("popup")) {
    event.target.classList.remove("popup_open");
  }
}

enableValidation(settings);
