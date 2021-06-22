import React, { Component } from 'react';
import _ from 'lodash';
import ListGroup from './../common/listGroup';
import Pagination from './../common/pagination';
import SearhBox from '../common/forms/searchBox';
import { paginate } from './../../utils/paginate';
import MoviesTable from './moviesTable';

import httpAxios from '../../services/httpAxiosService';
import config from '../../services/config.json';

class Movies extends Component {
    state = { 
        genres: [],
        pageSize: 3,
        currentPage: 1,
        selectedGenre: null,
        searchQuery: "",
        sortColumn: {path: 'title', order: 'asc'}
     }

   
    async componentDidMount() {
         const {data: genresList} = await httpAxios.get(config.nodeGenres_ApiEndPoint);
        const genres = [{_id:'', name: 'All Genres'}, ...genresList];
        this.setState({
                genres: genres
        });
        console.log(' here is movies compoent ');
        return;
    }

    handleLikeDislike = (movie)  => {
        const movies = [...this.props.movies];
        const index = movies.indexOf(movie);
        movies[index].liked = !movies[index].liked;
        this.props.onMoviesChanges(movies); // need to chagne this
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
        const { length: count } = this.props.movies;
        if(count === 0 ) return <p>There is no movies in the list. </p>;

        const { pageSize, currentPage,  sortColumn, selectedGenre, searchQuery } = this.state;
        const { totalCount, data: movies} = this.getPagedata();
        const { basePath } = this.props;
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
                        onClick={()=> this.props.history.push(`${basePath}/list/new`)}>
                            New Movie
                    </button>

                    <SearhBox value={searchQuery}  onHandleSearch={this.handleSearch} />

                    <p>Showing {totalCount} Movies in the Datatbase</p>
                    <MoviesTable 
                        movies= {movies} 
                        sortColumn={sortColumn}
                        onLikeDislike={this.handleLikeDislike}
                        onDelete={this.props.onHandleDeleteMovie}
                        onSort= {this.handleSortingMovies}
                    />
                    <Pagination 
                        basePath= {basePath}
                        itemsCount = {totalCount}
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