import React, { Component } from 'react';
import Joi from 'joi-browser';
import SelectControl from './select';
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

    renderButton(label, isDisable=false) {
        const disabled = (isDisable === true ? this.validate() : isDisable);
        return <button disabled={disabled} className="btn btn-primary my-3 mx-1">
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
    }

    renderSelect(name, label, options, currentvalue="") {
        const { data, errors } = this.state;
        return (
            <SelectControl 
                name={name}
                value={data[name]}
                label={label}
                options={options}
                currentValue={currentvalue}
                onChange={this.handleChange} 
                error={errors[name]}
            />
        );
    }
    
}
export default Form;
 