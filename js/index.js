const closeEditProfileButton = document.querySelector(".popup__close-button_type_edit-profile");

const closeAddCardButton = document.querySelector(".popup__close-button_type_add-card");

const closeFloatImageButton = document.querySelector(".popup__close-button_type_float-image");

const editProfileButton = document.querySelector(".profile__edit-button");

const addCardButton = document.querySelector(".profile__add-button");

const editProfilePopup = document.querySelector(".popup_type_edit-profile");

const addCardPopup = document.querySelector(".popup_type_add-card");

const imagePopup = document.querySelector(".popup__type_float-image");

const title = document.querySelector(".profile__title");

const subtitle = document.querySelector(".profile__subtitle");

const inputs = document.querySelectorAll(".popup__input");

const editProfileForm = document.querySelector(".popup__form_type_edit-profile");

const addCardForm = document.querySelector(".popup__form_type_add-card");

const popupName = document.getElementById("popup-name");

const popupAboutMe = document.getElementById("popup-about-me");

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
  const cardTemplate = document.querySelector("#card").content;

  const cards = document.querySelector(".elements");

  data.forEach((card, index) => {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardId = "card-" + index;
    cardElement.id = cardId;
    cardElement.querySelector(".card__title").textContent = card.name;
    cardElement.querySelector(".card__image").src = card.link;
    cardElement.querySelector(".card__image").alt = `Photo of ${card.name}`;
    cardElement.querySelector(".card__like-button").addEventListener("click", () => {
      handleIconClick(cardId);
    });
    cardElement.querySelector(".card__delete-button").addEventListener("click", () => {
      handleDeleteClick(cardId);
    });
    cardElement.querySelector(".card__image").addEventListener("click", () => {
      const imageElement = imagePopup.querySelector(".popup__image");
      imageElement.src = card.link;
      imageElement.alt = `Photo of ${card.name}`;
      toggleImagePopup();
    });

    cards.append(cardElement);
  });
}

function toggleImagePopup() {
  imagePopup.classList.toggle("popup_open");
}

function handleEditProfileButtonClick() {
  editProfilePopup.classList.toggle("popup_open");

  popupName.value = title.textContent;
  popupAboutMe.value = subtitle.textContent;
}

function handleToggleAddCardPopupButtonClick() {
  addCardPopup.classList.toggle("popup_open");
}

function handleToggleEditProfilePopupButtonClick() {
  editProfilePopup.classList.toggle("popup_open");
}

function handleCloseAddPanelButtonClick() {
  addCardPopup.classList.toggle("popup_open");
}

function handleCloseFloatImageButtonClick() {
  imagePopup.classList.toggle("popup_open");
}

function handleProfileFormSubmit(event) {
  event.preventDefault();

  title.textContent = popupName.value;
  subtitle.textContent = popupAboutMe.value;

  editProfilePopup.classList.toggle("popup_open");
}

function handleCardFormSubmit(event) {
  event.preventDefault();

  const cardElement = createCard();

  renderCard(cardElement);

  addCardForm.reset();

  handleToggleAddCardPopupButtonClick();
}

function renderCard(cardElement) {
  const cards = document.querySelector(".elements");

  cards.prepend(cardElement);
}

function createCard() {
  const cardTemplate = document.querySelector("#card").content;

  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardId = "card-" + new Date().getTime();

  const placeTitle = document.querySelector("#popup-title").value;

  cardElement.id = cardId;

  cardElement.querySelector(".card__title").textContent = placeTitle;
  cardElement.querySelector(".card__image").src = document.querySelector("#popup-link").value;
  cardElement.querySelector(".card__image").alt = `Photo of ${placeTitle}`;

  cardElement.querySelector(".card__like-button").addEventListener("click", () => {
    handleIconClick(cardId);
  });

  cardElement.querySelector(".card__delete-button").addEventListener("click", () => {
    handleDeleteClick(cardId);
  });
  cardElement.querySelector(".card__image").addEventListener("click", () => {
    imagePopup.querySelector(".popup__image").src = document.getElementById(cardId).querySelector(".card__image").src;

    imagePopup.querySelector(".popup__image").alt = `Photo of ${placeTitle}`;

    toggleImagePopup();
  });

  return cardElement;
}

function handleIconClick(id) {
  const likeIcon = document.getElementById(id).querySelector(".card__icon");
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
