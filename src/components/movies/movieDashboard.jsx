import React, {Component} from 'react';
import { Route, Redirect, Switch } from 'react-router';
import MovieNavBar from './movieNavbar';
import Movies from './movies';
import Customers from './customers';
import Rentals from './rentals';
import MovieDetails from './movieDetails';
import NotFound from './../notFound';
import MovieForm from './movieForm';
import { getMovies } from '../../services/fakeMovieService';

const basePath = "/movies";
class MovieDashboard extends Component {
    state = { 
        movies: []
    }
    componentDidMount() {
        this.setState({
            movies: getMovies()
        });
    }
    handleMoviesChanges = (movies) => {
        this.setState({movies});
    }

    render() { 
        return ( 
            <React.Fragment>
                <MovieNavBar />
                <Switch>
                    <Route path="/movies/details/:id?" exact component={MovieDetails}  />
                    <Route path="/movies/list/:id" render={(props) => 
                        <MovieForm movies={this.state.movies} onMoviesChanges={this.handleMoviesChanges} {...props} />}  
                    />
                    <Route path="/movies/list" render={(props) => 
                        <Movies 
                            movies={this.state.movies} 
                            basePath = {basePath}
                            onMoviesChanges={this.handleMoviesChanges} 
                            {...props} />}  
                    />
                    <Route path="/movies/customers" component={Customers}  />
                    <Route path="/movies/rentals" component={Rentals}  />
                    <Route path="/movies/not-found" component={NotFound}  />
                    <Redirect from="/movies" exact to="/movies/list" />
                    <Redirect to="/movies/not-found"/>
                </Switch>
            </React.Fragment>
         );
    }
}
 
export default MovieDashboard;