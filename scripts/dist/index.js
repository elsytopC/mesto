"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cards_js_1 = require("./cards.js");
// DOM Elements - using more specific types and removing unused variables
const popup = document.querySelector('.popup');
const popupWindows = document.querySelectorAll('.popup');
const mainProfile = document.querySelector('.profile');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupClose = popup.querySelector('.popup__close');
const profileAuthor = document.querySelector('.profile__title');
const profileDetail = document.querySelector('.profile__subtitle');
const popupHeading = document.querySelector('.popup__item_text_heading');
const popupSubHeading = document.querySelector('.popup__item_text_subheading');
const mainForm = document.querySelector('.popup__main');
const cardsContainer = document.querySelector('.elements');
const sampleTemplate = document.querySelector('#cards-cover')?.content;
const popupAddForm = document.querySelector('#popup-add-content');
const popupAllInputs = document.querySelectorAll('.popup__item');
const popupInputPublish = document.querySelector('#popup-add-disabled');
const popupAllErrors = document.querySelectorAll('.popup__display-error');
const submitButton = document.querySelector('.popup__button-submit');
const allClose = document.querySelectorAll('.popup__close');
const allSubmitButtons = document.querySelectorAll('.popup__button-submit');
// Utility functions
const openPopupToggle = (window) => {
    window.classList.toggle('popup_is-opened');
};
const closePopup = (window) => {
    window.classList.remove('popup_is-opened');
};
const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    if (profileAuthor && profileDetail && popupHeading && popupSubHeading) {
        profileAuthor.textContent = popupHeading.value;
        profileDetail.textContent = popupSubHeading.value;
        openPopupToggle(popup);
    }
};
const fillProfileDescription = () => {
    if (popupHeading && popupSubHeading && profileAuthor && profileDetail) {
        popupHeading.value = profileAuthor.textContent || '';
        popupSubHeading.value = profileDetail.textContent || '';
    }
};
// Event listeners for profile popup
popupClose?.addEventListener('click', () => openPopupToggle(popup));
mainForm?.addEventListener('submit', handleProfileFormSubmit);
popupOpenButton?.addEventListener('click', () => {
    fillProfileDescription();
    openPopupToggle(popup);
});
// Global event listeners
document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
});
// Close popups on overlay click
popupWindows.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closePopup(popup);
        }
    });
});
// Card functionality
const getCardElement = (item) => {
    if (!sampleTemplate) {
        throw new Error('Template not found');
    }
    const detailCard = sampleTemplate.cloneNode(true);
    const cardPhoto = detailCard.querySelector('.element__image');
    const likeButton = detailCard.querySelector('.element__like-button');
    const deleteButton = detailCard.querySelector('.element__delete-button');
    const textElement = detailCard.querySelector('.element__text');
    if (cardPhoto) {
        cardPhoto.src = item.link;
        cardPhoto.alt = item.name;
        cardPhoto.addEventListener('click', () => handlePreviewPicture(item));
    }
    if (likeButton) {
        likeButton.addEventListener('click', handleLikeIcon);
    }
    if (deleteButton) {
        deleteButton.addEventListener('click', handleDeleteCard);
    }
    if (textElement) {
        textElement.textContent = item.name;
    }
    return detailCard;
};
const handlePreviewPicture = (item) => {
    const popupImageZoom = document.querySelector('.popup-image-zoomed');
    const imageElement = popupImageZoom?.querySelector('.popup-image-zoomed__image-card');
    const titleElement = popupImageZoom?.querySelector('.popup-image-zoomed__image-title');
    if (imageElement && titleElement) {
        imageElement.src = item.link;
        imageElement.alt = item.name;
        titleElement.textContent = item.name;
    }
    if (popupImageZoom) {
        openPopupToggle(popupImageZoom);
    }
};
const handleLikeIcon = (evt) => {
    evt.target.classList.toggle('element__like-button_pushed');
};
const handleDeleteCard = (evt) => {
    const cardElement = evt.target.closest('.element');
    if (cardElement) {
        cardElement.classList.add('element_animated-delete');
        cardElement.addEventListener('animationend', () => {
            cardElement.remove();
        }, { once: true });
    }
};
const loadCards = () => {
    cards_js_1.initialCards.forEach((item) => {
        const cardElement = getCardElement(item);
        cardsContainer?.append(cardElement);
    });
};
// Load initial cards
loadCards();
// Add card functionality
const popupPlusButton = document.querySelector('.profile__add-button');
const popupMainPlusButton = document.querySelector('.popup-add-button');
const popupPlusClose = document.querySelector('.popup-add-button__close-button');
const popupPlusTitle = document.querySelector('.popup-add-button__item_text_heading');
const popupPlusLink = document.querySelector('.popup-add-button__item_text_subheading');
const popupPlusCreate = document.querySelector('.popup-add-button__add-button-create');
const popupPlusContents = document.querySelector('.popup-add-button__add-main');
const clearFormAndErrors = () => {
    if (popupPlusTitle)
        popupPlusTitle.value = '';
    if (popupPlusLink)
        popupPlusLink.value = '';
    popupAllErrors.forEach(error => {
        error.textContent = '';
        error.classList.remove('popup__display-error_active');
    });
    if (popupPlusCreate) {
        popupPlusCreate.classList.add('popup__button-submit_disabled');
        popupPlusCreate.setAttribute('disabled', 'true');
    }
};
popupPlusButton?.addEventListener('click', () => {
    clearFormAndErrors();
    openPopupToggle(popupMainPlusButton);
});
popupPlusClose?.addEventListener('click', () => {
    openPopupToggle(popupMainPlusButton);
});
popupPlusContents?.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (popupPlusTitle && popupPlusLink) {
        const coverCard = {
            name: popupPlusTitle.value,
            link: popupPlusLink.value
        };
        const detailCard = getCardElement(coverCard);
        cardsContainer?.prepend(detailCard);
    }
    clearFormAndErrors();
    openPopupToggle(popupMainPlusButton);
});
// Image zoom popup
const popupImageZoom = document.querySelector('.popup-image-zoomed');
const popupImageClose = document.querySelector('.popup-image-zoomed__close-image');
popupImageClose?.addEventListener('click', () => {
    openPopupToggle(popupImageZoom);
});
