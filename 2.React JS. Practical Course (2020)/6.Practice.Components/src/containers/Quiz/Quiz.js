import React, {Component} from "react";
import './Quiz.css';
import ActiveQuiz from "../../components/ActiveQuiz";

export default class Quiz extends Component {
  state = {
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
    const question = this.state.quiz[this.state.activeQuestion];
    if (answerId === question.rightAnswerId) {
      this.setState(state => {
        return {
          answerState: {
            [answerId]: 'success'
          }
        }
      });
      const timeout = window.setTimeout(() => {
        if (this.quizIsFinish()) {
          console.log('FINISH')
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
      this.setState(state => {
        return {
          answerState: {[answerId]: 'error'}
        }
      });
    }
  };

  quizIsFinish = () => this.state.activeQuestion + 1 === this.state.quiz.length;

  render() {
    return (
      <div className="Quiz">

        <div className="QuizWrap">
          <h1>Please answer all questions.</h1>
          <ActiveQuiz
            answers={this.state.quiz[this.state.activeQuestion].answers}
            question={this.state.quiz[this.state.activeQuestion].question}
            onAnswer={this.onAnswerClickHandler}
            quizLength={this.state.quiz.length}
            answerNumber={this.state.activeQuestion + 1}
            state={this.state.answerState}
          />
        </div>
      </div>
    );
  }
}
