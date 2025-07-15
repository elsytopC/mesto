import { Card as CardType, ProfileData, DOMElements } from './types';
import { Card } from './components/Card';
import { Profile } from './components/Profile';
import { Popup, PopupManager } from './utils/popup';
import { enableValidation } from './utils/validation';
import { initialCards } from './data/cards';

/**
 * Main application class
 */
export class App {
    private domElements: DOMElements;
    private profile: Profile;
    private popupManager: PopupManager;
    private cards: Card[] = [];

    constructor() {
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
    private initializeDOMElements(): DOMElements {
        const elements = {
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
            allSubmitButtons: Array.from(document.querySelectorAll('.popup__button-submit')) as HTMLButtonElement[],
            popupPlusButton: document.querySelector('.profile__add-button') as HTMLElement,
            popupMainPlusButton: document.querySelector('.popup-add-button') as HTMLElement,
            popupPlusClose: document.querySelector('.popup-add-button__close-button') as HTMLElement,
            popupPlusTitle: document.querySelector('.popup-add-button__item_text_heading') as HTMLInputElement,
            popupPlusLink: document.querySelector('.popup-add-button__item_text_subheading') as HTMLInputElement,
            popupPlusCreate: document.querySelector('.popup-add-button__add-button-create') as HTMLButtonElement,
            popupPlusContents: document.querySelector('.popup-add-button__add-main') as HTMLFormElement,
            popupImageZoom: document.querySelector('.popup-image-zoomed') as HTMLElement,
            popupImageClose: document.querySelector('.popup-image-zoomed__close-image') as HTMLElement,
        };

        // Validate required elements
        this.validateRequiredElements(elements);

        return elements;
    }

    /**
     * Validate that all required DOM elements exist
     */
    private validateRequiredElements(elements: DOMElements): void {
        const requiredElements = [
            'popup', 'mainProfile', 'profileAuthor', 'profileDetail',
            'popupHeading', 'popupSubHeading', 'mainForm', 'popupPhoto',
            'cardsContainer', 'sampleTemplate', 'popupAddForm',
            'popupInputPublish', 'submitButton', 'popupPlusButton',
            'popupMainPlusButton', 'popupPlusTitle', 'popupPlusLink',
            'popupPlusCreate', 'popupPlusContents', 'popupImageZoom'
        ];

        for (const elementName of requiredElements) {
            if (!elements[elementName as keyof DOMElements]) {
                throw new Error(`Required DOM element not found: ${elementName}`);
            }
        }
    }

    /**
     * Initialize profile component
     */
    private initializeProfile(): Profile {
        const avatarElement = document.querySelector('.profile__avatar') as HTMLImageElement;
        if (!avatarElement) {
            throw new Error('Profile avatar element not found');
        }

        const initialData: ProfileData = {
            name: this.domElements.profileAuthor.textContent || 'Жак-Ив Кусто',
            profession: this.domElements.profileDetail.textContent || 'Исследователь океана'
        };

        return new Profile(
            this.domElements.profileAuthor,
            this.domElements.profileDetail,
            avatarElement,
            initialData
        );
    }

    /**
     * Initialize popups
     */
    private initializePopups(): void {
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
    private initializeCards(): void {
        this.loadCards();
    }

    /**
     * Load initial cards
     */
    private loadCards(): void {
        initialCards.forEach((cardData: CardType) => {
            this.addCard(cardData);
        });
    }

    /**
     * Add a new card
     */
    private addCard(cardData: CardType, prepend: boolean = false): void {
        const card = new Card(
            cardData,
            this.domElements.sampleTemplate,
            this.handleCardImageClick.bind(this),
            this.handleCardLikeClick.bind(this),
            this.handleCardDeleteClick.bind(this)
        );

        this.cards.push(card);

        if (prepend) {
            this.domElements.cardsContainer.prepend(card.getElement());
        } else {
            this.domElements.cardsContainer.append(card.getElement());
        }
    }

    /**
     * Handle card image click
     */
    private handleCardImageClick(card: CardType): void {
        const imageElement = this.domElements.popupImageZoom.querySelector('.popup-image-zoomed__image-card') as HTMLImageElement;
        const titleElement = this.domElements.popupImageZoom.querySelector('.popup-image-zoomed__image-title') as HTMLElement;

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
    private handleCardLikeClick(event: Event): void {
        // Handled by Card component
    }

    /**
     * Handle card delete click
     */
    private handleCardDeleteClick(event: Event): void {
        // Handled by Card component
    }

    /**
     * Initialize event listeners
     */
    private initializeEventListeners(): void {
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
    private handleProfileFormSubmit(evt: Event): void {
        evt.preventDefault();
        
        const newData: ProfileData = {
            name: this.domElements.popupHeading.value,
            profession: this.domElements.popupSubHeading.value
        };

        this.profile.updateProfile(newData);
        this.popupManager.closePopup(this.domElements.popup);
    }

    /**
     * Handle profile popup open
     */
    private handleProfilePopupOpen(): void {
        const profileData = this.profile.getProfileData();
        this.domElements.popupHeading.value = profileData.name;
        this.domElements.popupSubHeading.value = profileData.profession;
        
        this.domElements.popup.classList.add('popup_is-opened');
    }

    /**
     * Handle add card form submission
     */
    private handleAddCardFormSubmit(evt: Event): void {
        evt.preventDefault();

        const newCard: CardType = {
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
    private handleAddCardPopupOpen(): void {
        this.resetAddCardForm();
        this.domElements.popupMainPlusButton.classList.add('popup_is-opened');
    }

    /**
     * Reset add card form
     */
    private resetAddCardForm(): void {
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
    private enableValidation(): void {
        enableValidation();
    }
}