import { cardsData } from "./cards-data.js";

import { Card } from "./Card.js";

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

function handleEditProfileButtonClick() {
  profilePopup.open();

  popupName.value = title.textContent;
  popupAboutMe.value = subtitle.textContent;
}

function handleCloseEditProfilePopupButtonClick() {
  profilePopup.close();
}

function handleOpenAddCardPopupButtonClick() {
  addPopup.open();
}

function handleCloseAddCardPopupButtonClick() {
  addPopup.close();
}

function handleCloseFloatImageButtonClick() {
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

const handleCardClick = (event) => {
  imagePopupObj.setImageSource(event.target.src);

  imagePopupObj.setImageAlt(event.target.alt);

  imagePopupObj.open();
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
imagePopupObj.setEventListeners();

//closeEditProfileButton.addEventListener("click", handleCloseEditProfilePopupButtonClick);
//closeAddCardButton.addEventListener("click", handleCloseAddCardPopupButtonClick);
//closeFloatImageButton.addEventListener("click", handleCloseFloatImageButtonClick);
editProfileButton.addEventListener("click", handleEditProfileButtonClick);
addCardButton.addEventListener("click", handleOpenAddCardPopupButtonClick);
//editProfileForm.addEventListener("submit", handleOpenProfileFormSubmit);
//addCardForm.addEventListener("submit", handleOpenCardFormSubmit);
