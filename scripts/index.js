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
const page = document.querySelector(".page");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditModal = document.querySelector("#profileEditModal");
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileModalCloseBtn = profileEditModal.querySelector(
  "#profileModal_close-button"
);
const profileEditModalContainer =
  profileEditModal.querySelector(".modal__container");
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
const cardAddModalContainer = cardAddModal.querySelector(".modal__container");

const reviewPictureModal = document.querySelector("#reviewPictureModal");
const reviewPictureCloseBtn =
  reviewPictureModal.querySelector("#picture_close-btn");
const reviewPictureModalContainer = reviewPictureModal.querySelector(
  "modal__picture_container"
);
const modalContainers = document.querySelectorAll(
  ".modal__picture_container, .modal__container"
);

const modals = document.querySelectorAll(".modal");

const reviewPictureModalImage =
  reviewPictureModal.querySelector(".modal__picture");
const reviewPictureCaption =
  reviewPictureModal.querySelector(".modal_sub-heading");

let currentlyOpenModal = null;

function escapeEventHandler(e) {
  if (e.key === "Escape") {
    closeModal(currentlyOpenModal);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  currentlyOpenModal = modal;
  page.addEventListener("keydown", escapeEventHandler);
}

function closeModal(modal) {
  if (modal !== null) {
    modal.classList.remove("modal_opened");
    currentlyOpenModal = null;
    page.removeEventListener("keydown", escapeEventHandler);
  }
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

  cardImageEl.addEventListener("click", (evt) => {
    openModal(reviewPictureModal);
    reviewPictureCaption.textContent = evt.target.alt;
    reviewPictureModalImage.src = evt.target.src;
    reviewPictureModalImage.alt = evt.target.alt;
    evt.stopPropagation();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.setAttribute("src", cardData.link);
  cardImageEl.setAttribute("alt", cardData.name);
  return cardElement;
}

//calls function that closes edit-modal for profile
profileModalCloseBtn.addEventListener("click", () => {
  closeModal(profileEditModal);
});

//opens edit-modal for profile
profileEditBtn.addEventListener("click", (e) => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
  e.stopPropagation();
});

//
reviewPictureCloseBtn.addEventListener("click", () => {
  closeModal(reviewPictureModal);
});
//

//opens add-new-card
addNewCardBtn.addEventListener("click", (e) => {
  openModal(cardAddModal);
  e.stopPropagation();
});

//closes add-new-card
cardModalCloseBtn.addEventListener("click", () => {
  closeModal(cardAddModal);
});

//submits form with choosen changes to profile text
profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
});

//submits card with choosen changes to profile text
cardAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const cardData = { link: cardUrlInput.value, name: cardTitleInput.value };
  cardListEl.prepend(getCardElement(cardData));
  closeModal(cardAddModal);
  cardAddForm.reset();
});

initialCards.forEach((cardData) => {
  cardListEl.prepend(getCardElement(cardData));
});

page.addEventListener("click", (e) => {
  if (currentlyOpenModal !== null) {
    closeModal(currentlyOpenModal);
  }
});

modalContainers.forEach((container) => {
  container.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});
