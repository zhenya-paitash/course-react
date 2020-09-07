import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './QuizList.css';
import Loader from "../../components/UI/Loader";
import {connect} from "react-redux";
import {fetchQuizes} from "../../store/actions/quiz";


class QuizList extends Component {

  renderQuizez = () => this.props.quizes
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

  componentDidMount() {
    this.props.fetchQuizes();
  }

  render() {
    return (
      <div className="QuizList">
        <div>
          <h1>Quiz List</h1>

          {
            this.props.loading && this.props.loading.length !== 0
              ? <Loader/>
              : <ul>{this.renderQuizez()}</ul>
          }

        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
