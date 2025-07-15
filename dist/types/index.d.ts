export interface Card {
    name: string;
    link: string;
}
export interface ValidationError {
    message: string;
    isActive: boolean;
}
export interface PopupConfig {
    element: HTMLElement;
    openButton?: HTMLElement;
    closeButton?: HTMLElement;
}
export interface FormInput {
    element: HTMLInputElement;
    errorElement: HTMLElement;
    validationRules: ValidationRule[];
}
export interface ValidationRule {
    type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'url';
    value?: string | number | RegExp;
    message: string;
}
export type EventHandler<T = Event> = (event: T) => void;
export type CardClickHandler = (card: Card) => void;
export type FormSubmitHandler = (formData: FormData) => void;
export interface ProfileData {
    name: string;
    profession: string;
}
export interface DOMElements {
    popup: HTMLElement;
    popupWindow: HTMLElement[];
    mainProfile: HTMLElement;
    popupOpenButton: HTMLElement;
    popupClose: HTMLElement;
    profileAuthor: HTMLElement;
    profileDetail: HTMLElement;
    popupHeading: HTMLInputElement;
    popupSubHeading: HTMLInputElement;
    mainForm: HTMLFormElement;
    popupPhoto: HTMLElement;
    cardsContainer: HTMLElement;
    sampleTemplate: DocumentFragment;
    popupAddForm: HTMLFormElement;
    popupAllInputs: HTMLInputElement[];
    popupInputPublish: HTMLButtonElement;
    popupAllErrors: HTMLElement[];
    submitButton: HTMLButtonElement;
    allClose: HTMLElement[];
    allSubmitButtons: HTMLButtonElement[];
    popupPlusButton: HTMLElement;
    popupMainPlusButton: HTMLElement;
    popupPlusClose: HTMLElement;
    popupPlusTitle: HTMLInputElement;
    popupPlusLink: HTMLInputElement;
    popupPlusCreate: HTMLButtonElement;
    popupPlusContents: HTMLFormElement;
    popupImageZoom: HTMLElement;
    popupImageClose: HTMLElement;
}
//# sourceMappingURL=index.d.ts.map