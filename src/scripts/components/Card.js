//import { openPopup } from "./utils.js";

import { PopupWithImage } from "./Popup.js";

import { heartIcon, blackHeartIcon } from "../utils/constanst.js";

export class Card {
  constructor(cardId, text, image, selector, handleCardClick) {
    this._cardId = cardId;
    this._text = text;
    this._image = image;
    this._selector = document.querySelector(selector);
    //console.log("selector => ", this._selector.content);
    this._likeIcon = this._selector.content.querySelector(".card__icon");
    this._likeIcon.src = heartIcon;
    //console.log("likeIcon =>", this._likeIcon);
    this._isLiked = false;
    //console.log("this =>", this);
    //this._imagePopup = new PopupWithImage("popup_float-image");
    //this._imagePopup = popupWithImage;
    //this._imagePopup = document.querySelector(".popup_float-image");
    //t\is._imagePopupPhoto = popupWithImage.getPhoto();
    //this._imagePopupDescription = popupWithImage.getDescription();
    this._handleCardClick = handleCardClick;
  }

  generateCard() {
    this._element = this._getTemplate();

    //console.log("selector =>", this._selector);
    //console.log("elemetnt =>", this._element);

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
    console.log("before _handleLikeIconClick clicked...", this._cardId, this._likeIcon.src, this._isLiked);
    if (this._isLiked) {
      //likeIcon.src = "<%=require('./images/heart-black.svg')%>";
      this._likeIcon.src = heartIcon;
      this._isLiked = false;
    } else {
      //likeIcon.src = "<%=require('./images/heart.svg')%>";
      this._likeIcon.src = blackHeartIcon;
      this._isLiked = true;
    }

    console.log("after _handleLikeIconClick clicked...", this._cardId, this._likeIcon.src, this._isLiked);
  };
}
