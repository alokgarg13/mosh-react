import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';


class Navbar extends Component {
    render() { 
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1">
                                Navbar
                                <span className="badge bg-primary bg-sm ml-2 rounded-pill sm">
                                    {this.props.totalCounters}
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
            </React.Fragment> 
         );
    }
}
 
export default Navbar;