import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submit = submit;
  }

  _close = () => {
    super.close();
    this._form.reset();
  };

  _getInputValues() {
    this._inputList = this._selector.querySelectorAll(".popup__input");

    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.id] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submit);
  }
}

export { PopupWithForm };
