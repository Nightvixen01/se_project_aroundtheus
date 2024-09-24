import Popup from "../components/Popup.js";
export default class PopupWithForm extends Popup {
  constructor(selector, callBack) {
    super(selector);
    this._callBack = callBack;
    this._form = this._popupEl.querySelector(".modal__form");
  }

  _getInputValues() {
    const inputs = this._form.getElementsByTagName("input");
    const data = {};
    Array.from(inputs).forEach((e) => {
      data[e.name] = e.value;
    });
    return data;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._callBack(this._getInputValues());
      this.close();
      this._form.reset();
    });
    super.setEventListeners();
  }
}
