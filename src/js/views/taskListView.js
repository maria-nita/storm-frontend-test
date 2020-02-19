import { elements } from './base';

export const renderTasks = (item, status, priority) => {
	const markup = `
	<div class="task-list__task task-list__task--priority-${item.importance}" data-api-id="${item.id}">
		<input type="checkbox" id="${formatName(item.title)}" name="${formatName(item.title)}" ${status}>
		<label for="${formatName(item.title)}">${item.title} (Priority: ${priority})</label>
		<button type="button" class="task-list__delete-task">Delete</button>
	</div>
	`;
	elements.taskList.insertAdjacentHTML('beforeend', markup);
}

export const clearTasks = () => {
	const tasks = document.querySelectorAll('.task-list__task');
	if (tasks.length >= 1) {
		tasks.forEach(task => task.parentElement.removeChild(task));
	}
}

function formatName(value) {
	var valueSeparated = value.split(' ');
	var valueReconstructed = valueSeparated.join('-');
	return valueReconstructed;
}