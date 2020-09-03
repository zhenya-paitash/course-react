import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './QuizList.css';
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader";


export default class QuizList extends Component {
  state = {
    quizes: [],
    loading: true
  };

  renderQuizez = () => this.state.quizes
    .map(i => {
      return (
        <li
          key={i.id}
        >
          <NavLink to={'/quiz/' + i.id}>
            {i.name}
          </NavLink>
        </li>
      );
    });

  async componentDidMount() {
    try {
      const response = await axios.get('/quizes.json');

      const quizes = [];
      Object.keys(response.data).forEach((key, idx) => {
        quizes.push({
          id: key,
          name: `Test №${idx + 1}`
        });
      });

      this.setState({
        quizes,
        loading: false
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="QuizList">
        <div>
          <h1>Quiz List</h1>

          {
            this.state.loading
              ? <Loader/>
              : <ul>{this.renderQuizez()}</ul>
          }

        </div>
      </div>
    );
  }
}
