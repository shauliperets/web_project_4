//import { openPopup } from "./utils.js";

import { PopupWithImage } from "./Popup.js";

export class Card {
  constructor(cardId, text, image, selector, handleCardClick) {
    this._cardId = cardId;
    this._text = text;
    this._image = image;
    this._selector = selector;

    //this._imagePopup = new PopupWithImage("popup_float-image");
    //this._imagePopup = popupWithImage;
    //this._imagePopup = document.querySelector(".popup_float-image");
    //this._imagePopupPhoto = popupWithImage.getPhoto();
    //this._imagePopupDescription = popupWithImage.getDescription();
    this._handleCardClick = handleCardClick;
  }

  generateCard() {
    this._element = this._getTemplate();

    const cardTitle = this._element.querySelector(".card__title");
    const cardImage = this._element.querySelector(".card__image");

    this._element.id = `card-${this._cardId}`;
    cardTitle.textContent = this._text;
    cardImage.src = this._image;
    cardImage.alt = `Photo of ${this._text}`;

    this._setEventListeners();

    return this._element;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._selector).content;

    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._setLikeIconClick();

    this._setDeleteClick();

    this._setImageClick();
  }

  _setLikeIconClick() {
    this._element.querySelector(".card__like-button").addEventListener("click", () => {
      this._handleLikeIconClick(this._cardId);
    });
  }

  _setDeleteClick() {
    this._element.querySelector(".card__delete-button").addEventListener("click", () => {
      this._handleDeleteClick();
    });
  }

  _setImageClick() {
    this._element.querySelector(".card__image").addEventListener("click", this._handleCardClick);

    /*
    this._element.querySelector(".card__image").addEventListener("click", () => {
      this._imagePopupPhoto.src = this._element.querySelector(".card__image").src;

      this._imagePopupPhoto.alt = `Photo of ${this._image}`;

      this._imagePopupDescription.textContent = this._text;

      //openPopup(this._imagePopup);

      this._imagePopup.open();
    });
    */
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleLikeIconClick(id) {
    const likeIcon = this._element.querySelector(".card__icon");

    if (likeIcon.src.includes("/heart.svg")) {
      likeIcon.src = "./images/heart-black.svg";
    } else {
      likeIcon.src = "./images/heart.svg";
    }
  }
}
