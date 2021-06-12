import React from 'react';

const InputControl = ({type, name, label, value, error, onChange, }) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input 
                type={type}
                id={name} 
                name={name}
                value = {value}
                className="form-control" 
                onChange={onChange} 
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
     );
}
 
export default InputControl;