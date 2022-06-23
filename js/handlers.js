import { settings } from "./settings.js";

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
