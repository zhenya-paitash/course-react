import React, {Component} from "react";
import './Quiz.css';
import ActiveQuiz from "../../components/ActiveQuiz";
import FinishQuiz from "../../components/FinishQuiz";
import Loader from "../../components/UI/Loader";
import {connect} from "react-redux";
import {fetchQuizById} from "../../store/actions/quiz";


class Quiz extends Component {

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === 'success') return;
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (answerId === question.rightAnswerId) {
      if (!results[question.id]) results[question.id] = 'success';
      this.setState({
        answerState: {[answerId]: 'success'},
        results
      });
      const timeout = window.setTimeout(() => {
        if (this.quizIsFinish()) {
          this.setState({isFinish: true})
        } else {
          this.setState(prewState => {
            return {
              activeQuestion: prewState.activeQuestion++,
              answerState: null
            }
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = 'error';
      this.setState({
        answerState: {[answerId]: 'error'},
        results
      });
    }
  };

  quizIsFinish = () => this.state.activeQuestion + 1 === this.state.quiz.length;

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinish: false,
      results: {}
    })
  };

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id)
  }


  render() {
    const {
      isFinish,
      results,
      activeQuestion,
      answerState,
      quiz
    } = this.props;

    return (
      <div className="Quiz">

        <div className="QuizWrap">
          <h1>Please answer all questions.</h1>

          {
            this.props.loading || !this.props.quiz
              ? <Loader/>
              : isFinish
                ? <FinishQuiz
                  results={results}
                  quiz={quiz}
                  onRetry={this.retryHandler}
                />
                : <ActiveQuiz
                  answers={quiz[activeQuestion].answers}
                  question={quiz[activeQuestion].question}
                  onAnswer={this.onAnswerClickHandler}
                  quizLength={quiz.length}
                  answerNumber={activeQuestion + 1}
                  state={answerState}
                />
          }
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    results:        state.quiz.results,
    isFinish:       state.quiz.isFinish,
    activeQuestion: state.quiz.activeQuestion,
    answerState:    state.quiz.answerState,
    quiz:           state.quiz.quiz,
    loading:        state.quiz.loading,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
