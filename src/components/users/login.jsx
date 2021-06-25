import React from "react";
import Form from './../common/forms/form';
import Joi from 'joi-browser';

class LoginForm extends Form {
    state = {
        data: { username: '', password: ''},
        errors: {}
    }

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }

    doSubmit = () => {
        console.log(this.state.data);
        console.warn('form submitted from here');
    }

    handleCancel = () => {
      this.props.history.push('/mongo-movies/list');
    }

    render() {
    return (
      <div>
        <h1>Login</h1>
        <form className="form" onSubmit={this.handleSubmit}>
            {this.renderInput('username', 'Username')}
            {this.renderInput('password', 'Password', 'password')}
            {this.renderButton('Login', 'submit')}
            {this.renderButton('Cancel', 'button', this.handleCancel)}
        </form>
      </div>
    );
  }
}

export default LoginForm;
