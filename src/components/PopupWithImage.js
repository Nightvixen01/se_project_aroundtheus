import Popup from "../components/Popup.js";
export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    const reviewPictureModal = document.querySelector(selector);
    this._reviewPictureModalImage =
      reviewPictureModal.querySelector(".modal__picture");
    this._reviewPictureCaption =
      reviewPictureModal.querySelector(".modal_sub-heading");
  }

  open(data) {
    this._reviewPictureCaption.textContent = data.alt;
    this._reviewPictureModalImage.src = data.src;
    this._reviewPictureModalImage.alt = data.alt;
    super.open();
  }
}
