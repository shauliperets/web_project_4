let closeEditPanelButton = document.querySelector(".popup__close-button");

let closeAddPanelButton = document.querySelector(".add-popup__close-button");

let editButton = document.querySelector(".profile__edit-button");

let addButton = document.querySelector(".profile__add-button");

let popup = document.querySelector(".popup");

let addPopup = document.querySelector(".add-popup");

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

  data.forEach((card) => {
    cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    cardElement.querySelector(".card__title").textContent = card.name;
    cardElement.querySelector(".card__image").src = card.link;

    cards.append(cardElement);
  });
}

function handleEditButtonClick() {
  popup.classList.toggle("popup_display");

  console.log("add edit");

  popupName.value = title.textContent;
  popupAboutMe.value = subtitle.textContent;
}

function handleAddButtonClick() {
  addPopup.classList.toggle("add-popup_display");

  console.log("add clicked");

  //document.querySelector(".popup__title").textContent = "New Place";

  //document.querySelector("#popup-name").value = "";
  //document.querySelector("#popup-name").placeholder = "Title";

  //document.querySelector("#popup-about-me").value = "";
  //document.querySelector("#popup-about-me").placeholder = "Image link";
  //document.querySelector("#popup-name").placeholder = "Title";

  //document.getElementsByName("popup-name")[0].value = "";
  //document.getElementsByName("popup-name").placeholder = "your message";
}

function handleCloseEditPanelButtonClick() {
  popup.classList.toggle("popup_display");
}

function handleCloseAddPanelButtonClick() {
  addPopup.classList.toggle("add-popup_display");
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

  console.log(document.querySelector("#add-popup-title").value);

  cardElement.querySelector(".card__title").textContent =
    document.querySelector("#add-popup-title").value;
  cardElement.querySelector(".card__image").src =
    document.querySelector("#add-popup-link").value;

  cards.append(cardElement);

  addPopup.classList.toggle("add-popup_display");
}

closeEditPanelButton.addEventListener("click", handleCloseEditPanelButtonClick);
closeAddPanelButton.addEventListener("click", handleCloseAddPanelButtonClick);
editButton.addEventListener("click", handleEditButtonClick);
addButton.addEventListener("click", handleAddButtonClick);
form.addEventListener("submit", handleSaveButtonClick);
addForm.addEventListener("submit", handleCreateButtonClick);
