import { elements } from './base';

export const renderErrorMessage = () => {
	const error = `<p>An error has occured and this content cannot be rendered.</p><br />`;
	elements.taskList.insertAdjacentHTML('afterbegin', error);
}