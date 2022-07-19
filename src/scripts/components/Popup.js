class Popup {
  constructor(selector) {
    this._selector = document.querySelector(`.${selector}`);
    this._closeButton = this._selector.querySelector(".popup__close-button");
    this._form = this._selector.querySelector(".popup__form");
  }

  open() {
    this._selector.classList.add("popup_open");

    document.addEventListener("keyup", this._handleEscClose);
    document.addEventListener("click", this._handleOverlay);
  }

  close = () => {
    this._selector.classList.remove("popup_open");

    document.removeEventListener("keyup", this._handleEscClose);
    document.removeEventListener("click", this._handleOverlay);
  };

  setEventListeners() {
    this._closeButton.addEventListener("click", this.close);
  }

  _handleOverlay = (event) => {
    if (event.target.classList.contains("popup")) {
      this.close();
    }
  };

  _handleEscClose = (event) => {
    event.preventDefault();

    if (event.key == "Escape" || event.key == "q") {
      this.close();
    }
  };
}

export { Popup };
