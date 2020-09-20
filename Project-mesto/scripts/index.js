
const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupClose = popup.querySelector('.popup__close');
const profileAuthor = document.querySelector('.profile__title');
const profileDetail = document.querySelector('.profile__subtitle');
const popupHeading = document.querySelector('.popup__item_text_heading');
const popupSubHeading = document.querySelector('.popup__item_text_subheading');

function popupToggle() {
    popup.classList.toggle('popup_is-opened');
}

function profileDescription () {
    popupHeading.value = profileAuthor.textContent;
    popupSubHeading.value = profileDetail.textContent;
}

profileDescription ()

const saveButton = document.querySelector('.popup__button-submit');

function Save (evt) {
    profileAuthor.textContent = popupHeading.value;
    profileDetail.textContent = popupSubHeading.value;

    evt.preventDefault();
}

popupOpenButton.addEventListener('click', popupToggle);
popupClose.addEventListener('click', popupToggle);
popup.addEventListener('submit', Save);
saveButton.addEventListener('click', popupToggle);