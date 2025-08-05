// Type definitions for better type safety
type ErrorHandler = (inputElement: HTMLInputElement) => string;
type ErrorHandlers = Record<string, ErrorHandler>;

// Constants for better maintainability
const ERROR_MESSAGES = {
    EMAIL_TYPE_MISMATCH: "Пожалуйста, введите корректный e-mail",
    EMAIL_VALUE_MISSING: "Пожалуйста, заполните поле с e-mail",
    PHONE_VALUE_MISSING: "Пожалуйста, заполните номер телефона.",
    PHONE_PATTERN_MISMATCH: "Пожалуйста, введите номер телефона в формате 79777777777, +79777777777, 89777777777.",
    PASSWORD_MIN_LENGTH: "Как минимум 1 заглавная буква. ",
    PASSWORD_LOWERCASE: "\nКак минимум 1 строчная буква."
} as const;

// Optimized error display functions
const showInputError = (formElement: HTMLFormElement, inputElement: HTMLInputElement, errorMessage: string): void => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`) as HTMLElement;
    if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add("popup__display-error_active");
    }
};

const hideInputError = (formElement: HTMLFormElement, inputElement: HTMLInputElement): void => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`) as HTMLElement;
    if (errorElement) {
        errorElement.textContent = "";
        errorElement.classList.remove("popup__display-error_active");
    }
};

// Optimized plural form function with memoization
const pluralCache = new Map<number, string>();
const getNoun = (number: number, one: string, two: string, five: string): string => {
    const absNumber = Math.abs(number);
    const key = absNumber;
    
    if (pluralCache.has(key)) {
        return pluralCache.get(key)!;
    }
    
    let n = absNumber % 100;
    let result: string;
    
    if (n >= 5 && n <= 20) {
        result = five;
    } else {
        n %= 10;
        if (n === 1) {
            result = one;
        } else if (n >= 2 && n <= 4) {
            result = two;
        } else {
            result = five;
        }
    }
    
    pluralCache.set(key, result);
    return result;
};

const getPluralSymbols = (number: number): string => {
    return `${number} ${getNoun(number, "символ", "символа", "символов")}`;
};

// Optimized error message handlers with better performance
const createErrorHandlers = (): ErrorHandlers => {
    const emailErrorHandler: ErrorHandler = (inputElement: HTMLInputElement): string => {
        if (inputElement.validity.typeMismatch) {
            return ERROR_MESSAGES.EMAIL_TYPE_MISMATCH;
        }
        if (inputElement.validity.valueMissing) {
            return ERROR_MESSAGES.EMAIL_VALUE_MISSING;
        }
        return inputElement.validationMessage;
    };
    
    const passwordErrorHandler: ErrorHandler = (inputElement: HTMLInputElement): string => {
        if (inputElement.validity.patternMismatch) {
            let errorMessage = inputElement.validationMessage;
            const value = inputElement.value;
            
            if (!/.{8,}/.test(value)) {
                const minLength = inputElement.getAttribute("minlength");
                if (minLength) {
                    const length = value.length;
                    const symbolsLeft = parseInt(minLength) - length;
                    errorMessage = `Как минимум ${getPluralSymbols(parseInt(minLength))}. Осталось ввести еще ${getPluralSymbols(symbolsLeft)}`;
                }
            }
            
            if (!/.*[A-ZА-Я].*/.test(value)) {
                errorMessage += ERROR_MESSAGES.PASSWORD_MIN_LENGTH;
            }
            if (!/.*[a-zа-я].*/.test(value)) {
                errorMessage += ERROR_MESSAGES.PASSWORD_LOWERCASE;
            }
            return errorMessage;
        }
        return inputElement.validationMessage;
    };
    
    const phoneNumberErrorHandler: ErrorHandler = (inputElement: HTMLInputElement): string => {
        if (inputElement.validity.valueMissing) {
            return ERROR_MESSAGES.PHONE_VALUE_MISSING;
        }
        if (inputElement.validity.patternMismatch) {
            return ERROR_MESSAGES.PHONE_PATTERN_MISMATCH;
        }
        return inputElement.validationMessage;
    };
    
    const defaultErrorHandler: ErrorHandler = (inputElement: HTMLInputElement): string => {
        return inputElement.validationMessage;
    };
    
    return {
        email: emailErrorHandler,
        phone_number: phoneNumberErrorHandler,
        password: passwordErrorHandler,
        DEFAULT: defaultErrorHandler,
    };
};

