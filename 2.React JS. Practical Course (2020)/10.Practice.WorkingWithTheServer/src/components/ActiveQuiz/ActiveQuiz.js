import React from "react";
import './ActiveQuiz.css';
import AnswersList from "../ActiveQuiz/AnswersList";


export default props => (
  <div className="ActiveQuiz">
    <p className="Question">
      <span>
        <strong>{props.answerNumber}.&nbsp;</strong>
        {props.question}
      </span>

      <small>{props.answerNumber} / {props.quizLength}</small>
    </p>

    <AnswersList
      answers={props.answers}
      onAnswer={props.onAnswer}
      state={props.state}
    />
  </div>
);
