const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileEditModal = document.querySelector("#profileEditModal");
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileModalCloseBtn = profileEditModal.querySelector(
  "#profileModal_close-button"
);

const profileNameInput = profileEditModal.querySelector("#profile-name-input");
const profileDescriptionInput = profileEditModal.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector("#edit-profile-form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardAddModal = document.querySelector("#cardAddModal");
const cardAddForm = cardAddModal.querySelector("#add-card-form");
const addNewCardBtn = document.querySelector(".profile__add-button");
const cardModalCloseBtn = cardAddModal.querySelector("#addModal_close-button");
const cardTitleInput = cardAddModal.querySelector("#card-title-input");
const cardUrlInput = cardAddModal.querySelector("#card-url-input");

const reviewPictureModal = document.querySelector("#reviewPictureModal");
const reviewPictureCloseBtn =
  reviewPictureModal.querySelector("#picture_close-btn");

//function for closing edit-modal for profile
function closeProfileModal() {
  profileEditModal.classList.remove("modal_opened");
}

//function for opening edit-modal for profile
function openProfileModal() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
}

//function for closing add-card-modal for profile
function closeCardAddModal() {
  cardAddModal.classList.remove("modal_opened");
}

//function for opening add-card-modal for profile
function openCardAddModal() {
  cardAddModal.classList.add("modal_opened");
}

//function for closing review-picture-modal for profile
function closeReviewPictureModal() {
  reviewPictureModal.classList.remove("modal_opened");
}

//function for opening review-picture-modal for profile
function openReviewPictureModal(evt) {
  reviewPictureModal.classList.add("modal_opened");
  let reviewPictureModalImage =
    reviewPictureModal.querySelector(".modal__picture");
  let reviewPictureCaption =
    reviewPictureModal.querySelector(".modal_sub-heading");
  reviewPictureCaption.textContent = evt.target.alt;
  reviewPictureModalImage.src = evt.target.src;
  reviewPictureModalImage.alt = evt.target.alt;
}

//copies cards
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const trashButton = cardElement.querySelector(".card__trash-button");

  trashButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", openReviewPictureModal);
  //hint: use visibility: hidden

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.setAttribute("src", cardData.link);
  cardImageEl.setAttribute("alt", cardData.name);
  return cardElement;
}

//calls function that closes edit-modal for profile
profileModalCloseBtn.addEventListener("click", closeProfileModal);

//opens edit-modal for profile
profileEditBtn.addEventListener("click", openProfileModal);

//
reviewPictureCloseBtn.addEventListener("click", closeReviewPictureModal);
//

//opens add-new-card
addNewCardBtn.addEventListener("click", openCardAddModal);

//closes add-new-card
cardModalCloseBtn.addEventListener("click", closeCardAddModal);

//submits form with choosen changes to profile text
profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeProfileModal();
});

//submits card with choosen changes to profile text
cardAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const cardData = { link: cardUrlInput.value, name: cardTitleInput.value };
  cardListEl.prepend(getCardElement(cardData));
  closeCardAddModal();
});

initialCards.forEach((cardData) => {
  cardListEl.prepend(getCardElement(cardData));
});
