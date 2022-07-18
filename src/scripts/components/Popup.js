class Popup {
  constructor(selector) {
    this._selector = document.querySelector(`.${selector}`);
    this._closeButton = this._selector.querySelector(".popup__close-button");
    this._form = this._selector.querySelector(".popup__form");
  }

  open() {
    this._selector.classList.add("popup_open");

    document.addEventListener("keyup", this._handleEscClose);
    document.addEventListener("click", this._handleOverlay);
  }

  close = () => {
    this._selector.classList.remove("popup_open");

    document.removeEventListener("keyup", this._handleEscClose);
    document.removeEventListener("click", this._handleOverlay);
  };

  setEventListeners() {
    this._closeButton.addEventListener("click", this.close);

    //console.log("parent close click");
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

  _close = () => {
    console.log("close image child");
    super.close();
  };

  getPhoto() {
    return this._imagePopupPhoto;
  }

  getDescription() {
    return this._description;
  }

  setImageSource(source) {
    this._imagePopupPhoto.src = source;
  }

  setImageAlt(text) {
    //console.log("decription => ", text);
    this._imagePopupPhoto.alt = text;
  }

  setEventListeners() {
    //this._selector.addEventListener("click", this._close);
  }
}

/**
 *
 * continue not close button
 */

class PopupWithForm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submit = submit;

    console.log("form =>", this._form);
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
    //this._form.addEventListener("submit", this.test);
    //this._selector.addEventListener("click", this._close);
  }

  /*
  test = (event) => {
    event.preventDefault();
    console.log("test");
  };*/

  /*
  _handleSubmit = (event) => {
    event.preventDefault();

    //console.log("target =>", event.target);
    const cardId = new Date().getTime();

    //in index
    createCard(cardId, placeTitle.value, placeLink.value, "#card-default");

    this._form.reset();

    //handleCloseAddCardPopupButtonClick();
    super.close();
  };*/
}

export { Popup, PopupWithForm, PopupWithImage };
