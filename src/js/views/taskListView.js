import { elements } from './base';

export const renderTitle = (item, status) => {
	const markup = `
	<div class="task-list__task task-list__task--priority-${item.importance}">
		<input type="checkbox" data-api-id="${item.id}" id="${item.title}" name="${item.title}" ${status}>
		<label for="${item.title}">${item.title}</label>
	</div>
	`;
	elements.taskList.insertAdjacentHTML('beforeend', markup);
}