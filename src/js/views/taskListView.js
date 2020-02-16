import { elements } from './base';

export const renderTitle = item=> {
	const markup = `
	<div class="task-list__task task-list__task--priority-${item.importance}">
		<input type="checkbox" id="${item.title}" name="${item.title}">
		<label for="${item.title}">${item.title}</label>
	</div>
	`;
	elements.taskList.insertAdjacentHTML('beforeend', markup);
}