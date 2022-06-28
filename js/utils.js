import { settings } from "./settings.js";

export const editProfilePopup = document.querySelector(".popup_type_edit-profile");

export const addCardPopup = document.querySelector(".popup_type_add-card");

export const imagePopup = document.querySelector(".popup_float-image");

export function openPopup(popup) {
  popup.classList.add("popup_open");

  document.addEventListener("keyup", handelKeypressEvent);
}

export function closePopup(popup) {
  popup.classList.remove("popup_open");

  document.removeEventListener("keyup", handelKeypressEvent);
}

export function handleOverlay(event) {
  if (event.target.classList.contains("popup")) {
    closePopup(event.target);
  }
}

function handelKeypressEvent(event) {
  event.preventDefault();

  if (event.key == "Escape" || event.key == "q") {
    closePopup(editProfilePopup);

    closePopup(addCardPopup);

    closePopup(imagePopup);
  }
}
