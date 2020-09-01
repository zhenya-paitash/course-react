import React, {Component} from 'react';
import './Auth.css';
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";


class Auth extends Component {
  loginHandler = () => {

  };
  signupHandler = () => {

  };
  submitHandler = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="Auth">
        <div>
          <h1>Authorization</h1>

          <form
            className="AuthForm"
            onSubmit={this.submitHandler}
          >
            <Input
              label="Email"

            />
            <Input
              label="Password"
              errorMessage={'TEST'}
            />

            <Button
              type="success"
              onClick={this.loginHandler}
            >Log In</Button>
            <Button
              type="primary"
              onClick={this.signupHandler}
            >Sign Up</Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
