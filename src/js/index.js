import axios from 'axios';
import '../css/index.scss';

import { elements } from './views/base';

import * as taskListView from './views/taskListView';
import * as errorMessageView from './views/errorMessageView';
import * as loaderView from './views/loaderView';
import * as addItemView from './views/addItemView';

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

function readFormData(element) {
	var inputValue = element.value;
	return inputValue;
}

loaderView.renderLoader();

addItemView.renderAddItemButton();
elements.addTask = document.querySelector('.add-item__button');
elements.addTask.addEventListener('click', function() {
	
	elements.addTaskForm = document.querySelectorAll('.add-item__form');
	if (elements.addTaskForm.length !== 1) {

		addItemView.renderAddItemForm();

		elements.submitTaskForm = document.querySelector('.add-item__submit');
		const newItem = {
			titleField: document.querySelector('#new-title'),
			priorityField: document.querySelector('#new-priority'),
			titleValue: '',
			priorityValue: ''
		}
		
		console.log(newItem.id, newItem.titleField, newItem.priorityField);

		if (elements.submitTaskForm !== null) {
			elements.submitTaskForm.addEventListener('click', function() {
				//front end validation TO DO

				newItem.titleValue = readFormData(newItem.titleField);
				newItem.priorityValue = readFormData(newItem.priorityField);
				axios.post('http://localhost:4000/api/task', {
					title: newItem.titleValue,
					importance: newItem.priorityValue
				});
				addItemView.clearAddItemForm();
			});
		}
	}
});

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



