import { Card } from './components/Card';
import { Profile } from './components/Profile';
import { Popup, PopupManager } from './utils/popup';
import { enableValidation } from './utils/validation';
import { initialCards } from './data/cards';
/**
 * Main application class
 */
export class App {
    constructor() {
        this.cards = [];
        this.domElements = this.initializeDOMElements();
        this.popupManager = PopupManager.getInstance();
        this.profile = this.initializeProfile();
        this.initializePopups();
        this.initializeCards();
        this.initializeEventListeners();
        this.enableValidation();
    }
    /**
     * Initialize DOM elements
     */
    initializeDOMElements() {
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
            allSubmitButtons: Array.from(document.querySelectorAll('.popup__button-submit')),
            popupPlusButton: document.querySelector('.profile__add-button'),
            popupMainPlusButton: document.querySelector('.popup-add-button'),
            popupPlusClose: document.querySelector('.popup-add-button__close-button'),
            popupPlusTitle: document.querySelector('.popup-add-button__item_text_heading'),
            popupPlusLink: document.querySelector('.popup-add-button__item_text_subheading'),
            popupPlusCreate: document.querySelector('.popup-add-button__add-button-create'),
            popupPlusContents: document.querySelector('.popup-add-button__add-main'),
            popupImageZoom: document.querySelector('.popup-image-zoomed'),
            popupImageClose: document.querySelector('.popup-image-zoomed__close-image'),
        };
        // Validate required elements
        this.validateRequiredElements(elements);
        return elements;
    }
    /**
     * Validate that all required DOM elements exist
     */
    validateRequiredElements(elements) {
        const requiredElements = [
            'popup', 'mainProfile', 'profileAuthor', 'profileDetail',
            'popupHeading', 'popupSubHeading', 'mainForm', 'popupPhoto',
            'cardsContainer', 'sampleTemplate', 'popupAddForm',
            'popupInputPublish', 'submitButton', 'popupPlusButton',
            'popupMainPlusButton', 'popupPlusTitle', 'popupPlusLink',
            'popupPlusCreate', 'popupPlusContents', 'popupImageZoom'
        ];
        for (const elementName of requiredElements) {
            if (!elements[elementName]) {
                throw new Error(`Required DOM element not found: ${elementName}`);
            }
        }
    }
    /**
     * Initialize profile component
     */
    initializeProfile() {
        const avatarElement = document.querySelector('.profile__avatar');
        if (!avatarElement) {
            throw new Error('Profile avatar element not found');
        }
        const initialData = {
            name: this.domElements.profileAuthor.textContent || 'Жак-Ив Кусто',
            profession: this.domElements.profileDetail.textContent || 'Исследователь океана'
        };
        return new Profile(this.domElements.profileAuthor, this.domElements.profileDetail, avatarElement, initialData);
    }
    /**
     * Initialize popups
     */
    initializePopups() {
        // Profile edit popup
        const profilePopup = new Popup({
            element: this.domElements.popup,
            openButton: this.domElements.popupOpenButton,
            closeButton: this.domElements.popupClose
        });
        // Add card popup
        const addCardPopup = new Popup({
            element: this.domElements.popupMainPlusButton,
            openButton: this.domElements.popupPlusButton,
            closeButton: this.domElements.popupPlusClose
        });
        // Image zoom popup
        const imagePopup = new Popup({
            element: this.domElements.popupImageZoom,
            closeButton: this.domElements.popupImageClose
        });
        // Register popups with manager
        this.popupManager.registerPopup(profilePopup);
        this.popupManager.registerPopup(addCardPopup);
        this.popupManager.registerPopup(imagePopup);
    }
    /**
     * Initialize cards
     */
    initializeCards() {
        this.loadCards();
    }
    /**
     * Load initial cards
     */
    loadCards() {
        initialCards.forEach((cardData) => {
            this.addCard(cardData);
        });
    }
    /**
     * Add a new card
     */
    addCard(cardData, prepend = false) {
        const card = new Card(cardData, this.domElements.sampleTemplate, this.handleCardImageClick.bind(this), this.handleCardLikeClick.bind(this), this.handleCardDeleteClick.bind(this));
        this.cards.push(card);
        if (prepend) {
            this.domElements.cardsContainer.prepend(card.getElement());
        }
        else {
            this.domElements.cardsContainer.append(card.getElement());
        }
    }
    /**
     * Handle card image click
     */
    handleCardImageClick(card) {
        const imageElement = this.domElements.popupImageZoom.querySelector('.popup-image-zoomed__image-card');
        const titleElement = this.domElements.popupImageZoom.querySelector('.popup-image-zoomed__image-title');
        if (imageElement && titleElement) {
            imageElement.src = card.link;
            imageElement.alt = card.name;
            titleElement.textContent = card.name;
        }
        this.popupManager.closePopup(this.domElements.popupImageZoom);
        this.domElements.popupImageZoom.classList.add('popup_is-opened');
    }
    /**
     * Handle card like click
     */
    handleCardLikeClick(event) {
        // Handled by Card component
    }
    /**
     * Handle card delete click
     */
    handleCardDeleteClick(event) {
        // Handled by Card component
    }
    /**
     * Initialize event listeners
     */
    initializeEventListeners() {
        // Profile form submission
        this.domElements.mainForm.addEventListener('submit', this.handleProfileFormSubmit.bind(this));
        // Profile popup open button
        this.domElements.popupOpenButton.addEventListener('click', this.handleProfilePopupOpen.bind(this));
        // Add card form submission
        this.domElements.popupPlusContents.addEventListener('submit', this.handleAddCardFormSubmit.bind(this));
        // Add card popup open button
        this.domElements.popupPlusButton.addEventListener('click', this.handleAddCardPopupOpen.bind(this));
    }
    /**
     * Handle profile form submission
     */
    handleProfileFormSubmit(evt) {
        evt.preventDefault();
        const newData = {
            name: this.domElements.popupHeading.value,
            profession: this.domElements.popupSubHeading.value
        };
        this.profile.updateProfile(newData);
        this.popupManager.closePopup(this.domElements.popup);
    }
    /**
     * Handle profile popup open
     */
    handleProfilePopupOpen() {
        const profileData = this.profile.getProfileData();
        this.domElements.popupHeading.value = profileData.name;
        this.domElements.popupSubHeading.value = profileData.profession;
        this.domElements.popup.classList.add('popup_is-opened');
    }
    /**
     * Handle add card form submission
     */
    handleAddCardFormSubmit(evt) {
        evt.preventDefault();
        const newCard = {
            name: this.domElements.popupPlusTitle.value,
            link: this.domElements.popupPlusLink.value
        };
        this.addCard(newCard, true);
        // Reset form
        this.resetAddCardForm();
        this.popupManager.closePopup(this.domElements.popupMainPlusButton);
    }
    /**
     * Handle add card popup open
     */
    handleAddCardPopupOpen() {
        this.resetAddCardForm();
        this.domElements.popupMainPlusButton.classList.add('popup_is-opened');
    }
    /**
     * Reset add card form
     */
    resetAddCardForm() {
        this.domElements.popupPlusTitle.value = '';
        this.domElements.popupPlusLink.value = '';
        // Clear error messages
        this.domElements.popupAllErrors.forEach(error => {
            error.textContent = '';
            error.classList.remove('popup__display-error_active');
        });
        // Reset button state
        this.domElements.popupPlusCreate.classList.add('popup__button-submit_disabled');
        this.domElements.popupPlusCreate.setAttribute('disabled', 'true');
    }
    /**
     * Enable form validation
     */
    enableValidation() {
        enableValidation();
    }
}
//# sourceMappingURL=App.js.map