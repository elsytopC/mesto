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

function popupToggle(window) {
    window.classList.toggle('popup_is-opened');
}

function profileDescription () {
    popupHeading.value = profileAuthor.textContent;
    popupSubHeading.value = profileDetail.textContent;
}

popupOpenButton.addEventListener('click', profileDescription);

function Save (evt) {
    evt.preventDefault();
    profileAuthor.textContent = popupHeading.value;
    profileDetail.textContent = popupSubHeading.value;

    popupToggle(popup);
}

popupClose.addEventListener('click', () => {
    popupToggle(popup);
});
mainForm.addEventListener('submit', Save);
popupOpenButton.addEventListener('click', () => {
    popupToggle(popup)
});

//Карточки (Cards) c добавлением на страницу при загрузке


function cardCreation (item) {
    const sampleTemplate = document.querySelector('#cards-cover').content;
    const detailCard = sampleTemplate.cloneNode(true);
    const mainCard = detailCard.querySelector('.element');
    const cardPhoto = detailCard.querySelector('.element__image');

    cardPhoto.src = item.link;
    cardPhoto.alt = item.name;

    cardPhoto.addEventListener('click', function () {
       popupImageZoom.querySelector('.popup-image-zoomed__image-card').src = item.link;
        popupImageZoom.querySelector('.popup-image-zoomed__image-title').textContent = item.name;

        popupToggle(popupImageZoom);
    })

    detailCard.querySelector('.element__text').textContent = item.name;

    const heartButton = detailCard.querySelector('.element__like-button');
    heartButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-button_pushed');
    });

    const deleteCard = detailCard.querySelector('.element__delete-button');
    deleteCard.addEventListener('click', function (evt) {
        evt.target.parentElement.remove()
    });

    return detailCard
}

function cardsLoad () {
    initialCards.forEach((item) => {
    const lists = cardCreation (item)
       cardsContainer.append(lists);
    });

}

cardsLoad();

//Кнопка "+" и логика добавления элемента

const popupPlusButton = document.querySelector('.profile__add-button');
const popupMainPlusButton = document.querySelector('.popup-add-button');
const popupPlusClose = document.querySelector('.popup-add-button__close-button');
const popupPlusTitle = document.querySelector('.popup-add-button__item_text_heading');
const popupPlusLink = document.querySelector('.popup-add-button__item_text_subheading');
const popupPlusCreate = document.querySelector('.popup-add-button__add-button-create');
const popupPlusContents = document.querySelector('.popup-add-button__add-main');

popupPlusButton.addEventListener('click', () => {
    popupToggle(popupMainPlusButton)
});
popupPlusClose.addEventListener('click', () => {
    popupToggle(popupMainPlusButton)
});

popupPlusContents.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const Cover = {
        name: popupPlusTitle.value,
        link: popupPlusLink.value
    }

    const detailCard = cardCreation(Cover)
    cardsContainer.prepend(detailCard);

    popupToggle(popupMainPlusButton)
});

//Закрытие картинки zoomed при клике на крестик кнопки мыши

const popupImageZoom = document.querySelector('.popup-image-zoomed');
const popupImageClose = document.querySelector('.popup-image-zoomed__close-image');

popupImageClose.addEventListener('click', () => {
    popupToggle(popupImageZoom)
});






