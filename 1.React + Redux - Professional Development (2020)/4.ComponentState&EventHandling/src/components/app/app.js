import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from "../item-add-form";

import './app.css';

export default class App extends Component {

  todoID = 1;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ]
  };

  createTodoItem(label) {
    return { label, important: false, id: this.todoID++, done: false }
  };

  addTodo = label => {
    const newTodo = this.createTodoItem(label);
    this.setState(({todoData}) => {
      return {
        todoData: [...todoData, newTodo]
      }
    })
  };

  deleteTodo = id => {
    this.setState(({todoData}) => {
      return {
        todoData: todoData.filter(i => i.id !== id)
      };
    })
  };

  toggleProperty(arr, id, propName) {
    return [...arr].map(i => i.id === id ? {...i, [propName]: !i[propName]} : i)
  }

  onToggleImportant = (id) => {
    // this.setState(({todoData}) => {
    //   return {
    //     todoData: [...todoData].map(i => i.id === id ? {...i, important: !i.important} : i)
    //   }
    // })
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    })
  };
  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      // const idx = todoData.findIndex(i => i.id === id);
      // console.log(idx);
      // const newItem = { ...todoData[idx], done: !todoData[idx].done };
      return {
        // todoData: [...todoData.slice(0, idx), newItem, ...todoData.slice(idx+1)]
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    })
  };



  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter(i => i.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel/>
          <ItemStatusFilter/>
        </div>
        <TodoList
          todos={this.state.todoData}
          onDeleted={this.deleteTodo}
          onToggleImportant={ this.onToggleImportant }
          onToggleDone={ this.onToggleDone }
        />
        <ItemAddForm onItemAdded={this.addTodo}/>
      </div>
    );
  }
};
