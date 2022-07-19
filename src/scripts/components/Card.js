import { heartIcon, blackHeartIcon } from "../utils/constanst.js";

export class Card {
  constructor(cardId, text, image, selector, handleCardClick) {
    this._cardId = cardId;
    this._text = text;
    this._image = image;

    console.log("selector =>", selector);
    this._selector = document.querySelector(selector);

    this._element = this._getTemplate();
    const cardTitle = this._element.querySelector(".card__title");
    const cardImage = this._element.querySelector(".card__image");

    this._element.id = `card-${this._cardId}`;
    cardTitle.textContent = this._text;
    cardImage.src = this._image;
    cardImage.alt = `Photo of ${this._text}`;

    this._likeIcon = this._element.querySelector(".card__icon");

    this._likeIcon.src = heartIcon;
    this._isLiked = false;
    this._handleCardClick = handleCardClick;
  }

  setCard() {
    this._setEventListeners();

    return this._element;
  }

  _getTemplate() {
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
  }

  _handleDeleteClick = () => {
    this._element.remove();
  };

  _handleLikeIconClick = () => {
    if (this._isLiked) {
      this._likeIcon.src = heartIcon;
      this._isLiked = false;
    } else {
      this._likeIcon.src = blackHeartIcon;
      this._isLiked = true;
    }
  };
}
