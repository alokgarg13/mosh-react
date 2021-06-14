import React from 'react';

const SearhBox = (props) => {
    return ( 
        <input 
            type="text"
            name="query"
            className="form-control mt-2 mb-2" 
            placeholder="Search..."
            value={props.value}
            onChange={e => props.onHandleSearch(e.target.value)}
        />
     );
}
 
export default SearhBox;