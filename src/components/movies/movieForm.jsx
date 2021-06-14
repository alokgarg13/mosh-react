import React from 'react';
import Form from '../common/forms/form';
import Joi from 'joi-browser';
import { getGenres } from '../../services/fakeGenreService';
import { getMovie, saveMovie } from '../../services/fakeMovieService';

class MovieForm extends Form {
    state = {
        data: {
            title: '',
            genreId: '',
            numberInStock: '',
            dailyRentalRate: ''
        },
        genres: [],
        errors: {}
    }
    
    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label('Title'),
        genreId: Joi.optional().label('Genre'),
        numberInStock: Joi.number().min(0).max(100).label('Numbers in Stock'),
        dailyRentalRate: Joi.number().min(1).max(30).label('Rate')
    }

    componentDidMount() {
        const genres = getGenres();
        this.setState({genres});

        const movieId = this.props.match.params.id;
        if(movieId === "new") return;

        const movie = getMovie(movieId);
        if(!movie) return this.props.history.replace("/not-found");
        this.setState({data: this.mapToViewModel(movie)});
    }

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }
    doSubmit = () => {
        const movie = saveMovie(this.state.data);
        const movies = [...this.props.movies, movie]
        this.props.onMoviesChanges(movies);
        this.props.history.push("/movies");
    }

    render() { 
            return (
            <div>
                <h1>Add New Movie</h1>
                <form className="form" onSubmit={this.handleSubmit}>
                    {this.renderInput('title', 'Title')}
                    {this.renderSelect('genreId', "Genre", this.state.genres, this.state.data.genreId)}
                    {this.renderInput('numberInStock', 'Number in Stock', "text")}
                    {this.renderInput('dailyRentalRate', 'Rate', "text")}
                    {this.renderButton('Save', true)}
                    {/* {this.renderButton('Cancel', false)} */}
                    <button 
                        className="btn btn-primary"
                        onClick={()=> this.props.history.replace("/movies/list")}
                    >Cancel</button>
                </form>
            </div>
        );
    }
}
 
export default MovieForm;