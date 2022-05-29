const closeEditProfileButton = document.querySelector(".popup__close-button_type_edit-profile");

const closeAddCardButton = document.querySelector(".popup__close-button_type_add-card");

const closeFloatImageButton = document.querySelector(".popup__close-button_type_float-image");

const editProfileButton = document.querySelector(".profile__edit-button");

const addCardButton = document.querySelector(".profile__add-button");

const editProfilePopup = document.querySelector(".popup_type_edit-profile");

const addCardPopup = document.querySelector(".popup_type_add-card");

const imagePopup = document.querySelector(".popup_float-image");

const title = document.querySelector(".profile__title");

const subtitle = document.querySelector(".profile__subtitle");

const inputs = document.querySelectorAll(".popup__input");

const editProfileForm = document.querySelector(".popup__form_type_edit-profile");

const addCardForm = document.querySelector(".popup__form_type_add-card");

const popupName = document.getElementById("popup-name");

const popupAboutMe = document.getElementById("popup-about-me");

const imagePopupPhoto = imagePopup.querySelector(".popup__image");

const cardsData = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

initializeCards(cardsData);

function initializeCards(data) {
  const cards = document.querySelector(".elements");

  data.forEach((cardData, index) => {
    const card = createCard(index, cardData.name, cardData.link);

    renderCard(card);
  });
}

function togglePopup(popup) {
  popup.classList.toggle("popup_open");
}

function handleEditProfileButtonClick() {
  togglePopup(editProfilePopup);

  popupName.value = title.textContent;
  popupAboutMe.value = subtitle.textContent;
}

function handleToggleAddCardPopupButtonClick() {
  togglePopup(addCardPopup);
}

function handleToggleEditProfilePopupButtonClick() {
  togglePopup(editProfilePopup);
}

function handleCloseAddPanelButtonClick() {
  togglePopup(addCardPopup);
}

function handleCloseFloatImageButtonClick() {
  togglePopup(imagePopup);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();

  title.textContent = popupName.value;
  subtitle.textContent = popupAboutMe.value;

  togglePopup(editProfilePopup);
}

function handleCardFormSubmit(event) {
  event.preventDefault();

  const cardId = new Date().getTime();

  const placeTitle = document.querySelector("#popup-title").value;

  const placeLink = document.querySelector("#popup-link").value;

  const cardElement = createCard(cardId, placeTitle, placeLink);

  renderCard(cardElement);

  addCardForm.reset();

  handleToggleAddCardPopupButtonClick();
}

function renderCard(cardElement) {
  const cards = document.querySelector(".elements");

  cards.prepend(cardElement);

  const renderedCard = document.querySelector(`#${cardElement.id}`);
}

function createCard(cardId, placeTitle, placeLink) {
  const cardTemplate = document.querySelector("#card").content;

  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.id = `card-${cardId}`;

  cardElement.querySelector(".card__title").textContent = placeTitle;
  cardElement.querySelector(".card__image").src = placeLink;
  cardElement.querySelector(".card__image").alt = `Photo of ${placeTitle}`;

  cardElement.querySelector(".card__like-button").addEventListener("click", () => {
    handleIconClick(cardId);
  });

  cardElement.querySelector(".card__delete-button").addEventListener("click", () => {
    handleDeleteClick(`card-${cardId}`);
  });

  cardElement.querySelector(".card__image").addEventListener("click", () => {
    imagePopupPhoto.src = document.getElementById(cardElement.id).querySelector(".card__image").src;

    imagePopupPhoto.alt = `Photo of ${placeTitle}`;

    togglePopup(imagePopup);
  });

  return cardElement;
}

function handleIconClick(id) {
  const likeIcon = document.getElementById(`card-${id}`).querySelector(".card__icon");

  if (likeIcon.src.includes("/heart.svg")) {
    likeIcon.src = "./images/heart-black.svg";
  } else {
    likeIcon.src = "./images/heart.svg";
  }
}

function handleDeleteClick(id) {
  const cards = document.querySelector(".elements");

  document.getElementById(id).remove();
}

closeEditProfileButton.addEventListener("click", handleToggleEditProfilePopupButtonClick);
closeAddCardButton.addEventListener("click", handleToggleAddCardPopupButtonClick);
closeFloatImageButton.addEventListener("click", handleCloseFloatImageButtonClick);
editProfileButton.addEventListener("click", handleEditProfileButtonClick);
addCardButton.addEventListener("click", handleToggleAddCardPopupButtonClick);
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleCardFormSubmit);
