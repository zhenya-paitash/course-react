import React, {Component} from 'react';
import './Auth.css';
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import is from 'is_js';
import axios from 'axios';


class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Please enter a valid email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Please enter a valid password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  };

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    };
    try {
      const response = await axios
        .post(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDam6nRfCh9RxpIcWjjDMU3OOSzpzolK0A',
          authData
        );

      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  signupHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    };
    try {
      const response = await axios
        .post(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDam6nRfCh9RxpIcWjjDMU3OOSzpzolK0A',
          authData
        );

      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  submitHandler = e => {
    e.preventDefault();
  };

  validateControl(value, validation) {
    if (!validation) return true;

    let isValid = true;
    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (validation.email) {
      // isValid = validateEmail(value) && isValid;
      isValid = is.email(value) && isValid;
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  };

  onChangeHandler = (e, controlName) => {
    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};

    control.value = e.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;
    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    });
    this.setState({
      formControls,
      isFormValid
    });
  };

  renderInputs() {
    return Object.keys(this.state.formControls)
      .map((controlName, idx) => {
        const control = this.state.formControls[controlName];
        return (
          <Input
            key={controlName + idx}
            type={control.type}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            shouldValidate={!!control.validation}
            errorMessage={control.errorMessage}
            onChange={e => this.onChangeHandler(e, controlName)}
          />
        );
      });
  };

  render() {
    return (
      <div className="Auth">
        <div>
          <h1>Authorization</h1>

          <form className="AuthForm" onSubmit={this.submitHandler}>

            {this.renderInputs()}

            <Button
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >Log In</Button>
            <Button
              type="primary"
              onClick={this.signupHandler}
              disabled={!this.state.isFormValid}
            >Sign Up</Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
