class Popup {
  constructor(selector) {
    this._selector = document.querySelector(`.${selector}`);

    console.log("selector =>", this._selector);

    this._closeButton = this._selector.querySelector(".popup__close-button");
    this._form = document.querySelector(".popup__form");
  }

  open() {
    this._selector.classList.add("popup_open");

    document.addEventListener("keyup", this._handleEscClose);
    document.addEventListener("click", this._handleOverlay);

    console.log("open - selector =>", this._selector);
  }

  close() {
    console.log("close - selector =>", this._selector);

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
    this._imagePopupPhoto.src = source;
  }
}

class PopupWithForm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submit = submit;

    //console.log("values =>", this._getInputValues());
    //console.log("selector =>", this._selector);
    //console.log("closeButton =>", this._closeButton);
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    this._inputList = this._selector.querySelectorAll(".popup__input");

    //console.log("list =>", this._inputList);

    //console.log("this._inputList =>", this._inputList);
    //console.log("this._selector =>", this._selector);

    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.id] = input.value;
      //console.log(`name: ${input.name}, value: ${input.value}`);
    });

    //console.log("values 2 =>", this._formValues);

    return this._formValues;
  }

  _close() {
    console.log("local close");
    super.close();
  }

  setEventListeners() {
    //super.setEventListeners();

    console.log("close =>", this._closeButton);

    this._form.addEventListener("submit", this._handleSubmit);
    this._selector.addEventListener("click", this._close);
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    console.log("target =>", event.target);
    const cardId = new Date().getTime();

    //in index
    createCard(cardId, placeTitle.value, placeLink.value, "#card-default");

    this._form.reset();

    //handleCloseAddCardPopupButtonClick();
    super.close();
  };
}

export { Popup, PopupWithForm, PopupWithImage };
