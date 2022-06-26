import { cardsData } from "./cards-data.js";

import { Card } from "./card.js";

import { openPopup, closePopup, editProfilePopup, addCardPopup, imagePopup } from "./utils.js";

import { FormValidator } from "./validate.js";

import { settings } from "./settings.js";

const closeEditProfileButton = document.querySelector(".popup__close-button_type_edit-profile");

const closeAddCardButton = document.querySelector(".popup__close-button_type_add-card");

const closeFloatImageButton = document.querySelector(".popup__close-button_type_float-image");

const editProfileButton = document.querySelector(".profile__edit-button");

const addCardButton = document.querySelector(".profile__add-button");

const title = document.querySelector(".profile__title");

const subtitle = document.querySelector(".profile__subtitle");

const editProfileForm = document.querySelector(".popup__form_type_edit-profile");

const addCardForm = document.querySelector(".popup__form_type_add-card");

const popupName = document.getElementById("popup-name");

const popupAboutMe = document.getElementById("popup-about-me");

initializeCards(cardsData);

function initializeCards(data) {
  cardsData.forEach((cardData, index) => {
    const card = new Card(index, cardData.name, cardData.link, cardData.selector).generateCard();

    renderCard(card);
  });
}

function populateProfilePopup() {
  popupName.value = title.textContent;
  popupAboutMe.value = subtitle.textContent;
}

populateProfilePopup();

function handleEditProfileButtonClick() {
  openPopup(editProfilePopup);

  popupName.value = title.textContent;
  popupAboutMe.value = subtitle.textContent;
}

function handleOpenAddCardPopupButtonClick() {
  openPopup(addCardPopup);
}

function handleCloseAddCardPopupButtonClick() {
  closePopup(addCardPopup);
}

function handleCloseEditProfilePopupButtonClick() {
  closePopup(editProfilePopup);
}

function handleCloseFloatImageButtonClick() {
  closePopup(imagePopup);
}

function handleOpenProfileFormSubmit(event) {
  event.preventDefault();

  title.textContent = popupName.value;
  subtitle.textContent = popupAboutMe.value;

  closePopup(editProfilePopup);
}

function handleOpenCardFormSubmit(event) {
  event.preventDefault();

  const cardId = new Date().getTime();

  const placeTitle = document.querySelector("#popup-title").value;

  const placeLink = document.querySelector("#popup-link").value;

  const cardElement = new Card(cardId, placeTitle, placeLink, "#card-default").generateCard();

  renderCard(cardElement);

  addCardForm.reset();

  handleCloseAddCardPopupButtonClick();
}

function renderCard(cardElement) {
  const cards = document.querySelector(".elements");

  cards.prepend(cardElement);
}

function enableValidation() {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));

  forms.forEach(function (form) {
    new FormValidator(settings, form).enableValidation();
  });
}

enableValidation();

closeEditProfileButton.addEventListener("click", handleCloseEditProfilePopupButtonClick);
closeAddCardButton.addEventListener("click", handleCloseAddCardPopupButtonClick);
closeFloatImageButton.addEventListener("click", handleCloseFloatImageButtonClick);
editProfileButton.addEventListener("click", handleEditProfileButtonClick);
addCardButton.addEventListener("click", handleOpenAddCardPopupButtonClick);
editProfileForm.addEventListener("submit", handleOpenProfileFormSubmit);
addCardForm.addEventListener("submit", handleOpenCardFormSubmit);
