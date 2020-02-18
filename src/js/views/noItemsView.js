import { elements } from './base';

export const renderNoItemsMessage = () => {
    const message = `<p class="no-tasks">You have no items in your to do list.</p>`;
    elements.wrapper.insertAdjacentHTML('beforeend', message);
}

export const clearNoItemsMessage = () => {
    const message = document.querySelector('.no-tasks');
    if (message) {
        message.parentElement.removeChild(message);
    }
}