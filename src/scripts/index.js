import { cardsData } from "./utils/cards-data.js";

import { Card } from "./components/Card.js";

import { FormValidator } from "./components/FormValidator.js";

import { settings } from "./utils/settings.js";

import { Section } from "./components/Section.js";

import { PopupWithForm, PopupWithImage } from "./components/Popup.js";

import { UserInfo } from "./components/UserInfo.js";

import "../styles/pages/index.css";

const editProfileButton = document.querySelector(".profile__edit-button");

const addCardButton = document.querySelector(".profile__add-button");

const title = document.querySelector(".profile__title");

const subtitle = document.querySelector(".profile__subtitle");

const addCardForm = document.querySelector(".popup__form_type_add-card");

const popupName = document.getElementById("popup-name");

const popupAboutMe = document.getElementById("popup-about-me");

const placeTitle = document.querySelector("#popup-title");

const placeLink = document.querySelector("#popup-link");

const cards = document.querySelector(".elements");

function handleEditProfileButtonClick() {
  profilePopup.open();

  popupName.value = title.textContent;
  popupAboutMe.value = subtitle.textContent;
}

function handleOpenAddCardPopupButtonClick() {
  addPopup.open();
}

function handleCloseAddCardPopupButtonClick() {
  addPopup.close();
}

const handleEditProfileFormSubmit = (event) => {
  event.preventDefault();

  document.querySelector(".profile__title").textContent = event.target.querySelector("#popup-name").value;
  document.querySelector(".profile__subtitle").textContent = event.target.querySelector("#popup-about-me").value;

  profilePopup.close();
};

const handleOpenCardFormSubmit = (event) => {
  event.preventDefault();

  const cardId = new Date().getTime();

  createCard(cardId, placeTitle.value, placeLink.value, "#card-default");

  addCardForm.reset();

  handleCloseAddCardPopupButtonClick();
};

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

const profilePopup = new PopupWithForm("popup_type_edit-profile", handleEditProfileFormSubmit);

const addPopup = new PopupWithForm("popup_type_add-card", handleOpenCardFormSubmit);

const imagePopupObj = new PopupWithImage("popup_float-image");

const userInfo = new UserInfo(title.textContent, subtitle.textContent);

profilePopup.setEventListeners();
addPopup.setEventListeners();
imagePopupObj.setEventListeners();

editProfileButton.addEventListener("click", handleEditProfileButtonClick);
addCardButton.addEventListener("click", handleOpenAddCardPopupButtonClick);
