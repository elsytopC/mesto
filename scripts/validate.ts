// Utility functions for form validation
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

// Russian pluralization helper
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

// Error message handlers
const errorHandlers = {
    email: (inputElement: HTMLInputElement): string => {
        if (inputElement.validity.typeMismatch) {
            return "Пожалуйста, введите корректный e-mail";
        }
        if (inputElement.validity.valueMissing) {
            return "Пожалуйста, заполните поле с e-mail";
        }
        return inputElement.validationMessage;
    },
    
    phone_number: (inputElement: HTMLInputElement): string => {
        if (inputElement.validity.valueMissing) {
            return "Пожалуйста, заполните номер телефона.";
        }
        if (inputElement.validity.patternMismatch) {
            return "Пожалуйста, введите номер телефона в формате 79777777777, +79777777777, 89777777777.";
        }
        return inputElement.validationMessage;
    },
    
    password: (inputElement: HTMLInputElement): string => {
        if (inputElement.validity.patternMismatch) {
            const errors: string[] = [];
            
            if (!/.{8,}/.test(inputElement.value)) {
                const minLength = inputElement.getAttribute("minlength");
                if (minLength) {
                    const length = inputElement.value.length;
                    const symbolsLeft = parseInt(minLength) - length;
                    errors.push(`Как минимум ${getPluralSymbols(parseInt(minLength))}. Осталось ввести еще ${getPluralSymbols(symbolsLeft)}`);
                }
            }
            if (!/.*[A-ZА-Я].*/.test(inputElement.value)) {
                errors.push("Как минимум 1 заглавная буква.");
            }
            if (!/.*[a-zа-я].*/.test(inputElement.value)) {
                errors.push("Как минимум 1 строчная буква.");
            }
            return errors.join("\n");
        }
        return inputElement.validationMessage;
    },
    
    DEFAULT: (inputElement: HTMLInputElement): string => inputElement.validationMessage
};

const getErrorMessage = (inputElement: HTMLInputElement): string => {
    const handler = errorHandlers[inputElement.name as keyof typeof errorHandlers] || errorHandlers.DEFAULT;
    return handler(inputElement);
};

const checkInputValidity = (formElement: HTMLFormElement, inputElement: HTMLInputElement): void => {
    if (!inputElement.validity.valid) {
        const errorMessage = getErrorMessage(inputElement);
        showInputError(formElement, inputElement, errorMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList: HTMLInputElement[]): boolean => {
    return inputList.some(input => !input.validity.valid);
};

const toggleButtonState = (inputList: HTMLInputElement[], buttonElement: HTMLButtonElement): void => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add("popup__button-submit_disabled");
        buttonElement.setAttribute("disabled", "true");
    } else {
        buttonElement.classList.remove("popup__button-submit_disabled");
        buttonElement.removeAttribute("disabled");
    }
};

const setEventListeners = (formElement: HTMLFormElement): void => {
    const inputList = Array.from(formElement.querySelectorAll(".popup__item")) as HTMLInputElement[];
    const buttonElement = formElement.querySelector(".popup__button-submit") as HTMLButtonElement;
    
    if (!buttonElement) return;
    
    inputList.forEach((inputElement) => {
        const handleInputChange = (): void => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        };
        
        inputElement.addEventListener("input", handleInputChange);
        inputElement.addEventListener("paste", () => {
            setTimeout(handleInputChange, 10);
        });
        inputElement.addEventListener("change", handleInputChange);
        inputElement.addEventListener("keyup", handleInputChange);
    });
    
    toggleButtonState(inputList, buttonElement);
};

const enableValidation = (): void => {
    const formElements = document.querySelectorAll(".popup__main") as NodeListOf<HTMLFormElement>;
    
    formElements.forEach((formElement) => {
        formElement.addEventListener("submit", (event: Event) => {
            event.preventDefault();
        });
        setEventListeners(formElement);
    });
};

// Initialize validation
enableValidation();