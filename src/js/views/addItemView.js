import { elements } from './base';

export const renderAddItemButton = () => {
    const btn = `<button class="add-item__button">Add item</button>`;
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
                <input type="text" id="new-priority" name="new-priority">
            </div>
        </div>
    `;
    elements.wrapper.insertAdjacentHTML("beforeend", form);
}
