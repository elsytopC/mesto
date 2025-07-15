const showInputError = (formElement: HTMLFormElement, inputElement: HTMLInputElement, errorMessage: string): void => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`) as HTMLElement;
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__display-error_active");
};

const hideInputError = (formElement: HTMLFormElement, inputElement: HTMLInputElement): void => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`) as HTMLElement;
    errorElement.textContent = "";
    errorElement.classList.remove("popup__display-error_active");
};

const getNoun = (number: number, one: string, two: string, five: string): string => {
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

const getPluralSymbols = (number: number): string => {
    return `${number} ${getNoun(number, "символ", "символа", "символов")}`;
};

const getErrorMessage = (inputElement: HTMLInputElement): string => {
    const emailErrorHandler = (inputElement: HTMLInputElement): string => {
        if (inputElement.validity.typeMismatch) {
            return "Пожалуйста, введите корректный e-mail";
        }
        if (inputElement.validity.valueMissing) {
            return "Пожалуйста, заполните поле с e-mail";
        }
        return inputElement.validationMessage;
    };
    
    const passwordErrorHandler = (inputElement: HTMLInputElement): string => {
        if (inputElement.validity.patternMismatch) {
            let errorMessage = inputElement.validationMessage;
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
    
    const phoneNumberErrorHandler = (inputElement: HTMLInputElement): string => {
        if (inputElement.validity.valueMissing) {
            return "Пожалуйста, заполните номер телефона.";
        }
        if (inputElement.validity.patternMismatch) {
            return "Пожалуйста, введите номер телефона в формате 79777777777, +79777777777, 89777777777.";
        }
        return inputElement.validationMessage;
    };
    
    const defaultErrorHandler = (inputElement: HTMLInputElement): string => {
        return inputElement.validationMessage;
    };
    
    const errorHandlers: Record<string, (inputElement: HTMLInputElement) => string> = {
        email: emailErrorHandler,
        phone_number: phoneNumberErrorHandler,
        password: passwordErrorHandler,
        DEFAULT: defaultErrorHandler,
    };
    
    const inputName = inputElement.name;
    const errorHandler = errorHandlers[inputName] || errorHandlers.DEFAULT;
    return errorHandler(inputElement);
};

const checkInputValidity = (formElement: HTMLFormElement, inputElement: HTMLInputElement): void => {
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
        const errorMessage = getErrorMessage(inputElement);
        showInputError(formElement, inputElement, errorMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList: HTMLInputElement[]): boolean => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
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
    
    inputList.forEach((inputElement) => {
        const handleInputChange = (): void => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        };
        
        inputElement.addEventListener("input", handleInputChange);
        inputElement.addEventListener("paste", (evt: Event) => {
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

const enableValidation = (): void => {
    const formElements = document.querySelectorAll(".popup__main") as NodeListOf<HTMLFormElement>;
    const formList = Array.from(formElements);
    
    const formListIterator = (formElement: HTMLFormElement): void => {
        const submitFormHandler = (event: Event): void => {
            event.preventDefault();
        };
        formElement.addEventListener("submit", submitFormHandler);
        setEventListeners(formElement);
    };
    
    formList.forEach(formListIterator);
};

enableValidation();