import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = (props) => {
   
    const {itemsCount, pageSize, currentPage, onPageChange} = props;

    const pagesCount = Math.ceil(itemsCount / pageSize) ;
    // if(pagesCount === 1) return null;

    const pages = _.range(1, pagesCount + 1);
    

    return ( 
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li key="previous" className="page-item">
                <a className="page-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                {pages.map(page => 
                    <li 
                        key={page} className={page === currentPage ? 'pointer page-item active' : 'pointer page-item'} 
                        onClick={()=>onPageChange(page)}
                    >
                        <a className="page-link">{page}</a>
                    </li>
                )}
                <li key="next" className="page-item">
                <a className="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
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


