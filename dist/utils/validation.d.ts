/**
 * Shows input error message
 */
export declare const showInputError: (formElement: HTMLFormElement, inputElement: HTMLInputElement, errorMessage: string) => void;
/**
 * Hides input error message
 */
export declare const hideInputError: (formElement: HTMLFormElement, inputElement: HTMLInputElement) => void;
/**
 * Gets the correct noun form based on number
 */
export declare const getNoun: (number: number, one: string, two: string, five: string) => string;
/**
 * Gets plural form for symbols
 */
export declare const getPluralSymbols: (number: number) => string;
/**
 * Gets appropriate error message for input element
 */
export declare const getErrorMessage: (inputElement: HTMLInputElement) => string;
/**
 * Checks input validity and shows/hides error message
 */
export declare const checkInputValidity: (formElement: HTMLFormElement, inputElement: HTMLInputElement) => void;
/**
 * Checks if any input in the list is invalid
 */
export declare const hasInvalidInput: (inputList: HTMLInputElement[]) => boolean;
/**
 * Toggles button state based on form validity
 */
export declare const toggleButtonState: (inputList: HTMLInputElement[], buttonElement: HTMLButtonElement) => void;
/**
 * Sets event listeners for form validation
 */
export declare const setEventListeners: (formElement: HTMLFormElement) => void;
/**
 * Enables validation for all forms
 */
export declare const enableValidation: () => void;
//# sourceMappingURL=validation.d.ts.map