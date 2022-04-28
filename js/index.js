let closeButton = document.querySelector(".popup__close-button");

let editButton = document.querySelector(".profile__edit-button");

let saveButton = document.querySelector(".popup__save-button");

let popup = document.querySelector(".popup");

let title = document.querySelector(".profile__title");

let subtitle = document.querySelector(".profile__subtitle");

let inputs = document.querySelectorAll(".popup__input");

function handleEditButtonClick() {
  popup.classList.toggle("popup_display");

  document.getElementById("popup-name").value = title.textContent;
  document.getElementById("popup-about-me").value = subtitle.textContent;
}

function handleCloseButtonClick() {
  popup.classList.toggle("popup_display");
}

function handleSaveButtonClick() {
  title.textContent = inputs[0].value;
  subtitle.textContent = inputs[1].value;

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
/*saveButton.addEventListener("click", handleSaveButtonClick);*/
