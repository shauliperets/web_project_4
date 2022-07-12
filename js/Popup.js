class Popup {
  constructor(selector) {
    this._selector = document.querySelector(`.${selector}`);

    this._closeButton = document.querySelector(".popup__close-button");
    this._form = document.querySelector(".popup__form");
  }

  open() {
    this._selector.classList.add("popup_open");

    document.addEventListener("keyup", this._handleEscClose);
    document.addEventListener("click", this._handleOverlay);
  }

  close() {
    this._selector.classList.remove("popup_open");

    document.removeEventListener("keyup", this._handleEscClose);
    document.removeEventListener("click", this._handleOverlay);
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", this.close);
  }

  _handleOverlay = (event) => {
    if (event.target.classList.contains("popup")) {
      this.close();
      console.log("_handleOverlay clicked");
    }
  };

  _handleEscClose = (event) => {
    event.preventDefault();

    if (event.key == "Escape" || event.key == "q") {
      this.close();
      console.log("_handleEscClose clicked");
    }
  };
}

class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);

    //console.log("super._selector", this._selector);

    this._imagePopupPhoto = this._selector.querySelector(".popup__image");
    this._description = this._selector.querySelector(".popup__image-description");
  }

  open() {
    //change src too
    super.open();
  }

  getPhoto() {
    return this._imagePopupPhoto;
  }

  getDescription() {
    return this._description;
  }

  setImageSource(source) {
    console.log("selector =>", this._imagePopupPhoto.src);
    this._imagePopupPhoto.src = source;
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
