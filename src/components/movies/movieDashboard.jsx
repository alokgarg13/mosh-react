import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import MovieNavBar from './movieNavbar';
import Movies from './movies';
import Customers from './customers';
import Rentals from './rentals';
import MovieDetails from './movieDetails';
import NotFound from './../notFound';


const MovieDashboard = () => {
    return ( 
        <React.Fragment>
            <MovieNavBar />
            <Switch>
                <Route path="/movies/details/:id?" exact component={MovieDetails}  />
                <Route path="/movies/list" component={Movies}  />
                <Route path="/movies/customers" component={Customers}  />
                <Route path="/movies/rentals" component={Rentals}  />
                <Route path="/movies/not-found" component={NotFound}  />
                <Redirect from="/movies" exact to="/movies/list" />
                <Redirect to="/movies/not-found"/>
            </Switch>
        </React.Fragment>
     );
}
 
export default MovieDashboard;