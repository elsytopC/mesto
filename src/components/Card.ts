import { Card as CardType, CardClickHandler } from '../types';

/**
 * Card component class for managing photo cards
 */
export class Card {
    private cardData: CardType;
    private element: HTMLElement;
    private onImageClick: CardClickHandler | undefined;
    private onLikeClick: ((event: Event) => void) | undefined;
    private onDeleteClick: ((event: Event) => void) | undefined;

    constructor(
        cardData: CardType,
        template: DocumentFragment,
        onImageClick?: CardClickHandler,
        onLikeClick?: (event: Event) => void,
        onDeleteClick?: (event: Event) => void
    ) {
        this.cardData = cardData;
        this.onImageClick = onImageClick;
        this.onLikeClick = onLikeClick;
        this.onDeleteClick = onDeleteClick;
        
        this.element = this.createCardElement(template);
    }

    /**
     * Create card element from template
     */
    private createCardElement(template: DocumentFragment): HTMLElement {
        const cardElement = template.cloneNode(true) as HTMLElement;
        const cardPhoto = cardElement.querySelector('.element__image') as HTMLImageElement;
        const likeButton = cardElement.querySelector('.element__like-button') as HTMLButtonElement;
        const deleteButton = cardElement.querySelector('.element__delete-button') as HTMLButtonElement;
        const cardText = cardElement.querySelector('.element__text') as HTMLElement;

        if (!cardPhoto || !likeButton || !deleteButton || !cardText) {
            throw new Error('Required card elements not found in template');
        }

        // Set card data
        cardPhoto.src = this.cardData.link;
        cardPhoto.alt = this.cardData.name;
        cardText.textContent = this.cardData.name;

        // Add event listeners
        cardPhoto.addEventListener('click', () => {
            if (this.onImageClick) {
                this.onImageClick(this.cardData);
            }
        });

        likeButton.addEventListener('click', (event: Event) => {
            this.handleLikeClick(event);
            if (this.onLikeClick) {
                this.onLikeClick(event);
            }
        });

        deleteButton.addEventListener('click', (event: Event) => {
            this.handleDeleteClick(event);
            if (this.onDeleteClick) {
                this.onDeleteClick(event);
            }
        });

        return cardElement;
    }

    /**
     * Handle like button click
     */
    private handleLikeClick(event: Event): void {
        const target = event.target as HTMLElement;
        target.classList.toggle('element__like-button_pushed');
    }

    /**
     * Handle delete button click with animation
     */
    private handleDeleteClick(event: Event): void {
        const target = event.target as HTMLElement;
        const cardElement = target.closest('.element') as HTMLElement;
        
        if (cardElement) {
            // Add animation class
            cardElement.classList.add('element_animated-delete');
            
            // Remove the element after animation completes
            cardElement.addEventListener('animationend', () => {
                cardElement.remove();
            }, { once: true });
        }
    }

    /**
     * Get the card element
     */
    public getElement(): HTMLElement {
        return this.element;
    }

    /**
     * Get card data
     */
    public getData(): CardType {
        return this.cardData;
    }
}