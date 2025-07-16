interface Card {
    name: string;
    link: string;
}

//Popup и его логика
const popup = document.querySelector('.popup') as HTMLElement;
const popupWindow = Array.from(document.querySelectorAll('.popup')) as HTMLElement[];
const mainProfile = document.querySelector('.profile') as HTMLElement;
const popupOpenButton = document.querySelector('.profile__edit-button') as HTMLElement;
const popupClose = popup.querySelector('.popup__close') as HTMLElement;
const profileAuthor = document.querySelector('.profile__title') as HTMLElement;
const profileDetail = document.querySelector('.profile__subtitle') as HTMLElement;
const popupHeading = document.querySelector('.popup__item_text_heading') as HTMLInputElement;
const popupSubHeading = document.querySelector('.popup__item_text_subheading') as HTMLInputElement;
const mainForm = document.querySelector('.popup__main') as HTMLFormElement;
const popupPhoto = document.querySelector('.popup-image-zoomed') as HTMLElement;
const cardsContainer = document.querySelector('.elements') as HTMLElement;
const sampleTemplate = (document.querySelector('#cards-cover') as HTMLTemplateElement)?.content as DocumentFragment;
const popupAddForm = document.querySelector('#popup-add-content') as HTMLFormElement;
const popupAllInputs = Array.from(document.querySelectorAll('.popup__item')) as HTMLInputElement[];
const popupInputPublish = document.querySelector('#popup-add-disabled') as HTMLButtonElement;
const popupAllErrors = Array.from(document.querySelectorAll('.popup__display-error')) as HTMLElement[];
const submitButton = document.querySelector('.popup__button-submit') as HTMLButtonElement;
const allClose = Array.from(document.querySelectorAll('.popup__close')) as HTMLElement[];
const allSubmitButtons = Array.from(document.querySelectorAll('.popup__button-submit')) as HTMLButtonElement[];

function openPopupToggle(window: HTMLElement): void {
    window.classList.toggle('popup_is-opened');
}

function handleProfileFormSubmit(evt: Event): void {
    evt.preventDefault();
    profileAuthor.textContent = popupHeading.value;
    profileDetail.textContent = popupSubHeading.value;
    openPopupToggle(popup);
}

function fillProfileDescription(): void {
    popupHeading.value = profileAuthor.textContent || '';
    popupSubHeading.value = profileDetail.textContent || '';
}

popupClose.addEventListener('click', () => {
    openPopupToggle(popup);
});

mainForm.addEventListener('submit', handleProfileFormSubmit);
popupOpenButton.addEventListener('click', () => {
    fillProfileDescription();
    openPopupToggle(popup);
});

const popupAllShutDown = (step: HTMLElement): void => {
    step.classList.remove('popup_is-opened');
};

const popupAllClosedDown = (step: HTMLElement, link: string): void => {
    step.classList.add(link);
};

// Закрытие модальных окон по Escape - единый обработчик
document.addEventListener('keydown', function (evt: KeyboardEvent) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened') as HTMLElement;
        if (openedPopup) {
            popupAllShutDown(openedPopup);
        }
    }
});

// Закрытие модальных окон по Оверлей
popupWindow.forEach(function(popup) {
    popup.addEventListener('click', function (evt: Event) {
        if ((evt.target as HTMLElement).classList.contains('popup')) {
            popupAllShutDown(popup);
        }
    });
});

//Карточки (Cards) c добавлением на страницу при загрузке
function getCardElement(item: Card): HTMLElement {
    const detailCard = sampleTemplate.cloneNode(true) as HTMLElement;
    const cardPhoto = detailCard.querySelector('.element__image') as HTMLImageElement;

    cardPhoto.addEventListener('click', () => handlePreviewPicture(item));
    detailCard.querySelector('.element__like-button')?.addEventListener('click', handleLikeIcon);
    detailCard.querySelector('.element__delete-button')?.addEventListener('click', handleDeleteCard);

    cardPhoto.src = item.link;
    cardPhoto.alt = item.name;

    const textElement = detailCard.querySelector('.element__text') as HTMLElement;
    if (textElement) {
        textElement.textContent = item.name;
    }

    return detailCard;
}

