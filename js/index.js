import { cardsData } from "./cards-data.js";

import { Card } from "./Card.js";

//import { openPopup, closePopup, editProfilePopup, addCardPopup, imagePopup } from "./utils.js";

import { FormValidator } from "./FormValidator.js";

import { settings } from "./settings.js";

import { Section } from "./Section.js";

import { Popup, PopupWithForm, PopupWithImage } from "./Popup.js";

import { UserInfo } from "./UserInfo.js";

const editProfileButton = document.querySelector(".profile__edit-button");

const addCardButton = document.querySelector(".profile__add-button");

const title = document.querySelector(".profile__title");

const subtitle = document.querySelector(".profile__subtitle");

const editProfileForm = document.querySelector(".popup__form_type_edit-profile");

const addCardForm = document.querySelector(".popup__form_type_add-card");

const popupName = document.getElementById("popup-name");

const popupAboutMe = document.getElementById("popup-about-me");

const placeTitle = document.querySelector("#popup-title");

const placeLink = document.querySelector("#popup-link");

const cards = document.querySelector(".elements");

const profilePopup = new PopupWithForm("popup_type_edit-profile", handleOpenProfileFormSubmit);

const addPopup = new PopupWithForm("popup_type_add-card", handleOpenCardFormSubmit);

const imagePopupObj = new PopupWithImage("popup_float-image");

const userInfo = new UserInfo(title.textContent, subtitle.textContent);

/*
initializeCards(cardsData);

function initializeCards(cardsData) {
  cardsData.forEach((cardData, index) => {
    createCard(index, cardData.name, cardData.link, cardData.selector);
  });
}*/

function handleEditProfileButtonClick() {
  //openPopup(editProfilePopup);
  profilePopup.open();

  //profilePopup.

  popupName.value = title.textContent;
  popupAboutMe.value = subtitle.textContent;
}

function handleCloseEditProfilePopupButtonClick() {
  //closePopup(editProfilePopup);
  profilePopup.close();
}

function handleOpenAddCardPopupButtonClick() {
  //openPopup(addCardPopup);
  addPopup.open();
}

function handleCloseAddCardPopupButtonClick() {
  //closePopup(addCardPopup);
  addPopup.close();
}

function handleCloseFloatImageButtonClick() {
  //closePopup(imagePopup);
  imagePopupObj.close();
}

function handleOpenProfileFormSubmit(event) {
  event.preventDefault();

  title.textContent = popupName.value;
  subtitle.textContent = popupAboutMe.value;

  addPopup.close();
}

function handleOpenCardFormSubmit(event) {
  event.preventDefault();

  const cardId = new Date().getTime();

  createCard(cardId, placeTitle.value, placeLink.value, "#card-default");

  addCardForm.reset();

  handleCloseAddCardPopupButtonClick();
}

//-->
const handleCardClick = (event) => {
  console.log(event.target.src);

  imagePopupObj.setImageSource(event.target.src);

  imagePopupObj.open();

  /*
  this._imagePopupPhoto.src = this._element.querySelector(".card__image").src;

  this._imagePopupPhoto.alt = `Photo of ${this._image}`;

  this._imagePopupDescription.textContent = this._text;

  //openPopup(this._imagePopup);

  this._imagePopup.open();*/
};

function createCard(cardId, placeTitle, placeLink, cardSelector) {
  const card = new Card(cardId, placeTitle, placeLink, cardSelector, handleCardClick);
  const cardElement = card.generateCard();
  renderCard(cardElement);
}

function renderCard(cardElement) {
  cards.prepend(cardElement);
}

function enableValidation() {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));

  forms.forEach(function (form) {
    new FormValidator(settings, form).enableValidation();
  });
}

const section = new Section(
  {
    items: cardsData,
    renderer: (cardData) => {
      createCard(cardData.id, cardData.name, cardData.link, cardData.selector);
    },
  },
  "elements"
);

section.renderer();

enableValidation();

profilePopup.setEventListeners();
addPopup.setEventListeners();

//closeEditProfileButton.addEventListener("click", handleCloseEditProfilePopupButtonClick);
//closeAddCardButton.addEventListener("click", handleCloseAddCardPopupButtonClick);
//closeFloatImageButton.addEventListener("click", handleCloseFloatImageButtonClick);
editProfileButton.addEventListener("click", handleEditProfileButtonClick);
addCardButton.addEventListener("click", handleOpenAddCardPopupButtonClick);
//editProfileForm.addEventListener("submit", handleOpenProfileFormSubmit);
//addCardForm.addEventListener("submit", handleOpenCardFormSubmit);
