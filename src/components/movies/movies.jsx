import React, { Component } from 'react';
import { getMovies } from '../../services/fakeMovieService';
import { getGenres } from '../../services/fakeGenreService';
// import Genres from './genres';
import MoviesTable from './moviesTable';

import Pagination from './../common/pagination';
import { paginate } from './../../utils/paginate';
import ListGroup from './../common/listGroup';
import _ from 'lodash';
import MovieNavBar from './movieNavbar';



class Movies extends Component {
    state = { 
        movies: [],
        genres: [],
        pageSize: 2,
        currentPage: 1,
        sortColumn: {path: 'title', order: 'asc'},
        selectedGenre: {_id:'', name: 'All Genres'}
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

    getPagedata = () => {
        const { pageSize, currentPage, selectedGenre, sortColumn, movies: allMovies} = this.state;
       
        const filtered = (selectedGenre && selectedGenre._id !== "") 
                            ? allMovies.filter(movie => movie.genre._id === selectedGenre._id)
                            : allMovies;
        const sorted =  _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const movies = paginate(sorted, currentPage, pageSize);
        
        return { totalCount: sorted.length, data: movies};
    }

    render() { 
        const { length: count } = this.state.movies;
        if(count === 0 ) return <p>There is no movies in the list. </p>;

        const { pageSize, currentPage,  sortColumn, selectedGenre} = this.state;
        const { totalCount, data: movies} = this.getPagedata();
        return ( 
            
            <React.Fragment>
                <MovieNavBar></MovieNavBar>
                <div className="row">
                    <div className="col-2">
                        {/* <Genres filterMovies={this.handleFilterMovies}/> */}
                        <ListGroup 
                            items={this.state.genres} 
                            selectedItem = {selectedGenre}
                            onItemSelect={this.handleGenreSelect}
                        />
                    </div>
                    <div className="col">
                        <p>Showing {totalCount} Movies in the Datatbase</p>
                        <MoviesTable 
                            movies= {movies} 
                            sortColumn={sortColumn}
                            onLikeDislike={this.handleLikeDislike}
                            onDelete={this.handleDelete}
                            onSort= {this.handleSortingMovies}
                        />

                        <Pagination 
                            itemsCount = {totalCount}
                            pageSize= {pageSize}
                            currentPage = {currentPage}
                            onPageChange={this.handlePageChange}
                        />
                    </div>
                </div>
            </React.Fragment>
          );
    }
}
 
export default Movies;