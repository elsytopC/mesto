// Import card types and data
import { initialCards } from './cards.js';
// Cache DOM elements once for better performance
const elements = {
    popup: document.querySelector('.popup'),
    popupWindow: Array.from(document.querySelectorAll('.popup')),
    mainProfile: document.querySelector('.profile'),
    popupOpenButton: document.querySelector('.profile__edit-button'),
    popupClose: document.querySelector('.popup__close'),
    profileAuthor: document.querySelector('.profile__title'),
    profileDetail: document.querySelector('.profile__subtitle'),
    popupHeading: document.querySelector('.popup__item_text_heading'),
    popupSubHeading: document.querySelector('.popup__item_text_subheading'),
    mainForm: document.querySelector('.popup__main'),
    popupPhoto: document.querySelector('.popup-image-zoomed'),
    cardsContainer: document.querySelector('.elements'),
    sampleTemplate: document.querySelector('#cards-cover')?.content,
    popupAddForm: document.querySelector('#popup-add-content'),
    popupAllInputs: Array.from(document.querySelectorAll('.popup__item')),
    popupInputPublish: document.querySelector('#popup-add-disabled'),
    popupAllErrors: Array.from(document.querySelectorAll('.popup__display-error')),
    submitButton: document.querySelector('.popup__button-submit'),
    allClose: Array.from(document.querySelectorAll('.popup__close')),
    allSubmitButtons: Array.from(document.querySelectorAll('.popup__button-submit'))
};
// Utility functions
const openPopupToggle = (window) => {
    window.classList.toggle('popup_is-opened');
};
const closePopup = (window) => {
    window.classList.remove('popup_is-opened');
};
const clearFormErrors = () => {
    elements.popupAllErrors.forEach(error => {
        error.textContent = '';
        error.classList.remove('popup__display-error_active');
    });
};
const resetForm = (titleInput, linkInput, submitButton) => {
    titleInput.value = '';
    linkInput.value = '';
    clearFormErrors();
    submitButton.classList.add('popup__button-submit_disabled');
    submitButton.setAttribute('disabled', 'true');
};
// Profile form handlers
const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    elements.profileAuthor.textContent = elements.popupHeading.value;
    elements.profileDetail.textContent = elements.popupSubHeading.value;
    openPopupToggle(elements.popup);
};
const fillProfileDescription = () => {
    elements.popupHeading.value = elements.profileAuthor.textContent || '';
    elements.popupSubHeading.value = elements.profileDetail.textContent || '';
};
// Card management with event delegation for better performance
const createCardElement = (item) => {
    const cardElement = elements.sampleTemplate.cloneNode(true);
    const cardPhoto = cardElement.querySelector('.element__image');
    const textElement = cardElement.querySelector('.element__text');
    if (cardPhoto) {
        cardPhoto.src = item.link;
        cardPhoto.alt = item.name;
    }
    if (textElement) {
        textElement.textContent = item.name;
    }
    return cardElement;
};
const handlePreviewPicture = (item) => {
    const popupImageZoom = document.querySelector('.popup-image-zoomed');
    const imageElement = popupImageZoom.querySelector('.popup-image-zoomed__image-card');
    const titleElement = popupImageZoom.querySelector('.popup-image-zoomed__image-title');
    if (imageElement && titleElement) {
        imageElement.src = item.link;
        imageElement.alt = item.name;
        titleElement.textContent = item.name;
    }
    openPopupToggle(popupImageZoom);
};
// Event delegation for card interactions
const handleCardClick = (evt) => {
    const target = evt.target;
    if (target.classList.contains('element__like-button')) {
        target.classList.toggle('element__like-button_pushed');
    }
    else if (target.classList.contains('element__delete-button')) {
        const cardElement = target.closest('.element');
        if (cardElement) {
            cardElement.classList.add('element_animated-delete');
            cardElement.addEventListener('animationend', () => {
                cardElement.remove();
            }, { once: true });
        }
    }
    else if (target.classList.contains('element__image')) {
        const cardElement = target.closest('.element');
        if (cardElement) {
            const cardName = cardElement.querySelector('.element__text')?.textContent || '';
            const cardLink = cardElement.querySelector('.element__image')?.src || '';
            handlePreviewPicture({ name: cardName, link: cardLink });
        }
    }
};
// Load initial cards efficiently
const loadCards = () => {
    const fragment = document.createDocumentFragment();
    initialCards.forEach((item) => {
        const cardElement = createCardElement(item);
        fragment.appendChild(cardElement);
    });
    elements.cardsContainer.appendChild(fragment);
};
// Add new card functionality
const addNewCard = (evt) => {
    evt.preventDefault();
    const titleInput = document.querySelector('.popup-add-button__item_text_heading');
    const linkInput = document.querySelector('.popup-add-button__item_text_subheading');
    const submitButton = document.querySelector('.popup-add-button__add-button-create');
    const newCard = {
        name: titleInput.value,
        link: linkInput.value
    };
    const cardElement = createCardElement(newCard);
    elements.cardsContainer.prepend(cardElement);
    resetForm(titleInput, linkInput, submitButton);
    closePopup(document.querySelector('.popup-add-button'));
};
// Event listeners setup
const setupEventListeners = () => {
    // Profile popup events
    elements.popupClose.addEventListener('click', () => closePopup(elements.popup));
    elements.mainForm.addEventListener('submit', handleProfileFormSubmit);
    elements.popupOpenButton.addEventListener('click', () => {
        fillProfileDescription();
        openPopupToggle(elements.popup);
    });
    // Global escape key handler
    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
            const openedPopup = document.querySelector('.popup_is-opened');
            if (openedPopup) {
                closePopup(openedPopup);
            }
        }
    });
    // Overlay click handlers
    elements.popupWindow.forEach(popup => {
        popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup')) {
                closePopup(popup);
            }
        });
    });
    // Card container event delegation
    elements.cardsContainer.addEventListener('click', handleCardClick);
    // Add card popup events
    const popupPlusButton = document.querySelector('.profile__add-button');
    const popupMainPlusButton = document.querySelector('.popup-add-button');
    const popupPlusClose = document.querySelector('.popup-add-button__close-button');
    const popupPlusContents = document.querySelector('.popup-add-button__add-main');
    popupPlusButton.addEventListener('click', () => {
        const titleInput = document.querySelector('.popup-add-button__item_text_heading');
        const linkInput = document.querySelector('.popup-add-button__item_text_subheading');
        const submitButton = document.querySelector('.popup-add-button__add-button-create');
        resetForm(titleInput, linkInput, submitButton);
        openPopupToggle(popupMainPlusButton);
    });
    popupPlusClose.addEventListener('click', () => closePopup(popupMainPlusButton));
    popupPlusContents.addEventListener('submit', addNewCard);
    // Image zoom popup close
    const popupImageClose = document.querySelector('.popup-image-zoomed__close-image');
    popupImageClose.addEventListener('click', () => {
        closePopup(document.querySelector('.popup-image-zoomed'));
    });
};
// Initialize the application
const init = () => {
    setupEventListeners();
    loadCards();
};
// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
}
else {
    init();
}
