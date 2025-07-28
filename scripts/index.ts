// Import card types and data
import { type Card, initialCards } from './cards.js';

interface PopupElements {
    popup: HTMLElement;
    popupWindow: HTMLElement[];
    mainProfile: HTMLElement;
    popupOpenButton: HTMLElement;
    popupClose: HTMLElement;
    profileAuthor: HTMLElement;
    profileDetail: HTMLElement;
    popupHeading: HTMLInputElement;
    popupSubHeading: HTMLInputElement;
    mainForm: HTMLFormElement;
    popupPhoto: HTMLElement;
    cardsContainer: HTMLElement;
    sampleTemplate: DocumentFragment;
    popupAddForm: HTMLFormElement;
    popupAllInputs: HTMLInputElement[];
    popupInputPublish: HTMLButtonElement;
    popupAllErrors: HTMLElement[];
    submitButton: HTMLButtonElement;
    allClose: HTMLElement[];
    allSubmitButtons: HTMLButtonElement[];
}

// Cache DOM elements once for better performance
const elements: PopupElements = {
    popup: document.querySelector('.popup') as HTMLElement,
    popupWindow: Array.from(document.querySelectorAll('.popup')) as HTMLElement[],
    mainProfile: document.querySelector('.profile') as HTMLElement,
    popupOpenButton: document.querySelector('.profile__edit-button') as HTMLElement,
    popupClose: document.querySelector('.popup__close') as HTMLElement,
    profileAuthor: document.querySelector('.profile__title') as HTMLElement,
    profileDetail: document.querySelector('.profile__subtitle') as HTMLElement,
    popupHeading: document.querySelector('.popup__item_text_heading') as HTMLInputElement,
    popupSubHeading: document.querySelector('.popup__item_text_subheading') as HTMLInputElement,
    mainForm: document.querySelector('.popup__main') as HTMLFormElement,
    popupPhoto: document.querySelector('.popup-image-zoomed') as HTMLElement,
    cardsContainer: document.querySelector('.elements') as HTMLElement,
    sampleTemplate: (document.querySelector('#cards-cover') as HTMLTemplateElement)?.content as DocumentFragment,
    popupAddForm: document.querySelector('#popup-add-content') as HTMLFormElement,
    popupAllInputs: Array.from(document.querySelectorAll('.popup__item')) as HTMLInputElement[],
    popupInputPublish: document.querySelector('#popup-add-disabled') as HTMLButtonElement,
    popupAllErrors: Array.from(document.querySelectorAll('.popup__display-error')) as HTMLElement[],
    submitButton: document.querySelector('.popup__button-submit') as HTMLButtonElement,
    allClose: Array.from(document.querySelectorAll('.popup__close')) as HTMLElement[],
    allSubmitButtons: Array.from(document.querySelectorAll('.popup__button-submit')) as HTMLButtonElement[]
};

// Utility functions
const openPopupToggle = (window: HTMLElement): void => {
    window.classList.toggle('popup_is-opened');
};

const closePopup = (window: HTMLElement): void => {
    window.classList.remove('popup_is-opened');
};

const clearFormErrors = (): void => {
    elements.popupAllErrors.forEach(error => {
        error.textContent = '';
        error.classList.remove('popup__display-error_active');
    });
};

const resetForm = (titleInput: HTMLInputElement, linkInput: HTMLInputElement, submitButton: HTMLButtonElement): void => {
    titleInput.value = '';
    linkInput.value = '';
    clearFormErrors();
    submitButton.classList.add('popup__button-submit_disabled');
    submitButton.setAttribute('disabled', 'true');
};

// Profile form handlers
const handleProfileFormSubmit = (evt: Event): void => {
    evt.preventDefault();
    elements.profileAuthor.textContent = elements.popupHeading.value;
    elements.profileDetail.textContent = elements.popupSubHeading.value;
    openPopupToggle(elements.popup);
};

const fillProfileDescription = (): void => {
    elements.popupHeading.value = elements.profileAuthor.textContent || '';
    elements.popupSubHeading.value = elements.profileDetail.textContent || '';
};

// Card management with event delegation for better performance
const createCardElement = (item: Card): HTMLElement => {
    const cardElement = elements.sampleTemplate.cloneNode(true) as HTMLElement;
    const cardPhoto = cardElement.querySelector('.element__image') as HTMLImageElement;
    const textElement = cardElement.querySelector('.element__text') as HTMLElement;

    if (cardPhoto) {
        cardPhoto.src = item.link;
        cardPhoto.alt = item.name;
    }

    if (textElement) {
        textElement.textContent = item.name;
    }

    return cardElement;
};

