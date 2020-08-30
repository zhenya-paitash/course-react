import React from "react";
import './FinishQuiz.css';


export default props => {
  const successCount = Object.keys(props.results).reduce((sum, key) => {
    if (props.results[key] === 'success') sum++;
    return sum;
  }, 0);

  return (
    <div className="FinishQuiz">
      <ul>
        {
          props.quiz.map((quiz, idx) => {
            const cls = [
              'fa',
              props.results[quiz.id] === 'error' ? 'fa-times' : 'fa-check',
              props.results[quiz.id]
            ];

            return (
              <li key={quiz.id}>
                <strong>{idx + 1}. </strong>
                {quiz.question}
                <i className={cls.join(' ')} />
              </li>
            );
          })
        }
      </ul>

      <p>Success: {successCount} / {props.quiz.length}</p>
      <div>
        <button onClick={() => props.onRetry()}>Retry</button>
      </div>
    </div>
  );
};
