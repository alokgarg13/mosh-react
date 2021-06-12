import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
// import Genres from './genres';
import MoviesTable from './moviesTable';

import Pagination from './pagination';
import { paginate } from './../utils/paginate';
import ListGroup from './common/listGroup';
import _ from 'lodash';


class Movies_Combined extends Component {
    state = { 
        movies: [],
        genres: [],
        pageSize: 10,
        currentPage: 1,
        sortColumn: {path: 'title', order: 'asc'}
     }

    //  handleDelete = (id) => {
    //     let movies = this.state.movies;
    //     let movieInDb = movies.find(m => m._id === id);
    //     movies.splice(movies.indexOf(movieInDb), 1);
    //     this.setState({movies : movies});
    //  }
    
    componentDidMount() {

        const genres = [{_id:'', name: 'All Genres'}, ...getGenres()];

        this.setState({
                movies: getMovies(),
                genres: genres
        });
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter( mv => mv._id !== movie._id);
        this.setState({movies : movies});
    }

    handleLikeDislike = (movie)  => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);

        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    }


    handlePageChange = (page) => {
        this.setState({currentPage: page});
    }

    handleGenreSelect = (genre) => {
       
        this.setState({selectedGenre: genre, currentPage: 1});
    }

    handleSortingMovies = (sortColumn) => {
        this.setState({sortColumn});
    }

    render() { 
        const { length: count } = this.state.movies;

        const { pageSize, currentPage, movies: allMovies, selectedGenre, sortColumn} = this.state;
        const filtered = (selectedGenre && selectedGenre._id) 
                            ? allMovies.filter(movie => movie.genre._id == selectedGenre._id)
                            : allMovies;

        const sorted =  _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        if(count === 0 ) return <p>There is no movies in the list. </p>;
        
        const movies = paginate(sorted, currentPage, pageSize);

        
        return ( 
            
            <div className="row">
                <div className="col-2">
                    {/* <Genres filterMovies={this.handleFilterMovies}/> */}
                    <ListGroup 
                        items={this.state.genres} 
                        selectedItem = { this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    <p>Showing {filtered.length} Movies in the Datatbase</p>
                    <MoviesTable 
                        movies= {movies} 
                        sortColumn={sortColumn}
                        onLikeDislike={this.handleLikeDislike}
                        onDelete={this.handleDelete}
                        onSort= {this.handleSortingMovies}
                    />

                    <Pagination 
                        itemsCount = {filtered.length}
                        pageSize= {pageSize}
                        currentPage = {currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
          );
    }
}
 
export default Movies_Combined;