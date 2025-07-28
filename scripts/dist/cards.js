// Card data with readonly properties for immutability
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
        id: 'arkhyz'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        id: 'chelyabinsk-oblast'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        id: 'ivanovo'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        id: 'kamchatka'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
        id: 'kholmogorsky-rayon'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
        id: 'baikal'
    }
];
// Utility functions for card management
const createCard = (name, link, id) => ({
    name,
    link,
    id: id || generateCardId(name)
});
const generateCardId = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};
const validateCard = (card) => {
    return typeof card.name === 'string' &&
        typeof card.link === 'string' &&
        card.name.trim().length > 0 &&
        card.link.trim().length > 0;
};
// Export for use in other modules
export { initialCards, createCard, validateCard };
