{
	console && console.log('%c careers@stormid.com ', 'background: #272727; color: #ffffff');
}

fetch('http://localhost:4000/api/task')
	.then((response) => {
		console.log(response.json());
		return response.json();
	})