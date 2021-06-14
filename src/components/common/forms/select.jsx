import React from 'react';

const SelectControl = ({name, label, options, currentValue, error, onChange }) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name} className="form-label">{label}</label>
            <select 
                className="form-select mb-3" 
                name={name}
                aria-label={name} 
                value={currentValue} 
                onChange={onChange}
            >
                <option value="">Select an option</option>
                {options.map(option => (
                     <option key={option._id} value={option._id}>
                        {option.name}
                    </option>)
                )}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
     );
}
 
export default SelectControl;

