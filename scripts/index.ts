import { initialCards, type Card } from './cards';

// Cache DOM elements once at initialization for better performance
const DOM_ELEMENTS = {
    popup: document.querySelector('.popup') as HTMLElement,
    popupWindows: Array.from(document.querySelectorAll('.popup')) as HTMLElement[],
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
    allSubmitButtons: Array.from(document.querySelectorAll('.popup__button-submit')) as HTMLButtonElement[],
    popupPlusButton: document.querySelector('.profile__add-button') as HTMLElement,
    popupMainPlusButton: document.querySelector('.popup-add-button') as HTMLElement,
    popupPlusClose: document.querySelector('.popup-add-button__close-button') as HTMLElement,
    popupPlusTitle: document.querySelector('.popup-add-button__item_text_heading') as HTMLInputElement,
    popupPlusLink: document.querySelector('.popup-add-button__item_text_subheading') as HTMLInputElement,
    popupPlusCreate: document.querySelector('.popup-add-button__add-button-create') as HTMLButtonElement,
    popupPlusContents: document.querySelector('.popup-add-button__add-main') as HTMLFormElement,
    popupImageZoom: document.querySelector('.popup-image-zoomed') as HTMLElement,
    popupImageClose: document.querySelector('.popup-image-zoomed__close-image') as HTMLElement
} as const;

// Optimized popup toggle function
const openPopupToggle = (window: HTMLElement): void => {
    window.classList.toggle('popup_is-opened');
};

// Optimized profile form submission handler
const handleProfileFormSubmit = (evt: Event): void => {
    evt.preventDefault();
    const { profileAuthor, popupHeading, profileDetail, popupSubHeading, popup } = DOM_ELEMENTS;
    
    if (profileAuthor && popupHeading && profileDetail && popupSubHeading) {
        profileAuthor.textContent = popupHeading.value;
        profileDetail.textContent = popupSubHeading.value;
        openPopupToggle(popup);
    }
};

// Optimized profile description filler
const fillProfileDescription = (): void => {
    const { popupHeading, profileAuthor, popupSubHeading, profileDetail } = DOM_ELEMENTS;
    
    if (popupHeading && profileAuthor && popupSubHeading && profileDetail) {
        popupHeading.value = profileAuthor.textContent || '';
        popupSubHeading.value = profileDetail.textContent || '';
    }
};

// Event delegation for better performance
const handleCardEvents = (evt: Event): void => {
    const target = evt.target as HTMLElement;
    
    // Handle like button clicks
    if (target.classList.contains('element__like-button')) {
        target.classList.toggle('element__like-button_pushed');
        return;
    }
    
    // Handle delete button clicks
    if (target.classList.contains('element__delete-button')) {
        const cardElement = target.closest('.element') as HTMLElement;
        if (cardElement) {
            cardElement.classList.add('element_animated-delete');
            cardElement.addEventListener('animationend', () => {
                cardElement.remove();
            }, { once: true });
        }
        return;
    }
    
    // Handle image clicks for preview
    if (target.classList.contains('element__image')) {
        const cardElement = target.closest('.element') as HTMLElement;
        if (cardElement) {
            const imageSrc = (target as HTMLImageElement).src;
            const imageAlt = (target as HTMLImageElement).alt;
            handlePreviewPicture({ name: imageAlt, link: imageSrc });
        }
    }
};

// Optimized card element creation with better memory management
const getCardElement = (item: Card): HTMLElement => {
    const detailCard = DOM_ELEMENTS.sampleTemplate.cloneNode(true) as HTMLElement;
    const cardPhoto = detailCard.querySelector('.element__image') as HTMLImageElement;
    const textElement = detailCard.querySelector('.element__text') as HTMLElement;

    if (cardPhoto) {
        cardPhoto.src = item.link;
        cardPhoto.alt = item.name;
    }

    if (textElement) {
        textElement.textContent = item.name;
    }

    return detailCard;
};

// Optimized preview picture handler
const handlePreviewPicture = (item: Card): void => {
    const { popupImageZoom } = DOM_ELEMENTS;
    const imageElement = popupImageZoom?.querySelector('.popup-image-zoomed__image-card') as HTMLImageElement;
    const titleElement = popupImageZoom?.querySelector('.popup-image-zoomed__image-title') as HTMLElement;

    if (imageElement && titleElement && popupImageZoom) {
        imageElement.src = item.link;
        imageElement.alt = item.name;
        titleElement.textContent = item.name;
        openPopupToggle(popupImageZoom);
    }
};

// Optimized card loading with better performance
const loadCards = (): void => {
    const { cardsContainer } = DOM_ELEMENTS;
    if (!cardsContainer) return;

    // Use DocumentFragment for better performance when adding multiple elements
    const fragment = document.createDocumentFragment();
    
    initialCards.forEach((item: Card) => {
        const cardElement = getCardElement(item);
        fragment.appendChild(cardElement);
    });
    
    cardsContainer.appendChild(fragment);
};

// Optimized form reset utility
const resetForm = (): void => {
    const { popupPlusTitle, popupPlusLink, popupAllErrors, popupPlusCreate } = DOM_ELEMENTS;
    
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

// Event listeners with better error handling
const initializeEventListeners = (): void => {
    const {
        popupClose, mainForm, popupOpenButton, popupPlusButton, popupPlusClose,
        popupPlusContents, popupImageClose, popupWindows, cardsContainer
    } = DOM_ELEMENTS;

    // Profile popup events
    popupClose?.addEventListener('click', () => openPopupToggle(DOM_ELEMENTS.popup));
    mainForm?.addEventListener('submit', handleProfileFormSubmit);
    popupOpenButton?.addEventListener('click', () => {
        fillProfileDescription();
        openPopupToggle(DOM_ELEMENTS.popup);
    });

    // Add card popup events
    popupPlusButton?.addEventListener('click', () => {
        resetForm();
        openPopupToggle(DOM_ELEMENTS.popupMainPlusButton);
    });

    popupPlusClose?.addEventListener('click', () => openPopupToggle(DOM_ELEMENTS.popupMainPlusButton));

    popupPlusContents?.addEventListener('submit', (evt: Event) => {
        evt.preventDefault();
        const { popupPlusTitle, popupPlusLink, cardsContainer } = DOM_ELEMENTS;

        if (popupPlusTitle && popupPlusLink && cardsContainer) {
            const coverCard: Card = {
                name: popupPlusTitle.value,
                link: popupPlusLink.value
            };

            const detailCard = getCardElement(coverCard);
            cardsContainer.prepend(detailCard);
            resetForm();
            openPopupToggle(DOM_ELEMENTS.popupMainPlusButton);
        }
    });

    // Image zoom popup events
    popupImageClose?.addEventListener('click', () => openPopupToggle(DOM_ELEMENTS.popupImageZoom));

    // Global event listeners
    document.addEventListener('keydown', (evt: KeyboardEvent) => {
        if (evt.key === 'Escape') {
            const openedPopup = document.querySelector('.popup_is-opened') as HTMLElement;
            if (openedPopup) {
                openedPopup.classList.remove('popup_is-opened');
            }
        }
    });

    // Optimized overlay click handling
    popupWindows.forEach((popup: HTMLElement) => {
        popup.addEventListener('click', (evt: Event) => {
            if ((evt.target as HTMLElement).classList.contains('popup')) {
                popup.classList.remove('popup_is-opened');
            }
        });
    });

    // Event delegation for card interactions
    cardsContainer?.addEventListener('click', handleCardEvents);
};

// Initialize the application
const initializeApp = (): void => {
    initializeEventListeners();
    loadCards();
};

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}