let closeButton = document.querySelector(".popup__close-button");

let editButton = document.querySelector(".profile__edit-button");

let saveButton = document.querySelector(".popup__save-button");

function handleEditButtonClick() {
  console.log("edit clicked");

  let popup = document.querySelector(".popup");

  popup.classList.toggle("popup__display");

  let title = document.querySelector(".profile__title");

  let subtitle = document.querySelector(".profile__subtitle");

  let inputs = document.querySelectorAll(".popup__input");

  inputs[0].value = title.textContent;
  inputs[1].value = subtitle.textContent;
}

function handleCloseButtonClick() {
  console.log("close clicked");

  let popup = document.querySelector(".popup");

  popup.classList.toggle("popup__display");
}

function handleSaveButtonClick() {
  console.log("save clicked");

  let inputs = document.querySelectorAll(".popup__input");

  let title = document.querySelector(".profile__title");

  let subtitle = document.querySelector(".profile__subtitle");

  let popup = document.querySelector(".popup");

  title.textContent = inputs[0].value;
  subtitle.textContent = inputs[1].value;

  popup.classList.toggle("popup__display");
}

closeButton.addEventListener("click", handleCloseButtonClick);
editButton.addEventListener("click", handleEditButtonClick);
saveButton.addEventListener("click", handleSaveButtonClick);
