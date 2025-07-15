/**
 * Card component class for managing photo cards
 */
export class Card {
    constructor(cardData, template, onImageClick, onLikeClick, onDeleteClick) {
        this.cardData = cardData;
        this.onImageClick = onImageClick;
        this.onLikeClick = onLikeClick;
        this.onDeleteClick = onDeleteClick;
        this.element = this.createCardElement(template);
    }
    /**
     * Create card element from template
     */
    createCardElement(template) {
        const cardElement = template.cloneNode(true);
        const cardPhoto = cardElement.querySelector('.element__image');
        const likeButton = cardElement.querySelector('.element__like-button');
        const deleteButton = cardElement.querySelector('.element__delete-button');
        const cardText = cardElement.querySelector('.element__text');
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
        likeButton.addEventListener('click', (event) => {
            this.handleLikeClick(event);
            if (this.onLikeClick) {
                this.onLikeClick(event);
            }
        });
        deleteButton.addEventListener('click', (event) => {
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
    handleLikeClick(event) {
        const target = event.target;
        target.classList.toggle('element__like-button_pushed');
    }
    /**
     * Handle delete button click with animation
     */
    handleDeleteClick(event) {
        const target = event.target;
        const cardElement = target.closest('.element');
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
    getElement() {
        return this.element;
    }
    /**
     * Get card data
     */
    getData() {
        return this.cardData;
    }
}
//# sourceMappingURL=Card.js.map