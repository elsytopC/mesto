//Popup и его логика

const popup = document.querySelector('.popup');
const mainProfile = document.querySelector('.profile');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupClose = popup.querySelector('.popup__close');
const profileAuthor = document.querySelector('.profile__title');
const profileDetail = document.querySelector('.profile__subtitle');
const popupHeading = document.querySelector('.popup__item_text_heading');
const popupSubHeading = document.querySelector('.popup__item_text_subheading');
const mainForm = document.querySelector('.popup__main');
const popupPhoto = document.querySelector('.popup-image-zoomed');
const cardsContainer = document.querySelector('.elements');
const sampleTemplate = document.querySelector('#cards-cover').content;

function openPopupToggle(window) {
    window.classList.toggle('popup_is-opened');
}

function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileAuthor.textContent = popupHeading.value;
    profileDetail.textContent = popupSubHeading.value;

    openPopupToggle(popup);
}

function fillProfileDescription () {
    popupHeading.value = profileAuthor.textContent;
    popupSubHeading.value = profileDetail.textContent;
}

popupClose.addEventListener('click', () => {
    openPopupToggle(popup);
});

mainForm.addEventListener('submit', handleProfileFormSubmit);
popupOpenButton.addEventListener('click', () => {
    fillProfileDescription()
    openPopupToggle(popup)
});

//Карточки (Cards) c добавлением на страницу при загрузке


    function getCardElement (item) {
        const detailCard = sampleTemplate.cloneNode(true);
        const cardPhoto = detailCard.querySelector('.element__image');

    detailCard.querySelector('.element__image').addEventListener('click', () => handlePreviewPicture(item));
    detailCard.querySelector('.element__like-button').addEventListener('click', handleLikeIcon);
    detailCard.querySelector('.element__delete-button').addEventListener('click', handleDeleteCard);

    cardPhoto.src = item.link;
    cardPhoto.alt = item.name;

    detailCard.querySelector('.element__text').textContent = item.name;

    return detailCard
}

function handlePreviewPicture (item) {

    popupImageZoom.querySelector('.popup-image-zoomed__image-card').src = item.link;
    popupImageZoom.querySelector('.popup-image-zoomed__image-title').textContent = item.name;

    openPopupToggle(popupImageZoom);

}

function handleLikeIcon (evt) {
    evt.target.classList.toggle('element__like-button_pushed');
}

function handleDeleteCard (evt) {
    evt.target.parentElement.remove()
}

function loadCards () {
    initialCards.forEach((item) => {
    const lists = getCardElement(item)
       cardsContainer.append(lists);
    });

}

loadCards();

//Кнопка "+" и логика добавления элемента

const popupPlusButton = document.querySelector('.profile__add-button');
const popupMainPlusButton = document.querySelector('.popup-add-button');
const popupPlusClose = document.querySelector('.popup-add-button__close-button');
const popupPlusTitle = document.querySelector('.popup-add-button__item_text_heading');
const popupPlusLink = document.querySelector('.popup-add-button__item_text_subheading');
const popupPlusCreate = document.querySelector('.popup-add-button__add-button-create');
const popupPlusContents = document.querySelector('.popup-add-button__add-main');

popupPlusButton.addEventListener('click', () => {
    openPopupToggle(popupMainPlusButton)
});
popupPlusClose.addEventListener('click', () => {
    openPopupToggle(popupMainPlusButton)
});

popupPlusContents.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const coverCard = {
        name: popupPlusTitle.value,
        link: popupPlusLink.value
    }

    const detailCard = getCardElement(coverCard)
    cardsContainer.prepend(detailCard);

    openPopupToggle(popupMainPlusButton)
});

//Закрытие картинки zoomed при клике на крестик кнопки мыши

const popupImageZoom = document.querySelector('.popup-image-zoomed');
const popupImageClose = document.querySelector('.popup-image-zoomed__close-image');

popupImageClose.addEventListener('click', () => {
    openPopupToggle(popupImageZoom)
});






