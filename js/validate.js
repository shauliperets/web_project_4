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
    button.disabled = true;
  } else {
    button.classList.remove(settings.inactiveButtonClass);
    button.disabled = false;
  }
}

function setEventListeners(form, settings) {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const button = form.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputs, button, settings);

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
  if (event.target.classList.contains("popup")) {
    closePopup(event.target);
  }
}

enableValidation(settings);

document.addEventListener("click", handleOverlay);
