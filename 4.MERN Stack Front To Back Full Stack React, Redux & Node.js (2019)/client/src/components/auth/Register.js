import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setAlert } from '../../actions/alert'
import PropTypes from 'prop-types'
// import axios from 'axios'

const Register = ({setAlert}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not mutch', 'danger');
    } else {
      // const newUser = { name, email, password };

      // try {

      //   const config = {
      //     headers: {
      //       'Content-Type': 'application/json'
      //     }
      //   };
      //   const body = JSON.stringify(newUser);
      //   const res = await axios.post(`/api/users`, body, config);
      //   console.log(res.data);

      // } catch(e) {
      //   console.error(e.response.data);
      // }

      console.log('SUCCESS');
    }
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input 
            type="text" 
            value={name} 
            onChange={e => onChange(e)} 
            placeholder="Name" 
            name="name" 
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            value={email} 
            onChange={e => onChange(e)} 
            placeholder="Email Address" 
            name="email" 
            required 
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password} 
            onChange={e => onChange(e)}
            placeholder="Password"
            name="password"
            minLength="6"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password2} 
            onChange={e => onChange(e)}
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </Fragment>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired
};

export default connect(null, { setAlert })(Register);
