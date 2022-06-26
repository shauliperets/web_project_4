import { settings } from "./settings.js";

export const editProfilePopup = document.querySelector(".popup_type_edit-profile");

export const addCardPopup = document.querySelector(".popup_type_add-card");

export const imagePopup = document.querySelector(".popup_float-image");

function clearInputs(popup) {
  const inputs = Array.from(popup.querySelectorAll(settings.inputSelector));

  inputs.forEach(function (input) {
    input.value = "";
  });
}

export function openPopup(popup) {
  popup.classList.add("popup_open");

  document.addEventListener("keypress", handelKeypressEvent);
}

export function closePopup(popup) {
  popup.classList.remove("popup_open");

  document.removeEventListener("keypress", handelKeypressEvent);

  clearInputs(popup);
}

function handelKeypressEvent(event) {
  if (event.target.getAttribute("type") != "text" && event.target.getAttribute("type") != "url") {
    event.preventDefault();
  }

  if (event.key == "Escape" || event.key == "q") {
    closePopup(editProfilePopup);

    closePopup(addCardPopup);

    closePopup(imagePopup);
  }
}

export function handleDeleteClick(id) {
  document.getElementById(id).remove();
}

export function handleLikeIconClick(id) {
  const likeIcon = document.getElementById(`card-${id}`).querySelector(".card__icon");

  if (likeIcon.src.includes("/heart.svg")) {
    likeIcon.src = "./images/heart-black.svg";
  } else {
    likeIcon.src = "./images/heart.svg";
  }
}
