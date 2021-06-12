import React from 'react';

const Like = (props) => {
    return ( 
        <i 
            className={getHeartClass(props)} aria-hidden="true"
            onClick= {props.onClick}
        ></i>
     );
}

function getHeartClass(props) {
    let className = "pointer fa fa-heart";
    if(props.liked === true) 
        return className;
    else 
        return className + "-o";
}
 
export default Like;