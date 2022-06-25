//import { settings } from "./settings.js";

import { closePopup } from "./handlers.js";

export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;

    //console.log("ctor settings", this._settings);
    //console.log("ctor formElement", this._formElement);
  }

  showInputError(form, input) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    input.classList.add(settings.inputErrorClass);
    errorElement.classList.add(settings.errorClass);
  }

  hideInputError(form, input) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
  }

  _checkInputValidity(form, input, settings) {
    if (input.validity.valid) {
      hideInputError(form, input, settings);
    } else {
      showInputError(form, input, settings);
    }
  }

  _hasInvalidInput(inputs) {
    return inputs.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState(inputs, button, settings) {
    if (this._hasInvalidInput(inputs)) {
      button.classList.add(settings.inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(settings.inactiveButtonClass);
      button.disabled = false;
    }
  }

  _handleOverlay(event) {
    if (event.target.classList.contains("popup")) {
      closePopup(event.target);
    }
  }

  _setEventListeners() {
    const inputs = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    const button = this._formElement.querySelector(this._settings.submitButtonSelector);

    this._toggleButtonState(inputs, button, this._settings);

    inputs.forEach(function (input) {
      input.addEventListener("input", function () {
        this._checkInputValidity(this._formElement, input, this._settings);

        this._toggleButtonState(inputs, button, this._settings);
      });

      input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          button.click();
        }
      });
    });

    document.addEventListener("click", this._handleOverlay);
  }

  enableValidation() {
    //console.log("validate.enableValidation", this._settings);
    //console.log("enle formElement", this._formElement);

    this._setEventListeners();
  }
}

/*document.addEventListener("click", handleOverlay);*/
