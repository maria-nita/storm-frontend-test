import axios from 'axios';
import '../css/index.scss';

var apiTasks;

const elements = {
	taskList: document.querySelector('.task-list'),
	tasks: ''
}

async function getData() {
	try {
		const resultAPI = await axios('http://localhost:4000/api/task');
		const data = resultAPI.data;
		return data;
	} catch(error) {
		alert(error);
	}
}

function renderTitle(value, priority) {
	const markup = `
	<div class="task-list__task task-list__task--priority-${priority}">
		<input type="checkbox" id="${value}" name="${value}">
		<label for="${value}">${value}</label>
	</div>	
	`;
	elements.taskList.insertAdjacentHTML('beforeend', markup);
}

getData().then(data => {
	apiTasks = data;
	if (apiTasks) {
		apiTasks.forEach(function(task) {
			if (task.title && task.importance !== '') {
				renderTitle(task.title, task.importance);
			}
		});
	}
});




