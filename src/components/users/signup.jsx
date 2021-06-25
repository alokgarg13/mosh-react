import React  from 'react';
import Form from '../common/forms/form';
import Joi  from 'joi-browser';

class SignUpUser extends Form {
    state = {
        data: {
            name: '',
            email: '',
            password: ''
        },
        errors: { }
      }

      schema = {
          name: Joi.string().required().min(3),
          email: Joi.string().email().required(),
          password: Joi.string().required()
      }

      doSubmit = () => {
          console.log('Submitting the form. ');
          console.log(this.state.data);
      }

      handleCancel = () => {
          this.props.history.push('/mongo-movies');
      }

    render() { 
        return ( 
            <React.Fragment>
                <h1>Sign Up User</h1>
                <div>
                    <form className="form" onSubmit={this.handleSubmit}>
                        {this.renderInput('name', 'Name', 'text')}
                        {this.renderInput('email', 'Email', 'text')}
                        {this.renderInput('password', 'Password', 'password')}
                        {this.renderButton('Submit', 'submit')}
                        {this.renderButton('Cancel', 'button', this.handleCancel )}
                    </form>
                </div>
            </React.Fragment>
         );
    }
}
 
export default SignUpUser;