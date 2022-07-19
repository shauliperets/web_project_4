import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);

    this._imagePopupPhoto = this._selector.querySelector(".popup__image");
    this._description = this._selector.querySelector(".popup__image-description");
  }

  getPhoto() {
    return this._imagePopupPhoto;
  }

  getDescription() {
    return this._description;
  }

  setImage(source, text) {
    this._imagePopupPhoto.src = source;
    this._imagePopupPhoto.alt = text;
    this._description.textContent = text;
  }
}

export { PopupWithImage };
