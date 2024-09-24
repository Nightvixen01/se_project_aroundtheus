import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import "./index.css";
import { initialCards, config } from "../utils/constants.js";

//static page items
const profileEditBtn = document.querySelector("#profile-edit-button");
const addNewCardBtn = document.querySelector(".profile__add-button");
const profileNameInput = profileEditModal.querySelector("#profile-name-input");
const profileDescriptionInput = profileEditModal.querySelector(
  "#profile-description-input"
);

//section object to host cards
const section = new Section(
  { items: initialCards, renderer: createCard },
  ".cards__list"
);

//CardImagePopup
const cardImagePopup = new PopupWithImage("#reviewPictureModal");
cardImagePopup.setEventListeners();

//AddCardPopup
const addCardPopup = new PopupWithForm("#cardAddModal", (data) => {
  const cardData = { link: data.url, name: data.title };
  createCard(cardData);
  formValidatorMap["add-card-form"].disableSubmitButton();
});
addCardPopup.setEventListeners();

//ProfilePopup
const profilePopup = new PopupWithForm("#profileEditModal", (data) => {
  userInfo.setUserInfo(data);
  formValidatorMap["edit-profile-form"].disableSubmitButton();
});
profilePopup.setEventListeners();

//UserInfo
const userInfo = new UserInfo({
  name: ".profile__title",
  job: ".profile__description",
});

function cardImageClickHandler(evt) {
  cardImagePopup.open({ alt: evt.target.alt, src: evt.target.src });
  evt.stopPropagation();
}

//opens edit-modal for profile
profileEditBtn.addEventListener("click", (e) => {
  const userData = userInfo.getUserInfo();
  profileNameInput.value = userData.title;
  profileDescriptionInput.value = userData.description;
  profilePopup.open();
  e.stopPropagation();
});

//opens add-new-card
addNewCardBtn.addEventListener("click", (e) => {
  addCardPopup.open();
  e.stopPropagation();
});

function generateCard(cardData) {
  const cardElement = new Card(
    cardData,
    "#card-template",
    cardImageClickHandler
  );
  return cardElement.getCardElement();
}

function createCard(cardData) {
  const newCard = generateCard(cardData);
  section.addItem(newCard);
}

const formValidatorMap = {};
const formEls = Array.from(document.querySelectorAll(config.formSelector));
formEls.forEach((formEl) => {
  const formValidation = new FormValidator(config, formEl);
  formValidation.enableValidation();
  formValidatorMap[formEl.id] = formValidation;
});

section.renderItems();
