import React, {Component} from "react";
import './Quiz.css';
import ActiveQuiz from "../../components/ActiveQuiz";
import FinishQuiz from "../../components/FinishQuiz";
import Loader from "../../components/UI/Loader";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";


class Quiz extends Component {

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id)
  }
  componentWillUnmount() {
    this.props.retryQuiz();
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
                  onRetry={this.props.retryQuiz}
                />
                : <ActiveQuiz
                  answers={quiz[activeQuestion].answers}
                  question={quiz[activeQuestion].question}
                  onAnswer={this.props.quizAnswerClick}
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
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
