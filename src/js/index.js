import axios from 'axios';
import '../css/index.scss';

import { elements } from './views/base';

import * as taskListView from './views/taskListView';
import * as errorMessageView from './views/errorMessageView';
import * as loaderView from './views/loaderView';

var apiTasks;

async function getData() {
	try {
		const resultAPI = await axios('http://localhost:4000/api/task');
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
				taskListView.renderTitle(task);
				loaderView.clearLoader();
			}
		});
	} else {
		clearLoader();
		errorMessageView.renderErrorMessage();
	}
});




