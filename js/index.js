let closeEditPanelButton = document.querySelector(".popup__close-button");

let closeAddPanelButton = document.querySelector(".add-popup__close-button");

const closeImageButton = document.querySelector(".image-popup__close-button");

let editButton = document.querySelector(".profile__edit-button");

let addButton = document.querySelector(".profile__add-button");

let popup = document.querySelector(".popup");

let addPopup = document.querySelector(".add-popup");

const imagePopup = document.querySelector(".image-popup");

let title = document.querySelector(".profile__title");

let subtitle = document.querySelector(".profile__subtitle");

let inputs = document.querySelectorAll(".popup__input");

let form = document.querySelector(".popup__form");

let addForm = document.querySelector(".add-popup__form");

let popupName = document.getElementById("popup-name");

let popupAboutMe = document.getElementById("popup-about-me");

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

initialCards(cardsData);

function initialCards(data) {
  const cardTemplate = document.querySelector("#card").content;

  const cards = document.querySelector(".elements");

  let cardElement;

  data.forEach((card, index) => {
    cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    let cardId = "card-" + index;
    cardElement.id = cardId;
    cardElement.querySelector(".card__title").textContent = card.name;
    cardElement.querySelector(".card__image").src = card.link;
    cardElement.querySelector(".card__like-button").addEventListener("click", () => {
      handleIconClick(cardId);
    });
    cardElement.querySelector(".card__delete-button").addEventListener("click", () => {
      handleDeleteClick(cardId);
    });
    cardElement.querySelector(".card__image").addEventListener("click", () => {
      imagePopup.querySelector(".image-popup__image").src = card.link;
      imagePopup.classList.toggle("image-popup__display");

      //let left = Number(imagePopup.querySelector(".image-popup__image").clientWidth) * 1.15;

      //imagePopup.querySelector(".image-popup__close-button").style.left += left + "px";

      console.log("w=>", left);
    });

    cards.append(cardElement);
  });
}

function handleEditButtonClick() {
  popup.classList.toggle("popup_display");

  popupName.value = title.textContent;
  popupAboutMe.value = subtitle.textContent;
}

function handleAddButtonClick() {
  addPopup.classList.toggle("add-popup_display");
}

function handleCloseEditPanelButtonClick() {
  popup.classList.toggle("popup_display");
}

function handleCloseAddPanelButtonClick() {
  addPopup.classList.toggle("add-popup_display");
}

function handleCloseImageButtonClick() {
  imagePopup.classList.toggle("image-popup__display");
}

function handleSaveButtonClick(event) {
  event.preventDefault();

  title.textContent = popupName.value;
  subtitle.textContent = popupAboutMe.value;

  popup.classList.toggle("popup_display");
}

function handleCreateButtonClick(event) {
  event.preventDefault();

  const cardTemplate = document.querySelector("#card").content;

  const cards = document.querySelector(".elements");

  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  let cardId = "card-" + new Date().getTime();

  cardElement.id = cardId;

  cardElement.querySelector(".card__title").textContent = document.querySelector("#add-popup-title").value;
  cardElement.querySelector(".card__image").src = document.querySelector("#add-popup-link").value;

  cardElement.querySelector(".card__like-button").addEventListener("click", () => {
    handleIconClick(cardId);
  });

  cardElement.querySelector(".card__delete-button").addEventListener("click", () => {
    handleDeleteClick(cardId);
  });

  cards.prepend(cardElement);

  addPopup.classList.toggle("add-popup_display");
}

function handleIconClick(id) {
  if (document.getElementById(id).querySelector(".card__icon").src.includes("/heart.svg")) {
    document.getElementById(id).querySelector(".card__icon").src = "./images/heart-black.svg";
  } else {
    document.getElementById(id).querySelector(".card__icon").src = "./images/heart.svg";
  }
}

function handleDeleteClick(id) {
  const cards = document.querySelector(".elements");

  document.getElementById(id).remove();
}

closeEditPanelButton.addEventListener("click", handleCloseEditPanelButtonClick);
closeAddPanelButton.addEventListener("click", handleCloseAddPanelButtonClick);
closeImageButton.addEventListener("click", handleCloseImageButtonClick);
editButton.addEventListener("click", handleEditButtonClick);
addButton.addEventListener("click", handleAddButtonClick);
form.addEventListener("submit", handleSaveButtonClick);
addForm.addEventListener("submit", handleCreateButtonClick);
