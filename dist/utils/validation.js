/**
 * Shows input error message
 */
export const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add("popup__display-error_active");
    }
};
/**
 * Hides input error message
 */
export const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (errorElement) {
        errorElement.textContent = "";
        errorElement.classList.remove("popup__display-error_active");
    }
};
/**
 * Gets the correct noun form based on number
 */
export const getNoun = (number, one, two, five) => {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return five;
    }
    n %= 10;
    if (n === 1) {
        return one;
    }
    if (n >= 2 && n <= 4) {
        return two;
    }
    return five;
};
/**
 * Gets plural form for symbols
 */
export const getPluralSymbols = (number) => {
    return `${number} ${getNoun(number, "символ", "символа", "символов")}`;
};
/**
 * Error handler for email inputs
 */
const emailErrorHandler = (inputElement) => {
    if (inputElement.validity.typeMismatch) {
        return "Пожалуйста, введите корректный e-mail";
    }
    if (inputElement.validity.valueMissing) {
        return "Пожалуйста, заполните поле с e-mail";
    }
    return inputElement.validationMessage;
};
/**
 * Error handler for password inputs
 */
const passwordErrorHandler = (inputElement) => {
    if (inputElement.validity.patternMismatch) {
        let errorMessage = inputElement.validationMessage;
        // More detailed message:
        if (!/.{8,}/.test(inputElement.value)) {
            const length = inputElement.value.length;
            const minLength = inputElement.getAttribute("minlength");
            if (minLength) {
                const symbolsLeft = parseInt(minLength) - length;
                errorMessage = `Как минимум ${getPluralSymbols(parseInt(minLength))}. Осталось ввести еще ${getPluralSymbols(symbolsLeft)}`;
            }
        }
        if (!/.*[A-ZА-Я].*/.test(inputElement.value)) {
            errorMessage = "\nКак минимум 1 заглавная буква. ";
        }
        if (!/.*[a-zа-я].*/.test(inputElement.value)) {
            errorMessage = "\nКак минимум 1 строчная буква.";
        }
        return errorMessage;
    }
    return inputElement.validationMessage;
};
/**
 * Error handler for phone number inputs
 */
const phoneNumberErrorHandler = (inputElement) => {
    if (inputElement.validity.valueMissing) {
        return "Пожалуйста, заполните номер телефона.";
    }
    if (inputElement.validity.patternMismatch) {
        return "Пожалуйста, введите номер телефона в формате 79777777777, +79777777777, 89777777777.";
    }
    return inputElement.validationMessage;
};
/**
 * Default error handler
 */
const defaultErrorHandler = (inputElement) => {
    return inputElement.validationMessage;
};
/**
 * Error handlers mapping
 */
const errorHandlers = {
    email: emailErrorHandler,
    phone_number: phoneNumberErrorHandler,
    password: passwordErrorHandler,
    DEFAULT: defaultErrorHandler,
};
/**
 * Gets appropriate error message for input element
 */
export const getErrorMessage = (inputElement) => {
    const inputName = inputElement.name;
    const errorHandler = errorHandlers[inputName] || errorHandlers.DEFAULT;
    return errorHandler ? errorHandler(inputElement) : inputElement.validationMessage;
};
/**
 * Checks input validity and shows/hides error message
 */
export const checkInputValidity = (formElement, inputElement) => {
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
        const errorMessage = getErrorMessage(inputElement);
        showInputError(formElement, inputElement, errorMessage);
    }
    else {
        hideInputError(formElement, inputElement);
    }
};
/**
 * Checks if any input in the list is invalid
 */
export const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
};
/**
 * Toggles button state based on form validity
 */
export const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add("popup__button-submit_disabled");
        buttonElement.setAttribute("disabled", "true");
    }
    else {
        buttonElement.classList.remove("popup__button-submit_disabled");
        buttonElement.removeAttribute("disabled");
    }
};
/**
 * Sets event listeners for form validation
 */
export const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".popup__item"));
    const buttonElement = formElement.querySelector(".popup__button-submit");
    if (!buttonElement)
        return;
    inputList.forEach((inputElement) => {
        const handleInputChange = () => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        };
        inputElement.addEventListener("input", handleInputChange);
        inputElement.addEventListener("paste", (evt) => {
            // Use setTimeout to ensure the pasted content is processed
            setTimeout(() => {
                checkInputValidity(formElement, inputElement);
                toggleButtonState(inputList, buttonElement);
            }, 10);
        });
        inputElement.addEventListener("change", handleInputChange);
        inputElement.addEventListener("keyup", handleInputChange);
    });
    toggleButtonState(inputList, buttonElement);
};
/**
 * Enables validation for all forms
 */
export const enableValidation = () => {
    const formElements = document.querySelectorAll(".popup__main");
    const formList = Array.from(formElements);
    const formListIterator = (formElement) => {
        const submitFormHandler = (event) => {
            event.preventDefault();
        };
        formElement.addEventListener("submit", submitFormHandler);
        setEventListeners(formElement);
    };
    formList.forEach(formListIterator);
};
//# sourceMappingURL=validation.js.map