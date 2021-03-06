import React, { Component } from 'react';
// import { getMovies } from '../../services/fakeMovieService';
import { getGenres } from '../../services/fakeGenreService';
// import Genres from './genres';
import MoviesTable from './moviesTable';

import Pagination from './../common/pagination';
import { paginate } from './../../utils/paginate';
import ListGroup from './../common/listGroup';
import SearhBox from '../common/forms/searchBox';
import _ from 'lodash';


class Movies extends Component {
    state = { 
        // movies: [],
        genres: [],
        pageSize: 3,
        currentPage: 1,
        selectedGenre: null,
        searchQuery: "",
        sortColumn: {path: 'title', order: 'asc'}
     }

    //  handleDelete = (id) => {
    //     let movies = this.props.movies;
    //     let movieInDb = movies.find(m => m._id === id);
    //     movies.splice(movies.indexOf(movieInDb), 1);
    //     this.setState({movies : movies});
    //  }
    
    componentDidMount() {
        const genres = [{_id:'', name: 'All Genres'}, ...getGenres()];
        this.setState({
                // movies: getMovies(),
                genres: genres
        });
    }

    handleDelete = (movie) => {
        const movies = this.props.movies.filter( mv => mv._id !== movie._id);
        //this.setState({movies : movies});
        this.props.onMoviesChanges(movies);
    }

    handleLikeDislike = (movie)  => {
        const movies = [...this.props.movies];
        const index = movies.indexOf(movie);
        movies[index].liked = !movies[index].liked;
        // this.setState({movies});
        this.props.onMoviesChanges(movies);
    }

    handlePageChange = (page) => {
        this.setState({currentPage: page});
    }

    handleGenreSelect = (genre) => {
        this.setState({selectedGenre: genre, currentPage: 1, searchQuery: ''});
    }

    handleSearch= query => {
        this.setState({searchQuery: query, selectedGenre: null, currentPage: 1});
    }


    handleSortingMovies = (sortColumn) => {
        this.setState({sortColumn});
    }

    getPagedata = () => {
        const { pageSize, currentPage, selectedGenre, searchQuery, sortColumn} = this.state;
        const { movies: allMovies} = this.props;
        
        
        let filtered = allMovies;

        if(searchQuery && searchQuery !== "") {
            filtered = allMovies.filter(mv => mv.title.toLowerCase().match(searchQuery.toLowerCase()));
        }
        else if(selectedGenre && selectedGenre._id !== "") {
            filtered = allMovies.filter(movie => movie.genre._id === selectedGenre._id);
        }
        
        const sorted =  _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const movies = paginate(sorted, currentPage, pageSize);
        
        return { totalCount: sorted.length, data: movies};
    }

   
    render() { 
        console.log('Movies Rendering from Fake Service Movies Dashbaord');
        const { length: count } = this.props.movies;
        if(count === 0 ) return <p>There is no movies in the list. </p>;

        const { pageSize, currentPage,  sortColumn, selectedGenre, searchQuery } = this.state;
        const { totalCount, data: movies} = this.getPagedata();
        return (     
            <div className="row">
                <div className="col-2">
                    <ListGroup 
                        items={this.state.genres} 
                        selectedItem = {selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    <button 
                        className="btn btn-primary"
                        onClick={()=> this.props.history.push("/movies/list/new")}>
                            New Movie
                    </button>

                    
                    <SearhBox value={searchQuery}  onHandleSearch={this.handleSearch} />

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
                        basePath = {this.props.basePath}
                        pageSize= {pageSize}
                        currentPage = {currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
          );
    }
}
 
export default Movies;