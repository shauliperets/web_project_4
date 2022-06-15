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

const editProfileForm = document.querySelector(".popup__form_type_edit-profile");

const addCardForm = document.querySelector(".popup__form_type_add-card");

const popupName = document.getElementById("popup-name");

const popupAboutMe = document.getElementById("popup-about-me");

const imagePopupPhoto = imagePopup.querySelector(".popup__image");

const popup = document.querySelector(".popup");

initializeCards(cardsData);

function initializeCards(data) {
  data.forEach((cardData, index) => {
    const card = createCard(index, cardData.name, cardData.link);

    renderCard(card);
  });
}

function clearInputs(popup) {
  /* start here */
}

function openPopup(popup) {
  popup.classList.add("popup_open");

  document.addEventListener("keypress", handelKeypressEvent);
}

function closePopup(popup) {
  popup.classList.remove("popup_open");

  document.removeEventListener("keypress", handelKeypressEvent);

  clearInputs(popup);
}

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

function handleCloseAddPanelButtonClick() {
  closePopup(addCardPopup);
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

  const cardElement = createCard(cardId, placeTitle, placeLink);

  renderCard(cardElement);

  addCardForm.reset();

  handleCloseAddCardPopupButtonClick();
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

    openPopup(imagePopup);
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

function handelKeypressEvent(event) {
  if (event.target.getAttribute("type") != "text" && event.target.getAttribute("type") != "url") {
    event.preventDefault();
  }

  if (event.key == "Escape" || event.key == "q") {
    editProfilePopup.classList.remove("popup_open");

    addCardPopup.classList.remove("popup_open");

    imagePopup.classList.remove("popup_open");
  }
}

closeEditProfileButton.addEventListener("click", handleCloseEditProfilePopupButtonClick);
closeAddCardButton.addEventListener("click", handleCloseAddCardPopupButtonClick);
closeFloatImageButton.addEventListener("click", handleCloseFloatImageButtonClick);
editProfileButton.addEventListener("click", handleEditProfileButtonClick);
addCardButton.addEventListener("click", handleOpenAddCardPopupButtonClick);
editProfileForm.addEventListener("submit", handleOpenProfileFormSubmit);
addCardForm.addEventListener("submit", handleOpenCardFormSubmit);
