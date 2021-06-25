import React from "react";
import Joi from "joi-browser";
import Form from "../common/forms/form";

class UserRegistration extends Form {
  state = {
      data: {
          firstName: '',
          email: '',
          username: '',
          password : ''
      },
      errors: { }
  };

  schema = {
      firstName: Joi.string().required().min(3).label('First Name'),
      email: Joi.string().email().required().label('Email'),
      username: Joi.string().required().min(3).max(10).label('Username'),
      password: Joi.string().required().label('Password')
  }

  doSubmit = () => {
    console.log('register form submitted');
  }

  handleCancel = () => {
    this.props.history.push('/mongo-movies/list');
  }

  render() {
    return (
      <div>
        <h1>User Registration</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
              {this.renderInput('firstName', 'First Name', "text")}
              {this.renderInput('email', 'Email', "text")}
              {this.renderInput('username', 'Username', "text")}
              {this.renderInput('password', 'Password', "password")}
              {this.renderButton('Register', 'submit')}
              {this.renderButton('Cancel', '', this.handleCancel)}
          </form>
        </div>
      </div>
    );
  }
}

export default UserRegistration;
