import React, {Component} from "react";
import './Quiz.css';
import ActiveQuiz from "../../components/ActiveQuiz";
import FinishQuiz from "../../components/FinishQuiz";

export default class Quiz extends Component {
  state = {
    isFinish: false,
    results: {},
    activeQuestion: 0,
    answerState: null,  // { [id]: 'success' || 'error' }
    quiz: [
      {
        id: 1,
        rightAnswerId: 4,
        question: 'What is this course about?',
        answers: [
          {id: 1, text: 'Angular'},
          {id: 2, text: 'Vue'},
          {id: 3, text: 'JavaScript'},
          {id: 4, text: 'React'},
        ]
      },
      {
        id: 2,
        rightAnswerId: 2,
        question: 'Which company developed React?',
        answers: [
          {id: 1, text: 'Google'},
          {id: 2, text: 'Facebook'},
          {id: 3, text: 'Apple'},
          {id: 4, text: 'Node.js Foundation'},
        ]
      }
    ]
  };

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
    console.log('QUIZ ID: ', this.props.match.params.id);
  }


  render() {
    const {
      isFinish,
      results,
      activeQuestion,
      answerState,
      quiz
    } = this.state;

    return (
      <div className="Quiz">

        <div className="QuizWrap">
          <h1>Please answer all questions.</h1>
          {
            isFinish
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
