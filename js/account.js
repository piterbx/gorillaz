let accountDataDiv;

const accountManagement = () => {
    if ($logged !== 'true') window.location = '/login.html';
    prepareAccountDOMElements();
    prepareAccountDOMEvents();
}

const prepareAccountDOMElements = () => {
    accountDataDiv = document.querySelector('.account-data');
}

const prepareAccountDOMEvents = () => {

}

document.addEventListener('DOMContentLoaded', accountManagement);