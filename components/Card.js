export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }
  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._trashButton = this._cardElement.querySelector(".card__trash-button");
    this._likeButton.addEventListener("click", this._likeButtonHandler);

    this._trashButton.addEventListener("click", this._trashButtonHandler);

    this._cardImageEl.addEventListener("click", this._handleImageClick);
  }

  _trashButtonHandler(evt) {
    evt.target.closest(".card").remove();
  }

  _likeButtonHandler(evt) {
    evt.target.classList.toggle("card__like-button_active");
  }

  getCardElement() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    const cardTitleEl = this._cardElement.querySelector(".card__title");

    cardTitleEl.textContent = this._name;
    this._cardImageEl.setAttribute("src", this._link);
    this._cardImageEl.setAttribute("alt", this._name);
    this._setEventListeners();
    return this._cardElement;
  }
}
