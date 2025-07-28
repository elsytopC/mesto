// Types and interfaces
interface ValidationConfig {
    minLength?: number;
    pattern?: RegExp;
    errorMessages: {
        typeMismatch?: string;
        valueMissing?: string;
        patternMismatch?: string;
        custom?: string;
    };
}

interface ErrorHandler {
    (inputElement: HTMLInputElement): string;
}

// Validation configurations
const VALIDATION_CONFIGS: Record<string, ValidationConfig> = {
    email: {
        errorMessages: {
            typeMismatch: "Пожалуйста, введите корректный e-mail",
            valueMissing: "Пожалуйста, заполните поле с e-mail"
        }
    },
    phone_number: {
        pattern: /^(\+?7|8)?\d{10}$/,
        errorMessages: {
            valueMissing: "Пожалуйста, заполните номер телефона.",
            patternMismatch: "Пожалуйста, введите номер телефона в формате 79777777777, +79777777777, 89777777777."
        }
    },
    password: {
        minLength: 8,
        pattern: /^(?=.*[A-ZА-Я])(?=.*[a-zа-я]).{8,}$/,
        errorMessages: {
            patternMismatch: "Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы"
        }
    }
};

// Utility functions
const getNoun = (number: number, one: string, two: string, five: string): string => {
    const n = Math.abs(number) % 100;
    if (n >= 5 && n <= 20) return five;
    
    const lastDigit = n % 10;
    if (lastDigit === 1) return one;
    if (lastDigit >= 2 && lastDigit <= 4) return two;
    return five;
};

const getPluralSymbols = (number: number): string => {
    return `${number} ${getNoun(number, "символ", "символа", "символов")}`;
};

// Error display functions
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

// Error message generators
const createErrorHandlers = (): Record<string, ErrorHandler> => {
    const handlers: Record<string, ErrorHandler> = {
        email: (inputElement: HTMLInputElement): string => {
            const config = VALIDATION_CONFIGS.email;
            if (inputElement.validity.typeMismatch) {
                return config.errorMessages.typeMismatch || inputElement.validationMessage;
            }
            if (inputElement.validity.valueMissing) {
                return config.errorMessages.valueMissing || inputElement.validationMessage;
            }
            return inputElement.validationMessage;
        },
        
        phone_number: (inputElement: HTMLInputElement): string => {
            const config = VALIDATION_CONFIGS.phone_number;
            if (inputElement.validity.valueMissing) {
                return config.errorMessages.valueMissing || inputElement.validationMessage;
            }
            if (inputElement.validity.patternMismatch) {
                return config.errorMessages.patternMismatch || inputElement.validationMessage;
            }
            return inputElement.validationMessage;
        },
        
        password: (inputElement: HTMLInputElement): string => {
            const config = VALIDATION_CONFIGS.password;
            if (inputElement.validity.patternMismatch) {
                const value = inputElement.value;
                const minLength = config.minLength || 8;
                
                let errorMessage = config.errorMessages.patternMismatch || inputElement.validationMessage;
                
                if (value.length < minLength) {
                    const symbolsLeft = minLength - value.length;
                    errorMessage = `Как минимум ${getPluralSymbols(minLength)}. Осталось ввести еще ${getPluralSymbols(symbolsLeft)}`;
                }
                
                if (!/.*[A-ZА-Я].*/.test(value)) {
                    errorMessage += "\nКак минимум 1 заглавная буква.";
                }
                
                if (!/.*[a-zа-я].*/.test(value)) {
                    errorMessage += "\nКак минимум 1 строчная буква.";
                }
                
                return errorMessage;
            }
            return inputElement.validationMessage;
        },
        
        DEFAULT: (inputElement: HTMLInputElement): string => {
            return inputElement.validationMessage;
        }
    };
    
    return handlers;
};

// Validation functions
const getErrorMessage = (inputElement: HTMLInputElement): string => {
    const errorHandlers = createErrorHandlers();
    const inputName = inputElement.name;
    const handler = errorHandlers[inputName] || errorHandlers.DEFAULT;
    return handler(inputElement);
};

const checkInputValidity = (formElement: HTMLFormElement, inputElement: HTMLInputElement): void => {
    const isValid = inputElement.validity.valid;
    
    if (!isValid) {
        const errorMessage = getErrorMessage(inputElement);
        showInputError(formElement, inputElement, errorMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList: HTMLInputElement[]): boolean => {
    return inputList.some(inputElement => !inputElement.validity.valid);
};

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

// Event handling with debouncing for better performance
const createDebouncedHandler = (handler: Function, delay: number = 10): Function => {
    let timeoutId: number;
    return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => handler(...args), delay);
    };
};

const setEventListeners = (formElement: HTMLFormElement): void => {
    const inputList = Array.from(formElement.querySelectorAll(".popup__item")) as HTMLInputElement[];
    const buttonElement = formElement.querySelector(".popup__button-submit") as HTMLButtonElement;
    
    if (!buttonElement) return;
    
    const handleInputChange = (inputElement: HTMLInputElement): void => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
    };
    
    const debouncedHandler = createDebouncedHandler(handleInputChange);
    
    inputList.forEach((inputElement) => {
        // Real-time validation
        inputElement.addEventListener("input", () => handleInputChange(inputElement));
        inputElement.addEventListener("change", () => handleInputChange(inputElement));
        inputElement.addEventListener("keyup", () => handleInputChange(inputElement));
        
        // Debounced validation for paste events
        inputElement.addEventListener("paste", () => debouncedHandler(inputElement));
    });
    
    // Initial state
    toggleButtonState(inputList, buttonElement);
};

// Form submission handler
const createSubmitHandler = (formElement: HTMLFormElement): (event: Event) => void => {
    return (event: Event): void => {
        event.preventDefault();
        // Form submission logic can be added here
    };
};

// Main validation setup
const enableValidation = (): void => {
    const formElements = document.querySelectorAll(".popup__main") as NodeListOf<HTMLFormElement>;
    
    if (formElements.length === 0) return;
    
    Array.from(formElements).forEach((formElement) => {
        const submitHandler = createSubmitHandler(formElement);
        formElement.addEventListener("submit", submitHandler);
        setEventListeners(formElement);
    });
};

// Initialize validation when DOM is ready
const initValidation = (): void => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', enableValidation);
    } else {
        enableValidation();
    }
};

// Start validation
initValidation();