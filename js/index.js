import { cardsData } from "./cards-data.js";

import { Card } from "./Card.js";

import { openPopup, closePopup, editProfilePopup, addCardPopup, imagePopup } from "./utils.js";

import { FormValidator } from "./FormValidator.js";

import { settings } from "./settings.js";

import { Section } from "./Section.js";

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

const placeTitle = document.querySelector("#popup-title");

const placeLink = document.querySelector("#popup-link");

const cards = document.querySelector(".elements");

const section = new Section(
  {
    items: cardsData,
    renderer: (cardData) => {
      console.log("renderer callback");

      createCard(cardData.id, cardData.name, cardData.link, cardData.selector);
    },
  },
  "elements"
);

section.renderer();

/*
const profilePopup = PopupWithForm("popup_type_edit-profile", () => {
  console.log("profile callback");
});

const addopup = PopupWithForm("popup_type_add-card", () => {
  console.log("add card callback");
});
*/

/*
initializeCards(cardsData);

function initializeCards(cardsData) {
  cardsData.forEach((cardData, index) => {
    createCard(index, cardData.name, cardData.link, cardData.selector);
  });
}*/

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

  createCard(cardId, placeTitle.value, placeLink.value, "#card-default");

  addCardForm.reset();

  handleCloseAddCardPopupButtonClick();
}

function createCard(cardId, placeTitle, placeLink, cardSelector) {
  const card = new Card(cardId, placeTitle, placeLink, cardSelector);
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

enableValidation();

closeEditProfileButton.addEventListener("click", handleCloseEditProfilePopupButtonClick);
closeAddCardButton.addEventListener("click", handleCloseAddCardPopupButtonClick);
closeFloatImageButton.addEventListener("click", handleCloseFloatImageButtonClick);
editProfileButton.addEventListener("click", handleEditProfileButtonClick);
addCardButton.addEventListener("click", handleOpenAddCardPopupButtonClick);
editProfileForm.addEventListener("submit", handleOpenProfileFormSubmit);
addCardForm.addEventListener("submit", handleOpenCardFormSubmit);
