import { PopupConfig } from '../types';

/**
 * Popup utility class for managing modal windows
 */
export class Popup {
    private element: HTMLElement;
    private openButton: HTMLElement | undefined;
    private closeButton: HTMLElement | undefined;

    constructor(config: PopupConfig) {
        this.element = config.element;
        this.openButton = config.openButton;
        this.closeButton = config.closeButton;
        
        this.initialize();
    }

    /**
     * Initialize popup event listeners
     */
    private initialize(): void {
        if (this.openButton) {
            this.openButton.addEventListener('click', () => this.open());
        }

        if (this.closeButton) {
            this.closeButton.addEventListener('click', () => this.close());
        }

        // Close on overlay click
        this.element.addEventListener('click', (evt: Event) => {
            if (evt.target === this.element) {
                this.close();
            }
        });
    }

    /**
     * Open the popup
     */
    public open(): void {
        this.element.classList.add('popup_is-opened');
    }

    /**
     * Close the popup
     */
    public close(): void {
        this.element.classList.remove('popup_is-opened');
    }

    /**
     * Toggle popup state
     */
    public toggle(): void {
        this.element.classList.toggle('popup_is-opened');
    }

    /**
     * Check if popup is open
     */
    public isOpen(): boolean {
        return this.element.classList.contains('popup_is-opened');
    }
}

/**
 * Global popup manager for handling multiple popups
 */
export class PopupManager {
    private static instance: PopupManager;
    private popups: Popup[] = [];

    private constructor() {
        this.setupGlobalEventListeners();
    }

    /**
     * Get singleton instance
     */
    public static getInstance(): PopupManager {
        if (!PopupManager.instance) {
            PopupManager.instance = new PopupManager();
        }
        return PopupManager.instance;
    }

    /**
     * Register a popup
     */
    public registerPopup(popup: Popup): void {
        this.popups.push(popup);
    }

    /**
     * Close all popups
     */
    public closeAll(): void {
        this.popups.forEach(popup => popup.close());
    }

    /**
     * Close popup by element
     */
    public closePopup(element: HTMLElement): void {
        const popup = this.popups.find(p => p['element'] === element);
        if (popup) {
            popup.close();
        }
    }

    /**
     * Setup global event listeners (Escape key, etc.)
     */
    private setupGlobalEventListeners(): void {
        // Close on Escape key
        document.addEventListener('keydown', (evt: KeyboardEvent) => {
            if (evt.key === 'Escape') {
                this.closeAll();
            }
        });
    }
}