// Cache error handlers for better performance
const errorHandlers = createErrorHandlers();

const getErrorMessage = (inputElement: HTMLInputElement): string => {
    const inputName = inputElement.name;
    const errorHandler = errorHandlers[inputName] || errorHandlers['DEFAULT'];
    return errorHandler ? errorHandler(inputElement) : inputElement.validationMessage;
};

// Optimized input validation
const checkInputValidity = (formElement: HTMLFormElement, inputElement: HTMLInputElement): void => {
    const isInputNotValid = !inputElement.validity.valid;
    
    if (isInputNotValid) {
        const errorMessage = getErrorMessage(inputElement);
        showInputError(formElement, inputElement, errorMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

// Optimized validation check with early return
const hasInvalidInput = (inputList: HTMLInputElement[]): boolean => {
    for (const inputElement of inputList) {
        if (!inputElement.validity.valid) {
            return true;
        }
    }
    return false;
};

// Optimized button state toggle
const toggleButtonState = (inputList: HTMLInputElement[], buttonElement: HTMLButtonElement): void => {
    const hasInvalid = hasInvalidInput(inputList);
    
    if (hasInvalid) {
        buttonElement.classList.add("popup__button-submit_disabled");
        buttonElement.setAttribute("disabled", "true");
    } else {
        buttonElement.classList.remove("popup__button-submit_disabled");
        buttonElement.removeAttribute("disabled");
    }
};

// Optimized event listener setup with debouncing
const createDebouncedHandler = (callback: () => void, delay: number = 10): (() => void) => {
    let timeoutId: number | undefined;
    return () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = window.setTimeout(callback, delay);
    };
};

// Optimized event listeners setup
const setEventListeners = (formElement: HTMLFormElement): void => {
    const inputList = Array.from(formElement.querySelectorAll(".popup__item")) as HTMLInputElement[];
    const buttonElement = formElement.querySelector(".popup__button-submit") as HTMLButtonElement;
    
    if (!buttonElement) return;
    
    const handleInputChange = (): void => {
        // Find the current input that triggered the event
        const activeInput = inputList.find(input => input === document.activeElement);
        if (activeInput) {
            checkInputValidity(formElement, activeInput);
        }
        toggleButtonState(inputList, buttonElement);
    };
    
    const debouncedHandler = createDebouncedHandler(handleInputChange);
    
    inputList.forEach((inputElement) => {
        // Use a single handler for multiple events
        const eventHandler = (): void => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        };
        
        inputElement.addEventListener("input", eventHandler);
        inputElement.addEventListener("paste", debouncedHandler);
        inputElement.addEventListener("change", eventHandler);
        inputElement.addEventListener("keyup", eventHandler);
    });
    
    // Initial state
    toggleButtonState(inputList, buttonElement);
};

// Optimized form validation setup
const enableValidation = (): void => {
    const formElements = document.querySelectorAll(".popup__main") as NodeListOf<HTMLFormElement>;
    
    if (formElements.length === 0) return;
    
    const formList = Array.from(formElements);
    
    formList.forEach((formElement) => {
        const submitFormHandler = (event: Event): void => {
            event.preventDefault();
        };
        
        formElement.addEventListener("submit", submitFormHandler);
        setEventListeners(formElement);
    });
};

// Initialize validation when DOM is ready
const initializeValidation = (): void => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', enableValidation);
    } else {
        enableValidation();
    }
};

// Start validation
initializeValidation();