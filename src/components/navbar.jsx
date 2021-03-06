import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class Navbar extends Component {
    render() { 
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1">
                                Navbar
                                <span className="badge bg-primary bg-sm ml-2 rounded-pill sm" style={{marginLeft: '5px'}}>
                                    {this.props.totalCounters}
                                </span>
                        </span>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                                <NavLink className="nav-link" to="/movies/list">Movies</NavLink>
                                <NavLink className="nav-link" to="/mongo-movies/list">Mongo Movies</NavLink>
                                <NavLink className="nav-link" to="/counters">Counters</NavLink>
                                <NavLink className="nav-link" to="/products">Products</NavLink>
                                <NavLink className="nav-link" to="/posts">Posts</NavLink>
                                <NavLink className="nav-link" to="/http-dashboard/http-posts" exact>Http Posts</NavLink>
                                <NavLink className="nav-link" to="/admin">Admin</NavLink>
                                <NavLink className="nav-link" to="/user/login">Login</NavLink>
                                <NavLink className="nav-link" to="/user/register">Register</NavLink>
                                <NavLink className="nav-link" to="/user/signup">Sign Up</NavLink>
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