import { cardsData } from "../scripts/utils/cards-data.js";

import { Card } from "../scripts/components/Card.js";

import { FormValidator } from "../scripts/components/FormValidator.js";

import { settings } from "../scripts/utils/settings.js";

import { Section } from "../scripts/components/Section.js";

import { PopupWithForm } from "../scripts/components/PopupWithForm.js";

import { PopupWithImage } from "../scripts/components/PopupWithImage.js";

import { UserInfo } from "../scripts/components/UserInfo.js";

import "./index.css";

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

const userInfo = new UserInfo({ username: title.textContent, userJob: subtitle.textContent });

function handleEditProfileButtonClick() {
  profilePopup.open();

  const user = userInfo.getUserInfo();

  popupName.value = user.name;
  popupAboutMe.value = user.job;
}

function handleOpenAddCardPopupButtonClick() {
  addPopup.open();
}

function handleCloseAddCardPopupButtonClick() {
  addPopup.close();
}

const handleEditProfileFormSubmit = (event) => {
  event.preventDefault();

  const name = event.target.querySelector("#popup-name").value;
  const job = event.target.querySelector("#popup-about-me").value;

  userInfo.setUserInfo(name, job);

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
  imagePopupObj.setImage(event.target.src, event.target.alt);

  imagePopupObj.open();
};

function createCard(cardId, placeTitle, placeLink, cardSelector) {
  const card = new Card(cardId, placeTitle, placeLink, cardSelector, handleCardClick);
  const cardElement = card.setCard();
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

profilePopup.setEventListeners();
addPopup.setEventListeners();
imagePopupObj.setEventListeners();

editProfileButton.addEventListener("click", handleEditProfileButtonClick);
addCardButton.addEventListener("click", handleOpenAddCardPopupButtonClick);
