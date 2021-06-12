import React, { Component } from 'react';
import Joi from 'joi-browser';
import InputControl from './input';

class Form extends Component {
    state = {
        data: {},
        errors: {}
    };

    validate = () => {
        const options = {abortEarly: false};
        const { error } = Joi.validate(this.state.data, this.schema, options);
        if( !error ) return null;

        const errors  = {};
        for(let item of error.details) {
            errors[item.path[0] ] = item.message;
        }
        return errors;
    }
    
   validateProperty = ({name, value}) => {
        const obj = { [name]: value};
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    }

    handleChange = ({currentTarget: input}) => {

        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if(errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({data, errors});
    }

    handleSubmit = e => {
        e.preventDefault();  
        const errors = this.validate();
        this.setState({errors : errors || {} });
        if(errors) return;
        this.doSubmit();
    }

    renderButton(label) {
        return <button disabled={this.validate()} className="btn btn-primary mt-3">
            {label}
        </button>;
    }

    renderInput(name, label, type) {
        const { data, errors } = this.state;
        return (
            <InputControl 
                type={type}
                name={name}
                label={label}
                value={data[name]}
                onChange={this.handleChange} 
                error={errors[name]}
            />
        );

            // <Input 
            //     name="username"
            //     label="Username"
            //     value={data.username}
            //     onChange={this.handleChange} 
            //     error={errors.username}
            // />
    }
    
}
 
export default Form;