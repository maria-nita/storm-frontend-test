import '../css/index.scss';

import { elements } from './views/base';

import * as taskListView from './views/taskListView';
import * as loaderView from './views/loaderView';
import * as addItemView from './views/addItemView';

import Tasks from './models/Tasks';

var taskLogic = new Tasks();

function readFormData(element) {
	var inputValue = element.value;
	return inputValue;
}

function isInRange(value, lowerLimit, upperLimit) {
	return value <= upperLimit && value >= lowerLimit;
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

				newItem.titleField.classList.remove('error');
				elements.titleError.classList.add('hidden');
				newItem.priorityField.classList.remove('error');
				elements.priorityError.classList.add('hidden');

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
					taskLogic.addNewItem(newItem);
					addItemView.clearAddItemForm();
					taskListView.clearTasks();
					taskLogic.renderTasksList();
				}
				
			});
		}
	}
});

taskLogic.renderTasksList();

