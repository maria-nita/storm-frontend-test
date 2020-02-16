import { elements } from './base';

export const renderLoader = () => {
	const loader = `
		<div class="loader">
			<div class="loader__spinner"></div>
        </div>
    `;
    elements.taskList.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
	const loader = document.querySelector('.loader');
	if (loader) {
		loader.parentElement.removeChild(loader);
	}
}