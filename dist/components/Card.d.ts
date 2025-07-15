import { Card as CardType, CardClickHandler } from '../types';
/**
 * Card component class for managing photo cards
 */
export declare class Card {
    private cardData;
    private element;
    private onImageClick;
    private onLikeClick;
    private onDeleteClick;
    constructor(cardData: CardType, template: DocumentFragment, onImageClick?: CardClickHandler, onLikeClick?: (event: Event) => void, onDeleteClick?: (event: Event) => void);
    /**
     * Create card element from template
     */
    private createCardElement;
    /**
     * Handle like button click
     */
    private handleLikeClick;
    /**
     * Handle delete button click with animation
     */
    private handleDeleteClick;
    /**
     * Get the card element
     */
    getElement(): HTMLElement;
    /**
     * Get card data
     */
    getData(): CardType;
}
//# sourceMappingURL=Card.d.ts.map