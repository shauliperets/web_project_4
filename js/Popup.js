class Popup {
  constructor(selector) {
    this._selector = document.querySelector(`.${selector}`);

    this._closeButton = document.querySelector(".popup__close-button");
    this._form = document.querySelector(".popup__form");
  }

  open() {
    this._selector.classList.add("popup_open");

    document.addEventListener("keyup", this._handelKeypressEvent);
    document.addEventListener("click", this._handleOverlay);
  }

  close() {
    this._selector.classList.remove("popup_open");

    document.removeEventListener("keyup", this._handelKeypressEvent);
    document.removeEventListener("click", this._handleOverlay);
  }

  _handleEscClose() {}

  setEventListeners() {
    this._closeButton.addEventListener("click", this.close);
  }

  _handleOverlay(event) {
    console.log("_handleOverlay pressed");
    console.log("event=>", event.target.classList);
    if (event.target.classList.contains("popup")) {
      this.close();
    }
  }

  _handelKeypressEvent(event) {
    console.log("_handelKeypressEvent pressed");
    event.preventDefault();

    if (event.key == "Escape" || event.key == "q") {
      this.close();
    }
  }
}

class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open() {
    //change src too
    super.open();
  }
}

class PopupWithForm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submit = submit;
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll(".form__input");

    this._formValues = {};
    this._inputList.forEach((input) => (this._formValues[input.name] = input.value));

    return this._formValues;
  }

  setEventListeners() {
    this._form.addEventListener("submit", this._handleSubmit);
    this._selector.addEventListener("click", super.close);
  }

  _handleSubmit(event) {
    event.preventDefault();

    const cardId = new Date().getTime();

    //in index
    createCard(cardId, placeTitle.value, placeLink.value, "#card-default");

    this._form.reset();

    //handleCloseAddCardPopupButtonClick();
    super.close();
  }
}

export { Popup, PopupWithForm, PopupWithImage };
