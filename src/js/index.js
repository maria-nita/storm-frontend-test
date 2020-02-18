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

function isInRange(value, lowerLimit, upperLimit) {
	return value <= upperLimit && value >= lowerLimit;
}

function addNewItem(object) {
	axios.post('http://localhost:4000/api/task', {
		title: object.titleValue,
		importance: object.priorityValue
	});
}

loaderView.renderLoader();

addItemView.renderAddItemButton();
elements.addTask = document.querySelector('.add-item__button');

elements.addTask.addEventListener('click', function() {
	
	elements.addTaskForm = document.querySelectorAll('.add-item__form');
	if (elements.addTaskForm.length !== 1) {

		addItemView.renderAddItemForm();
		elements.titleError = document.querySelector('.add-item__form-group--title-error');
		elements.priorityError = document.querySelector('.add-item__form-group--priority-error');
		elements.submitTaskForm = document.querySelector('.add-item__submit');
		const newItem = {
			titleField: document.querySelector('#new-title'),
			priorityField: document.querySelector('#new-priority'),
			titleValue: '',
			priorityValue: ''
		}
		
		if (elements.submitTaskForm !== null) {
			elements.submitTaskForm.addEventListener('click', function() {

				newItem.titleValue = readFormData(newItem.titleField);
				newItem.priorityValue = parseFloat(readFormData(newItem.priorityField));

				var errorArray = [];
				
				if (newItem.titleValue === '') {
					newItem.titleField.classList.add('error');
					elements.titleError.classList.remove('hidden');
					errorArray.push('title error');
				}
				if (!Number.isInteger(newItem.priorityValue) || !isInRange(newItem.priorityValue, 0, 2)) {
					newItem.priorityField.classList.add('error');
					elements.priorityError.classList.remove('hidden');
					errorArray.push('priority error');
				}

				if (errorArray.length === 0) {
					addNewItem(newItem);
					addItemView.clearAddItemForm();
					taskListView.clearTasks();
					renderTasksList();
				}
				
			});
		}
	}
});

function processData(data) {
	apiTasks = data;
	if (apiTasks) {
		apiTasks.forEach(function(task) {
			if (task.title && task.importance !== '') {
				var checkedStatus, priority;
				if (task.importance == 0) {
					priority = "high";
				} else if (task.importance == 1) {
					priority = "medium";
				} else if (task.importance == 2) {
					priority = "low";
				}
				if (task.isDone === "true") {
					checkedStatus = 'checked';
				} else if (task.isDone === "false") {
					checkedStatus = '';
				}
				taskListView.renderTasks(task, checkedStatus, priority);
				loaderView.clearLoader();
			}
		});
	} else {
		clearLoader();
		errorMessageView.renderErrorMessage();
	}
}

function updateStatus() {
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
}

function renderTasksList() {
	getData().then(processData).finally(updateStatus);
}

renderTasksList();

