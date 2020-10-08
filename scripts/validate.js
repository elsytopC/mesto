const allClassesData = {
    formSelector: '.popup__main',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: '.popup__button-submit_disabled',
    inputErrorClass: '.popup__display-error',
    errorClass: 'popup__display-error_active',
    inputWrong: 'popup__input-container_is-wrong'
};

const showInputError = (formElement, inputItem, errorMessage, allClasses) => {
    const errorElement = formElement.querySelector(`#${inputItem.id}-error`);
    errorElement.textContent = errorMessage;

    inputItem.classList.add(inputErrorClass, allClasses);
    errorElement.classList.add(errorClass);
};

const hideInputErrror = (formElement, inputItem, allClasses) => {
    const errorElement = formElement.querySelector(`#${inputItem.id}-error`);
    errorElement.textContent = '';

    errorElement.classList.remove(allClasses.errorClass);
};

const checkInputValidity = (formElement, inputItem, allClasses) => {
    const isInputNotValid = !inputItem.validity.valid;
    if (isInputNotValid) {
        const errorMessage = inputItem.validationMessage
        inputItem.classList.add(allClasses.inputWrong);
        showInputError(formElement, inputItem, errorMessage, allClasses);
    } else {
        hideInputErrror(formElement, inputItem, allClasses);
        inputItem.classList.remove(allClasses.inputWrong);
    }
}

const toggleButtonState = function (inputList, buttonElements, allClasses) {
    const hasValidInput = inputList.some((inputElement) => !inputElement.validity.valid);

    if (hasValidInput) {
        buttonElements.forEach((buttonElements) => {
            buttonElements.classList.add(allClasses.inactiveButtonClass);
            buttonElements.disabled = false;
        })
    } else {
        buttonElements.forEach((buttonElements) => {
            buttonElements.classList.remove(allClasses.inactiveButtonClass);
            buttonElements.disabled = true;
        })
    }
}

const setEventListeners = (formElement, allClasses) => {
    const inputList = Array.from(formElement.querySelectorAll(allClasses.inputSelector));
    const buttonElements = Array.from(document.querySelectorAll(allClasses.submitButtonSelector));

    inputList.forEach((inputItem) => {
        inputItem.addEventListener('input', () => {
            checkInputValidity(formElement, inputItem, allClasses)
            toggleButtonState(inputList, buttonElements, allClasses)
        })
    })
}

const enableValidation = (allClasses) => {
    const formList = Array.from(document.querySelectorAll(allClasses.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (e) => {
            e.preventDefault()
        })
        setEventListeners(formElement, allClasses)
    })
}

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation(allClassesData);

