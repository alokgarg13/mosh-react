import React, {Component} from 'react';
import { Route, Redirect, Switch } from 'react-router';
import MovieNavBar from './movieNavbar';
import Movies from './movies';
import Customers from './customers';
import Rentals from './rentals';
import MovieDetails from './movieDetails';
import MovieForm from './movieForm';
import MovieNotFound from './movieNotFound';


import config from '../../services/config.json';
import httpAxios from '../../services/httpAxiosService';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const basePath = "/mongo-movies";

class MongoMovieDashboard extends Component {
    state = { 
        movies: []
    }
    async componentDidMount() {
        const {data: movies} = await httpAxios.get(config.nodeMovies_ApiEndPoint);
        this.setState({
            movies: movies
        });
    }
   
    handleAddNewMovie = async (movie) => {
        const { data : newMovie} = await httpAxios.post(config.nodeMovies_ApiEndPoint, movie);
        console.log('new movie added in the database ', newMovie);
        const movies = [...this.state.movies, movie];
        this.setState({movies});
        toast.success("New Movie added Successfully");
    }

    handleUpdateMovie = async (movie) => {

        const updatedMovie = {...movie};
        delete updatedMovie._id; 

        const { data : newUpdatedMovie} = await httpAxios.put(`${config.nodeMovies_ApiEndPoint}/${movie._id}`, updatedMovie); 
        let movies = this.state.movies.filter( mv => mv._id !== movie._id);
        movies = [...movies, newUpdatedMovie];
        this.setState({movies});
        toast.success("Movie Updated Successfully ");
    }

    handleDeleteMovie = async (movie) => {
        
        const originalMovies = this.state.movies;
        const movies = originalMovies.filter( mv => mv._id !== movie._id);
        this.setState({movies});

        try {
            const {data} = await httpAxios.delete(`${config.nodeMovies_ApiEndPoint}/${movie._id}`);
            if( data) {
                toast.info("Movie Deleted Successfully ");
            }
        }
        catch(ex) {
            if(ex.response && ex.response.status === 404) {
                toast.error('This post has alredy been deleted. ');
            }
            this.setState({movies: originalMovies});
        }
    }

    render() { 
        const { movies } = this.state;
        return ( 
            <React.Fragment>
                <MovieNavBar />
                <ToastContainer />
                <Switch>
                    <Route path={`${basePath}/details/:id?`} exact component={MovieDetails}  />
                    <Route path={`${basePath}/list/:id`} render={(props) => 
                        <MovieForm 
                            movies={movies} 
                            basePath = {basePath}
                            onMoviesChanges={this.handleMovieChanges} 
                            onAddNewMovie={this.handleAddNewMovie} 
                            onUpdateMovie={this.handleUpdateMovie} 
                            {...props} />}  
                    />
                    <Route path={`${basePath}/list`} render={(props) => 
                        <Movies 
                            movies={movies}
                            basePath = {basePath}
                            onHandleDeleteMovie = {this.handleDeleteMovie}
                            // onMoviesChanges={this.handleMovieChanges}
                            {...props} />}  
                    />
                    <Route path={`${basePath}/customers`} component={Customers}  />
                    <Route path={`${basePath}/rentals`} component={Rentals}  />
                    <Route path={`${basePath}/not-found`} component={MovieNotFound}  />
                    <Redirect from={`${basePath}`} exact to={`${basePath}/list`} />
                    <Redirect to={`${basePath}/not-found`}/>
                </Switch>
            </React.Fragment>
         );
    }
}
 
export default MongoMovieDashboard;