import { Card, initialCards } from './cards.js';

// DOM Elements - using more specific types and removing unused variables
const popup = document.querySelector('.popup') as HTMLElement;
const popupWindows = document.querySelectorAll('.popup');
const mainProfile = document.querySelector('.profile') as HTMLElement;
const popupOpenButton = document.querySelector('.profile__edit-button') as HTMLElement;
const popupClose = popup.querySelector('.popup__close') as HTMLElement;
const profileAuthor = document.querySelector('.profile__title') as HTMLElement;
const profileDetail = document.querySelector('.profile__subtitle') as HTMLElement;
const popupHeading = document.querySelector('.popup__item_text_heading') as HTMLInputElement;
const popupSubHeading = document.querySelector('.popup__item_text_subheading') as HTMLInputElement;
const mainForm = document.querySelector('.popup__main') as HTMLFormElement;
const cardsContainer = document.querySelector('.elements') as HTMLElement;
const sampleTemplate = (document.querySelector('#cards-cover') as HTMLTemplateElement)?.content;
const popupAddForm = document.querySelector('#popup-add-content') as HTMLFormElement;
const popupAllInputs = document.querySelectorAll('.popup__item') as NodeListOf<HTMLInputElement>;
const popupInputPublish = document.querySelector('#popup-add-disabled') as HTMLButtonElement;
const popupAllErrors = document.querySelectorAll('.popup__display-error') as NodeListOf<HTMLElement>;
const submitButton = document.querySelector('.popup__button-submit') as HTMLButtonElement;
const allClose = document.querySelectorAll('.popup__close') as NodeListOf<HTMLElement>;
const allSubmitButtons = document.querySelectorAll('.popup__button-submit') as NodeListOf<HTMLButtonElement>;

// Utility functions
const openPopupToggle = (window: HTMLElement): void => {
    window.classList.toggle('popup_is-opened');
};

const closePopup = (window: HTMLElement): void => {
    window.classList.remove('popup_is-opened');
};

const handleProfileFormSubmit = (evt: Event): void => {
    evt.preventDefault();
    if (profileAuthor && profileDetail && popupHeading && popupSubHeading) {
        profileAuthor.textContent = popupHeading.value;
        profileDetail.textContent = popupSubHeading.value;
        openPopupToggle(popup);
    }
};

const fillProfileDescription = (): void => {
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
document.addEventListener('keydown', (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened') as HTMLElement;
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
});

// Close popups on overlay click
popupWindows.forEach((popup) => {
    popup.addEventListener('click', (evt: Event) => {
        if ((evt.target as HTMLElement).classList.contains('popup')) {
            closePopup(popup as HTMLElement);
        }
    });
});

// Card functionality
const getCardElement = (item: Card): HTMLElement => {
    if (!sampleTemplate) {
        throw new Error('Template not found');
    }
    
    const detailCard = sampleTemplate.cloneNode(true) as HTMLElement;
    const cardPhoto = detailCard.querySelector('.element__image') as HTMLImageElement;
    const likeButton = detailCard.querySelector('.element__like-button') as HTMLElement;
    const deleteButton = detailCard.querySelector('.element__delete-button') as HTMLElement;
    const textElement = detailCard.querySelector('.element__text') as HTMLElement;

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

const handlePreviewPicture = (item: Card): void => {
    const popupImageZoom = document.querySelector('.popup-image-zoomed') as HTMLElement;
    const imageElement = popupImageZoom?.querySelector('.popup-image-zoomed__image-card') as HTMLImageElement;
    const titleElement = popupImageZoom?.querySelector('.popup-image-zoomed__image-title') as HTMLElement;

    if (imageElement && titleElement) {
        imageElement.src = item.link;
        imageElement.alt = item.name;
        titleElement.textContent = item.name;
    }

    if (popupImageZoom) {
        openPopupToggle(popupImageZoom);
    }
};

const handleLikeIcon = (evt: Event): void => {
    (evt.target as HTMLElement).classList.toggle('element__like-button_pushed');
};

const handleDeleteCard = (evt: Event): void => {
    const cardElement = (evt.target as HTMLElement).closest('.element') as HTMLElement;
    
    if (cardElement) {
        cardElement.classList.add('element_animated-delete');
        cardElement.addEventListener('animationend', () => {
            cardElement.remove();
        }, { once: true });
    }
};

const loadCards = (): void => {
    initialCards.forEach((item: Card) => {
        const cardElement = getCardElement(item);
        cardsContainer?.append(cardElement);
    });
};

// Load initial cards
loadCards();

// Add card functionality
const popupPlusButton = document.querySelector('.profile__add-button') as HTMLElement;
const popupMainPlusButton = document.querySelector('.popup-add-button') as HTMLElement;
const popupPlusClose = document.querySelector('.popup-add-button__close-button') as HTMLElement;
const popupPlusTitle = document.querySelector('.popup-add-button__item_text_heading') as HTMLInputElement;
const popupPlusLink = document.querySelector('.popup-add-button__item_text_subheading') as HTMLInputElement;
const popupPlusCreate = document.querySelector('.popup-add-button__add-button-create') as HTMLButtonElement;
const popupPlusContents = document.querySelector('.popup-add-button__add-main') as HTMLFormElement;

const clearFormAndErrors = (): void => {
    if (popupPlusTitle) popupPlusTitle.value = '';
    if (popupPlusLink) popupPlusLink.value = '';
    
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

popupPlusContents?.addEventListener('submit', (evt: Event) => {
    evt.preventDefault();

    if (popupPlusTitle && popupPlusLink) {
        const coverCard: Card = {
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
const popupImageZoom = document.querySelector('.popup-image-zoomed') as HTMLElement;
const popupImageClose = document.querySelector('.popup-image-zoomed__close-image') as HTMLElement;

popupImageClose?.addEventListener('click', () => {
    openPopupToggle(popupImageZoom);
});