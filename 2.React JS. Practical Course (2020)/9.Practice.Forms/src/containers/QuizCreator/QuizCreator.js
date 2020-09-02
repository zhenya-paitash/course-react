import React, {Component} from "react";
import './QuizCreator.css';
import Button from "../../components/UI/Button";
import {createControl} from "../../form/formFramework";
import Input from "../../components/UI/Input";
import Auxiliary from "../../hoc/Auxiliary";


function createOptionControl(number) {
  return createControl({
    id: number,
    label: `Option ${number}`,
    errorMessage: 'The value cannot be empty'
  }, {
    required: true
  })
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Enter your question',
      errorMessage: 'The question cannot be empty'
    }, {
      required: true
    }),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}


export default class Quiz extends Component {
  state = {
    quiz: [],
    formControls: createFormControls()
  };

  submitHandler = e => {
    e.preventDefault();
  };
  addQuestionHandler = () => {};
  createQuizHandler = () => {};
  changeHandler = (value, controlName) => {
    console.log(value)
  };
  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, idx) => {
      const control = this.state.formControls[controlName];

      return (
        <Auxiliary key={controlName + idx}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={e => this.changeHandler(e.target.value, controlName)}
          />
          { idx === 0 ? <hr/> : null }
        </Auxiliary>
      );
    })
  }

  render() {
    return (
      <div className="QuizCreator">
        <div>
          <h1>Create Quiz</h1>

          <form onSubmit={this.submitHandler}>

            {this.renderControls()}

            <select></select>

            <Button
              type="primary"
              onClick={this.addQuestionHandler}
            >Add Question</Button>
            <Button
              type="success"
              onClick={this.createQuizHandler}
            >Create Quiz</Button>
          </form>
        </div>
      </div>
    );
  }
}
