//import { openPopup } from "./index.js";

import { openPopup, handleDeleteClick } from "./handlers.js";

export class Card {
  constructor(cardId, text, image, selector) {
    this._cardId = cardId;
    this._text = text;
    this._image = image;
    this._selector = selector;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.id = `card-${this._cardId}`;
    this._element.querySelector(".card__title").textContent = this._text;
    this._element.querySelector(".card__image").src = this._image;
    this._element.querySelector(".card__image").alt = `Photo of ${this._text}`;

    this._setEventListeners();

    return this._element;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector("#card").content;

    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector(".card__like-button").addEventListener("click", () => {
      handleLikeIconClick(this._cardId);
    });

    this._element.querySelector(".card__delete-button").addEventListener("click", () => {
      handleDeleteClick(`card-${this._cardId}`);
    });

    const imagePopup = document.querySelector(".popup_float-image");

    const imagePopupPhoto = imagePopup.querySelector(".popup__image");

    this._element.querySelector(".card__image").addEventListener("click", () => {
      imagePopupPhoto.src = document.getElementById(this._element.id).querySelector(".card__image").src;

      imagePopupPhoto.alt = `Photo of ${this._image}`;

      openPopup(imagePopup);
    });
  }
}
