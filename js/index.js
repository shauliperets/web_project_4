let closeButton = document.querySelector(".popup__close-button");

let editButton = document.querySelector(".profile__edit-button");

let popup = document.querySelector(".popup");

let title = document.querySelector(".profile__title");

let subtitle = document.querySelector(".profile__subtitle");

let inputs = document.querySelectorAll(".popup__input");

let form = document.querySelector(".popup__form");

let popupName = document.getElementById("popup-name");

let popupAboutMe = document.getElementById("popup-about-me");

//---------------------------------

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

  popupName.value = title.textContent;
  popupAboutMe.value = subtitle.textContent;
}

function handleCloseButtonClick() {
  popup.classList.toggle("popup_display");
}

function handleSaveButtonClick(event) {
  event.preventDefault();

  title.textContent = popupName.value;
  subtitle.textContent = popupAboutMe.value;

  popup.classList.toggle("popup_display");
}

closeButton.addEventListener("click", handleCloseButtonClick);
editButton.addEventListener("click", handleEditButtonClick);
form.addEventListener("submit", handleSaveButtonClick);
