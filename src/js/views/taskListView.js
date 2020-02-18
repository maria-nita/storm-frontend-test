import { elements } from './base';

export const renderTasks = (item, status, priority) => {
	const markup = `
	<div class="task-list__task task-list__task--priority-${item.importance}">
		<input type="checkbox" data-api-id="${item.id}" id="${item.title}" name="${item.title}" ${status}>
		<label for="${item.title}">${item.title} (Priority: ${priority})</label>
	</div>
	`;
	elements.taskList.insertAdjacentHTML('beforeend', markup);
}

export const clearTasks = () => {
	const tasks = document.querySelectorAll('.task-list__task');
	if (tasks) {
		tasks.forEach(task => task.parentElement.removeChild(task));
	}
}