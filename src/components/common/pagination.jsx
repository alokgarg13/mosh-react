import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';

const Pagination = (props) => {
   
    const {itemsCount, pageSize, currentPage, basePath, onPageChange} = props;
    const pagesCount = Math.ceil(itemsCount / pageSize) ;
    if(pagesCount === 1) return null;

    const pages = _.range(1, pagesCount + 1);
    
    return ( 
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li key="previous" className="page-item">
                <NavLink to={basePath} className="page-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </NavLink>
                </li>
                {pages.map(page => 
                    <li 
                        key={page} className={page === currentPage ? 'pointer page-item active' : 'pointer page-item'} 
                        onClick={()=>onPageChange(page)}
                    >
                        
                        <NavLink to={`${basePath}/list`} className="page-link">{page}</NavLink>
                    </li>
                )}
                <li key="next" className="page-item">
                <NavLink to={basePath} className="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </NavLink>
                </li>
            </ul>
        </nav>
     );
}

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired, 
    pageSize: PropTypes.number.isRequired, 
    currentPage: PropTypes.number.isRequired, 
    onPageChange: PropTypes.func.isRequired
}
 
export default Pagination;


