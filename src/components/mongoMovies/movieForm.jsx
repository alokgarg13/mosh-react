import React from 'react';
import Form from '../common/forms/form';
import Joi from 'joi-browser';
// import { getGenres } from '../../services/fakeGenreService';
import httpAxios from '../../services/httpAxiosService';
import config from '../../services/config.json';
import { getMovie, saveMovie } from '../../services/fakeMovieService';
import { toast } from 'react-toastify';

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
        genreId: Joi.required().label('Genre'),
        numberInStock: Joi.number().min(0).max(100).label('Numbers in Stock'),
        dailyRentalRate: Joi.number().min(1).max(30).label('Rate')
    }

    async componentDidMount() {
        const {data: genres} = await httpAxios.get(config.nodeGenres_ApiEndPoint);
        this.setState({genres});
        
        const movieId = this.props.match.params.id;
        if(movieId === "new") return;
        try {
            const { data: movie } = await httpAxios.get(`${config.nodeMovies_ApiEndPoint}/${movieId}`);
            this.setState({data: this.mapToViewModel(movie)});
        }
        catch(ex) {
            if(ex.response && ex.response === 404) {
                this.props.history.replace(`${this.props.basePath}/not-found`);
            }
            // toast.error('Movie Not Found');
        }
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
        // const movie = saveMovie(this.state.data);
        const movie = this.state.data;

        if(movie._id && movie._id != '') {
            this.props.onUpdateMovie(movie);
        }
        else {
            this.props.onAddNewMovie(movie);
        }
        this.props.history.push(`${this.props.basePath}`);
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
                        onClick={()=> this.props.history.replace("/mongo-movies/list")}
                    >Cancel</button>
                </form>
            </div>
        );
    }
}
 
export default MovieForm;