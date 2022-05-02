let closeButton = document.querySelector(".popup__close-button");

let editButton = document.querySelector(".profile__edit-button");

/*let saveButton = document.querySelector(".popup__save-button");*/

let popup = document.querySelector(".popup");

let title = document.querySelector(".profile__title");

let subtitle = document.querySelector(".profile__subtitle");

let inputs = document.querySelectorAll(".popup__input");

let form = document.querySelector(".popup__form");

let popupName = document.getElementById("popup-name");

let popupAboutMe = document.getElementById("popup-about-me");

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

/*
function handleIconClick(id) {
  if (document.getElementById(id).src.includes("/heart.svg")) {
    document.getElementById(id).src = "./images/heart-black.svg";
  } else {
    document.getElementById(id).src = "./images/heart.svg";
  }
}
*/

closeButton.addEventListener("click", handleCloseButtonClick);
editButton.addEventListener("click", handleEditButtonClick);
form.addEventListener("submit", handleSaveButtonClick);
