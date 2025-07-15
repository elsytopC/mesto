import { PopupConfig } from '../types';
/**
 * Popup utility class for managing modal windows
 */
export declare class Popup {
    private element;
    private openButton;
    private closeButton;
    constructor(config: PopupConfig);
    /**
     * Initialize popup event listeners
     */
    private initialize;
    /**
     * Open the popup
     */
    open(): void;
    /**
     * Close the popup
     */
    close(): void;
    /**
     * Toggle popup state
     */
    toggle(): void;
    /**
     * Check if popup is open
     */
    isOpen(): boolean;
}
/**
 * Global popup manager for handling multiple popups
 */
export declare class PopupManager {
    private static instance;
    private popups;
    private constructor();
    /**
     * Get singleton instance
     */
    static getInstance(): PopupManager;
    /**
     * Register a popup
     */
    registerPopup(popup: Popup): void;
    /**
     * Close all popups
     */
    closeAll(): void;
    /**
     * Close popup by element
     */
    closePopup(element: HTMLElement): void;
    /**
     * Setup global event listeners (Escape key, etc.)
     */
    private setupGlobalEventListeners;
}
//# sourceMappingURL=popup.d.ts.map