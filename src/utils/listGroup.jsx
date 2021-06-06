import React from 'react';

const ListGroup = (props) => {
    const { items, textProperty, valueProperty, onClick} = props;
    return ( 
        <ul className="list-group">
             <li className="list-group-item">All Genres</li>
            {items.map(item => 
                <li 
                    className="list-group-item" 
                    value={item[valueProperty]}
                    onClick={()=> onClick(item)}
                >
                        {item[textProperty]}
                </li>
            )}
            
        </ul>
     );
}

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
}
export default ListGroup;