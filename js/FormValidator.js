import { handleOverlay } from "./utils.js";

export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _showInputError(form, input) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    input.classList.add(this._settings.inputErrorClass);
    errorElement.classList.add(this._settings.errorClass);
  }

  _hideInputError(form, input) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
  }

  _checkInputValidity(form, input) {
    if (input.validity.valid) {
      this._hideInputError(form, input, this._settings);
    } else {
      this._showInputError(form, input, this._settings);
    }
  }

  _hasInvalidInput(inputs) {
    return inputs.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState(inputs, button) {
    if (this._hasInvalidInput(inputs)) {
      button.classList.add(this._settings.inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(this._settings.inactiveButtonClass);
      button.disabled = false;
    }
  }

  _setEventListeners(inputs, button) {
    inputs.forEach((input) => {
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
  }

  enableValidation() {
    const inputs = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    const button = this._formElement.querySelector(this._settings.submitButtonSelector);

    this._toggleButtonState(inputs, button, this._settings);
    this._setEventListeners(inputs, button);
  }
}
