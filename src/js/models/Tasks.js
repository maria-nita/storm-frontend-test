import axios from 'axios';
import { elements } from '../views/base';

import * as taskListView from '../views/taskListView';
import * as errorMessageView from '../views/errorMessageView';
import * as loaderView from '../views/loaderView';
import * as noItemsView from '../views/noItemsView';

export default class Tasks {
    async getData() {
        try {
            const resultAPI = await axios.get('http://localhost:4000/api/task');
            const data = resultAPI.data;
            return data;
        } catch(error) {
            alert(error);
            loaderView.clearLoader();
            noItemsView.clearNoItemsMessage();
            errorMessageView.renderErrorMessage();
        }
    }
    addNewItem(object) {
        axios.post('http://localhost:4000/api/task', {
            title: object.titleValue,
            importance: object.priorityValue
        });
    }
    processData(data) {
        var apiTasks;
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
                    noItemsView.clearNoItemsMessage();
                    loaderView.clearLoader();
                }
            });
        } else if (apiTasks.length === 0) {
            console.log('here1');
            loaderView.clearLoader();
            noItemsView.renderNoItemsMessage();
        } else {
            loaderView.clearLoader();
            errorMessageView.renderErrorMessage();
        }
    }
    updateStatus() {
        elements.tasks = document.querySelectorAll('.task-list__task');

        if (elements.tasks !== '' && elements.tasks.length >= 1) {
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');

            checkboxes.forEach(function(input) {
                input.addEventListener('change', function() {
                    if (this.checked) {
                        axios.patch(`http://localhost:4000/api/task/${input.parentElement.dataset.apiId}`, {
                            isDone: "true"
                        });
                    } else {
                        axios.patch(`http://localhost:4000/api/task/${input.parentElement.dataset.apiId}`, {
                            isDone: "false"
                        });
                    }
                });
            })

            elements.tasks.forEach(function(item) {
                const deleteButton = item.querySelector('.task-list__delete-task');
                deleteButton.addEventListener('click',  function() {
                    axios.delete(`http://localhost:4000/api/task/${item.dataset.apiId}`);
                    item.parentElement.removeChild(item);

                    if (elements.tasks.length === 0) {
                        noItemsView.renderNoItemsMessage();
                    }
                });
            });
        }
    }
    renderTasksList() {
        this.getData().then(this.processData).finally(this.updateStatus);
    }
}