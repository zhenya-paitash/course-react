import React from "react";
import './AnswerItem.css';


export default props => {
  const cls = ['AnswerItem'];

  if (props.state) {
    cls.push(props.state)
  }

  return (
    <li
      className={cls.join(' ')}
      onClick={() => props.onAnswer(props.answer.id)}
    >{props.answer.text}</li>
  );
};
