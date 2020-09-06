import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './QuizList.css';


export default class QuizList extends Component {
  renderQuizez = () => [1,2,3].map((i, idx) => {
    return (
      <li
        key={idx}
      >
        <NavLink to={'/quiz/' + i}>
          Test Quiz {i}
        </NavLink>
      </li>
    );
  });

  render() {
    return (
      <div className="QuizList">
        <div>
          <h1>Quiz List</h1>
          { this.renderQuizez() }
        </div>        
      </div>
    );
  }
}