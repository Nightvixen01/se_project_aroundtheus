export default class FormValidator {
  constructor(settingsObject, formElement) {
    this._settingsObject = settingsObject;
    this._formElement = formElement;
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }

  disableSubmitButton() {
    const submitButton = this._formElement.querySelector(
      this._settingsObject.submitButtonSelector
    );
    submitButton.classList.add(this._settingsObject.inactiveButtonClass);
    submitButton.disabled = true;
  }

  resetForm() {
    //todo
  }

  _setEventListeners() {
    const { inputSelector } = this._settingsObject;
    const inputEls = [...this._formElement.querySelectorAll(inputSelector)];
    const submitButton = this._formElement.querySelector(
      this._settingsObject.submitButtonSelector
    );
    this._toggleButtonState(inputEls, submitButton, this._settingsObject);
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(
          this._formElement,
          inputEl,
          this._settingsObject
        );
        this._toggleButtonState(inputEls, submitButton, this._settingsObject);
      });
    });
  }

  _checkInputValidity(formEl, inputEl, config) {
    if (!inputEl.validity.valid) {
      this._showInputError(formEl, inputEl, config);
    } else {
      this._hideInputError(formEl, inputEl, config);
    }
  }

  _toggleButtonState(inputEls, submitButton, config) {
    let foundInvalid = false;
    inputEls.forEach((inputEl) => {
      if (!inputEl.validity.valid) {
        foundInvalid = true;
      }
    });

    if (foundInvalid) {
      this.disableSubmitButton();
    } else {
      submitButton.classList.remove(config.inactiveButtonClass);
      submitButton.disabled = false;
    }
  }

  _hideInputError(formEl, inputEl, config) {
    const errorMessageEl = formEl.querySelector("#" + inputEl.id + "-error");
    inputEl.classList.remove(config.inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(config.errorClass);
  }

  _showInputError(formEl, inputEl, config) {
    const errorMessageEl = formEl.querySelector("#" + inputEl.id + "-error");
    inputEl.classList.add(config.inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(config.errorClass);
  }
}
