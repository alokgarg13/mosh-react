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
                        <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                        <NavLink className="nav-link" to="/movies">Movies</NavLink>
                        <NavLink className="nav-link" to="/counters">Counters</NavLink>
                        <NavLink className="nav-link" to="/products">Products</NavLink>
                        <NavLink className="nav-link" to="/posts">Posts</NavLink>
                        <NavLink className="nav-link" to="/admin">Admin</NavLink>
                        <NavLink className="nav-link disabled" to="#" tabIndex="-1" aria-disabled="true">Disabled</NavLink>
                    </div>
                </div>
            </div>
        </nav>
     );
}
 
export default MovieNavBar;