function handlePreviewPicture(item: Card): void {
    const popupImageZoom = document.querySelector('.popup-image-zoomed') as HTMLElement;
    const imageElement = popupImageZoom.querySelector('.popup-image-zoomed__image-card') as HTMLImageElement;
    const titleElement = popupImageZoom.querySelector('.popup-image-zoomed__image-title') as HTMLElement;

    if (imageElement && titleElement) {
        imageElement.src = item.link;
        imageElement.alt = item.name;
        titleElement.textContent = item.name;
    }

    openPopupToggle(popupImageZoom);
}

function handleLikeIcon(evt: Event): void {
    (evt.target as HTMLElement).classList.toggle('element__like-button_pushed');
}

function handleDeleteCard(evt: Event): void {
    const cardElement = (evt.target as HTMLElement).closest('.element') as HTMLElement;
    
    if (cardElement) {
        // Add animation class
        cardElement.classList.add('element_animated-delete');
        
        // Remove the element after animation completes
        cardElement.addEventListener('animationend', () => {
            cardElement.remove();
        }, { once: true });
    }
}

function loadCards(): void {
    initialCards.forEach((item: Card) => {
        const lists = getCardElement(item);
        cardsContainer.append(lists);
    });
}

loadCards();

//Кнопка "+" и логика добавления элемента
const popupPlusButton = document.querySelector('.profile__add-button') as HTMLElement;
const popupMainPlusButton = document.querySelector('.popup-add-button') as HTMLElement;
const popupPlusClose = document.querySelector('.popup-add-button__close-button') as HTMLElement;
const popupPlusTitle = document.querySelector('.popup-add-button__item_text_heading') as HTMLInputElement;
const popupPlusLink = document.querySelector('.popup-add-button__item_text_subheading') as HTMLInputElement;
const popupPlusCreate = document.querySelector('.popup-add-button__add-button-create') as HTMLButtonElement;
const popupPlusContents = document.querySelector('.popup-add-button__add-main') as HTMLFormElement;

popupPlusButton.addEventListener('click', () => {
    // Clear form inputs
    popupPlusTitle.value = '';
    popupPlusLink.value = '';
    
    // Clear any error messages
    popupAllErrors.forEach(error => {
        error.textContent = '';
        error.classList.remove('popup__display-error_active');
    });
    
    // Reset button state
    popupPlusCreate.classList.add('popup__button-submit_disabled');
    popupPlusCreate.setAttribute('disabled', 'true');
    
    openPopupToggle(popupMainPlusButton);
});

popupPlusClose.addEventListener('click', () => {
    openPopupToggle(popupMainPlusButton);
});

popupPlusContents.addEventListener('submit', (evt: Event) => {
    evt.preventDefault();

    const coverCard: Card = {
        name: popupPlusTitle.value,
        link: popupPlusLink.value
    };

    const detailCard = getCardElement(coverCard);
    cardsContainer.prepend(detailCard);

    // Reset form after successful submission
    popupPlusTitle.value = '';
    popupPlusLink.value = '';
    
    // Clear any error messages
    popupAllErrors.forEach(error => {
        error.textContent = '';
        error.classList.remove('popup__display-error_active');
    });
    
    // Reset button state
    popupPlusCreate.classList.add('popup__button-submit_disabled');
    popupPlusCreate.setAttribute('disabled', 'true');

    openPopupToggle(popupMainPlusButton);
});

//Закрытие картинки zoomed при клике на крестик кнопки мыши
const popupImageZoom = document.querySelector('.popup-image-zoomed') as HTMLElement;
const popupImageClose = document.querySelector('.popup-image-zoomed__close-image') as HTMLElement;

popupImageClose.addEventListener('click', () => {
    openPopupToggle(popupImageZoom);
});