import { settings } from "./settings.js";

import { closePopup } from "./utils.js";

export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _showInputError(form, input) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    input.classList.add(settings.inputErrorClass);
    errorElement.classList.add(settings.errorClass);
  }

  _hideInputError(form, input) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
  }

  _checkInputValidity(form, input, settings) {
    if (input.validity.valid) {
      this._hideInputError(form, input, settings);
    } else {
      this._showInputError(form, input, settings);
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

  _setEventListeners(inputs, button) {
    inputs.forEach((input) => {
      input.addEventListener("input", this._testFunc);

      input.addEventListener("input", () => {
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
    const inputs = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    const button = this._formElement.querySelector(this._settings.submitButtonSelector);

    this._toggleButtonState(inputs, button, this._settings);
    this._setEventListeners(inputs, button);
  }
}
