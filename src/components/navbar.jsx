import React, { Component } from 'react';

class Navbar extends Component {
    render() { 
        return ( 
            <nav className="navbar navbar-light bg-light mb-3">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">
                            Navbar
                            <span className="badge bg-primary bg-sm ml-2 rounded-pill sm">
                                {this.props.totalCounters}
                            </span>
                    </span>
                    
                </div>
            </nav>
         );
    }
}
 
export default Navbar;