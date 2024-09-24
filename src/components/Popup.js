export default class Popup {
  constructor(popupSelector) {
    this._page = document.querySelector(".page");
    this._popupEl = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupEl.querySelector(
      ".modal__close-button"
    );
    this._keydownHandler = (e) => {
      this._handleEscClose(e);
    };
    this._clickHandler = (e) => {
      this.close();
      e.stopPropagation();
    };
  }

  open() {
    this._popupEl.classList.add("modal_opened");
    this._page.addEventListener("keydown", this._keydownHandler);
    this._page.addEventListener("click", this._clickHandler);
  }

  close() {
    this._popupEl.classList.remove("modal_opened");
    this._page.removeEventListener("keydown", this._keydownHandler);
    this._page.removeEventListener("click", this._clickHandler);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener("click", () => {
      this.close();
    });
  }
}
