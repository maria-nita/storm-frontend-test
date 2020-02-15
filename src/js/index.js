import axios from 'axios';

var apiTasks;

const elements = {
	taskList: document.querySelector('.task-list')
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

function renderTitle(value) {
	const markup = `<h2>${value}</h2>`;
	elements.taskList.insertAdjacentHTML('beforeend', markup);
}

getData().then(data => {
	apiTasks = data;
	if (apiTasks) {
		apiTasks.forEach(function(task) {
			if (task.title) {
				renderTitle(task.title);
			}
		});
	}
});


