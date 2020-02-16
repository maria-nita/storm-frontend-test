import axios from 'axios';
import '../css/index.scss';

import { elements } from './views/base';

import * as taskListView from './views/taskListView';
import * as errorMessageView from './views/errorMessageView';
import * as loaderView from './views/loaderView';

var apiTasks;

async function getData() {
	try {
		const resultAPI = await axios.get('http://localhost:4000/api/task');
		const data = resultAPI.data;
		return data;
	} catch(error) {
		alert(error);
		loaderView.clearLoader();
		errorMessageView.renderErrorMessage();
	}
}

loaderView.renderLoader();

getData().then(data => {
	apiTasks = data;
	if (apiTasks) {
		apiTasks.forEach(function(task) {
			if (task.title && task.importance !== '') {
				var checkedStatus;
				if (task.isDone === "true") {
					checkedStatus = 'checked';
				} else if (task.isDone === "false") {
					checkedStatus = '';
				}
				taskListView.renderTitle(task, checkedStatus);
				loaderView.clearLoader();
			}
		});
	} else {
		clearLoader();
		errorMessageView.renderErrorMessage();
	}
}).then(function() {
	elements.tasks = document.querySelectorAll('.task-list__task');
	if (elements.tasks !== '') {
		const checkboxes = document.querySelectorAll('input[type="checkbox"]');
		checkboxes.forEach(function(input) {
			input.addEventListener('change', function() {
				if (this.checked) {
					axios.patch(`http://localhost:4000/api/task/${input.dataset.apiId}`, {
						isDone: "true"
					});
				} else {
					axios.patch(`http://localhost:4000/api/task/${input.dataset.apiId}`, {
						isDone: "false"
					});
				}
			});
		})
	}
});




