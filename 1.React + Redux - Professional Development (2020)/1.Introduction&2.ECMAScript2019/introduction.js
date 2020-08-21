import React from 'react';
import ReactDOM from 'react-dom';

function TodoItem() {
	return (
		<span>Drink Coffee</span>
	);
}

const TodoList = () => {
	return (
		<ul>
			<li><TodoItem /></li>
			<li><TodoItem /></li>
			<li><TodoItem /></li>
			<li><TodoItem /></li>
		</ul>
	);
}

ReactDOM.render(<TodoList />, document.getElementById('root'));