import React from "react";
import './AnswersList.css';
import AnswerItem from "./AnswerItem";


export default props => (
  <ul className="AnswersList">
    {props.answers.map(i =>
      <AnswerItem
        key={i.id}
        answer={i}
        onAnswer={props.onAnswer}
        state={props.state ? props.state[i.id] : null}
      />
    )}
  </ul>
);
