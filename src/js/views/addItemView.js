import { elements } from './base';

export const renderAddItemButton = () => {
    const btn = `<p><button class="add-item__button">Add item</button></p>`;
    elements.taskHeader.insertAdjacentHTML("beforeend", btn);
}

export const renderAddItemForm = () => {
    const form = `
        <div class="add-item__form">
            <div class="add-item__form-group">
                <label for="new-title">Task title</label>
                <input type="text" id="new-title" name="new-title">
            </div>
            <div class="add-item__form-group">
                <label for="new-priority">Importance level</label>
                <input type="number" id="new-priority" name="new-priority">
            </div>
            <div class="add-item__form-group">
                <button class="add-item__submit">Submit</button>
            </div>
        </div>
    `;
    elements.wrapper.insertAdjacentHTML("beforeend", form);
}

export const clearAddItemForm = () => {
    const form = document.querySelector('.add-item__form');
	if (form) {
		form.parentElement.removeChild(form);
	}
}
