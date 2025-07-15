/**
 * Popup utility class for managing modal windows
 */
export class Popup {
    constructor(config) {
        this.element = config.element;
        this.openButton = config.openButton;
        this.closeButton = config.closeButton;
        this.initialize();
    }
    /**
     * Initialize popup event listeners
     */
    initialize() {
        if (this.openButton) {
            this.openButton.addEventListener('click', () => this.open());
        }
        if (this.closeButton) {
            this.closeButton.addEventListener('click', () => this.close());
        }
        // Close on overlay click
        this.element.addEventListener('click', (evt) => {
            if (evt.target === this.element) {
                this.close();
            }
        });
    }
    /**
     * Open the popup
     */
    open() {
        this.element.classList.add('popup_is-opened');
    }
    /**
     * Close the popup
     */
    close() {
        this.element.classList.remove('popup_is-opened');
    }
    /**
     * Toggle popup state
     */
    toggle() {
        this.element.classList.toggle('popup_is-opened');
    }
    /**
     * Check if popup is open
     */
    isOpen() {
        return this.element.classList.contains('popup_is-opened');
    }
}
/**
 * Global popup manager for handling multiple popups
 */
export class PopupManager {
    constructor() {
        this.popups = [];
        this.setupGlobalEventListeners();
    }
    /**
     * Get singleton instance
     */
    static getInstance() {
        if (!PopupManager.instance) {
            PopupManager.instance = new PopupManager();
        }
        return PopupManager.instance;
    }
    /**
     * Register a popup
     */
    registerPopup(popup) {
        this.popups.push(popup);
    }
    /**
     * Close all popups
     */
    closeAll() {
        this.popups.forEach(popup => popup.close());
    }
    /**
     * Close popup by element
     */
    closePopup(element) {
        const popup = this.popups.find(p => p['element'] === element);
        if (popup) {
            popup.close();
        }
    }
    /**
     * Setup global event listeners (Escape key, etc.)
     */
    setupGlobalEventListeners() {
        // Close on Escape key
        document.addEventListener('keydown', (evt) => {
            if (evt.key === 'Escape') {
                this.closeAll();
            }
        });
    }
}
//# sourceMappingURL=popup.js.map