import Popup from "../components/Popup.js";
export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._reviewPictureModalImage =
      this._popupEl.querySelector(".modal__picture");
    this._reviewPictureCaption =
      this._popupEl.querySelector(".modal_sub-heading");
  }

  open(data) {
    this._reviewPictureCaption.textContent = data.alt;
    this._reviewPictureModalImage.src = data.src;
    this._reviewPictureModalImage.alt = data.alt;
    super.open();
  }
}
