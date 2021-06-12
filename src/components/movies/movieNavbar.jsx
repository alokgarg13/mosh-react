import React from 'react';
import { NavLink } from 'react-router-dom';


const MovieNavBar = (props) => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-2 mt-2">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">
                        Vidly
                        <span className="badge bg-primary bg-sm ml-2 rounded-pill sm">
                            {/* {props.totalCounters} */}
                        </span>
                </span>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink className="nav-link" to="/movies/list">Movies</NavLink>
                        <NavLink className="nav-link" to="/movies/customers">Customers</NavLink>
                        <NavLink className="nav-link" to="/movies/rentals">Rentals</NavLink>
                    </div>
                </div>
            </div>
        </nav>
     );
}
 
export default MovieNavBar;