const handlePreviewPicture = (item: Card): void => {
    const popupImageZoom = document.querySelector('.popup-image-zoomed') as HTMLElement;
    const imageElement = popupImageZoom.querySelector('.popup-image-zoomed__image-card') as HTMLImageElement;
    const titleElement = popupImageZoom.querySelector('.popup-image-zoomed__image-title') as HTMLElement;

    if (imageElement && titleElement) {
        imageElement.src = item.link;
        imageElement.alt = item.name;
        titleElement.textContent = item.name;
    }

    openPopupToggle(popupImageZoom);
};

// Event delegation for card interactions
const handleCardClick = (evt: Event): void => {
    const target = evt.target as HTMLElement;
    
    if (target.classList.contains('element__like-button')) {
        target.classList.toggle('element__like-button_pushed');
    } else if (target.classList.contains('element__delete-button')) {
        const cardElement = target.closest('.element') as HTMLElement;
        if (cardElement) {
            cardElement.classList.add('element_animated-delete');
            cardElement.addEventListener('animationend', () => {
                cardElement.remove();
            }, { once: true });
        }
    } else if (target.classList.contains('element__image')) {
        const cardElement = target.closest('.element') as HTMLElement;
        if (cardElement) {
            const cardName = cardElement.querySelector('.element__text')?.textContent || '';
            const cardLink = (cardElement.querySelector('.element__image') as HTMLImageElement)?.src || '';
            handlePreviewPicture({ name: cardName, link: cardLink });
        }
    }
};

// Load initial cards efficiently
const loadCards = (): void => {
    const fragment = document.createDocumentFragment();
    
    initialCards.forEach((item: Card) => {
        const cardElement = createCardElement(item);
        fragment.appendChild(cardElement);
    });
    
    elements.cardsContainer.appendChild(fragment);
};

// Add new card functionality
const addNewCard = (evt: Event): void => {
    evt.preventDefault();

    const titleInput = document.querySelector('.popup-add-button__item_text_heading') as HTMLInputElement;
    const linkInput = document.querySelector('.popup-add-button__item_text_subheading') as HTMLInputElement;
    const submitButton = document.querySelector('.popup-add-button__add-button-create') as HTMLButtonElement;

    const newCard: Card = {
        name: titleInput.value,
        link: linkInput.value
    };

    const cardElement = createCardElement(newCard);
    elements.cardsContainer.prepend(cardElement);

    resetForm(titleInput, linkInput, submitButton);
    closePopup(document.querySelector('.popup-add-button') as HTMLElement);
};

// Event listeners setup
const setupEventListeners = (): void => {
    // Profile popup events
    elements.popupClose.addEventListener('click', () => closePopup(elements.popup));
    elements.mainForm.addEventListener('submit', handleProfileFormSubmit);
    elements.popupOpenButton.addEventListener('click', () => {
        fillProfileDescription();
        openPopupToggle(elements.popup);
    });

    // Global escape key handler
    document.addEventListener('keydown', (evt: KeyboardEvent) => {
        if (evt.key === 'Escape') {
            const openedPopup = document.querySelector('.popup_is-opened') as HTMLElement;
            if (openedPopup) {
                closePopup(openedPopup);
            }
        }
    });

    // Overlay click handlers
    elements.popupWindow.forEach(popup => {
        popup.addEventListener('click', (evt: Event) => {
            if ((evt.target as HTMLElement).classList.contains('popup')) {
                closePopup(popup);
            }
        });
    });

    // Card container event delegation
    elements.cardsContainer.addEventListener('click', handleCardClick);

    // Add card popup events
    const popupPlusButton = document.querySelector('.profile__add-button') as HTMLElement;
    const popupMainPlusButton = document.querySelector('.popup-add-button') as HTMLElement;
    const popupPlusClose = document.querySelector('.popup-add-button__close-button') as HTMLElement;
    const popupPlusContents = document.querySelector('.popup-add-button__add-main') as HTMLFormElement;

    popupPlusButton.addEventListener('click', () => {
        const titleInput = document.querySelector('.popup-add-button__item_text_heading') as HTMLInputElement;
        const linkInput = document.querySelector('.popup-add-button__item_text_subheading') as HTMLInputElement;
        const submitButton = document.querySelector('.popup-add-button__add-button-create') as HTMLButtonElement;
        
        resetForm(titleInput, linkInput, submitButton);
        openPopupToggle(popupMainPlusButton);
    });

    popupPlusClose.addEventListener('click', () => closePopup(popupMainPlusButton));
    popupPlusContents.addEventListener('submit', addNewCard);

    // Image zoom popup close
    const popupImageClose = document.querySelector('.popup-image-zoomed__close-image') as HTMLElement;
    popupImageClose.addEventListener('click', () => {
        closePopup(document.querySelector('.popup-image-zoomed') as HTMLElement);
    });
};

// Initialize the application
const init = (): void => {
    setupEventListeners();
    loadCards();
};

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}