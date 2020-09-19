import React, { Fragment, useState } from 'react'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      console.log('Passwords do not mutch');
    } else {
      console.log(formData);
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
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </Fragment>
  )
}

export default Register
