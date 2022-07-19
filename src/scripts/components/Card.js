//import { openPopup } from "./utils.js";

import { PopupWithImage } from "./Popup.js";

import { heartIcon, blackHeartIcon } from "../utils/constanst.js";

export class Card {
  constructor(cardId, text, image, selector, handleCardClick) {
    this._cardId = cardId;
    this._text = text;
    this._image = image;
    this._selector = document.querySelector(selector);
    this._likeIcon = this._selector.content.querySelector(".card__icon");
    this._likeIcon.src = heartIcon;
    this._isLiked = false;
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
    //const cardTemplate = document.querySelector(this._selector).content;
    const cardTemplate = this._selector.content;

    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._setLikeIconClick();

    this._setDeleteClick();

    this._setImageClick();
  }

  _setLikeIconClick() {
    this._element.querySelector(".card__like-button").addEventListener("click", this._handleLikeIconClick);
  }

  _setDeleteClick() {
    this._element.querySelector(".card__delete-button").addEventListener("click", this._handleDeleteClick);
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

  _handleDeleteClick = () => {
    this._element.remove();
  };

  _handleLikeIconClick = () => {
    console.log("before _handleLikeIconClick clicked...", this._likeIcon, this._likeIcon.src, this._isLiked);

    if (this._isLiked) {
      //this._likeIcon.src = "./images/heart-black.svg";
      this._likeIcon.src = heartIcon;
      this._isLiked = false;
    } else {
      //this._likeIcon.src = "./images/heart.svg";
      this._likeIcon.src = blackHeartIcon;
      this._isLiked = true;
    }

    console.log("after _handleLikeIconClick clicked...", this._likeIcon, this._likeIcon.src, this._isLiked);
  };
}
