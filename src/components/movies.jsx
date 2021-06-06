import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Like from './like';
// import Genres from './genres';

import Pagination from './pagination';
import { paginate } from './../utils/paginate';
import ListGroup from './../utils/listGroup';



class Movies extends Component {
    state = { 
        movies: [],
        genres: [],
        pageSize: 3,
        currentPage: 1,
        genre_filter: '', 
     }

    //  handleDelete = (id) => {
    //     let movies = this.state.movies;
    //     let movieInDb = movies.find(m => m._id === id);
    //     movies.splice(movies.indexOf(movieInDb), 1);
    //     this.setState({movies : movies});
    //  }
    
    componentDidMount() {
        this.setState({
                movies: getMovies(),
                genres: getGenres()
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

    handleFilterMovies = (item) => {
       
        console.log(item);
        this.setState({genre_filter: item._id});
    }

    render() { 
        const { length: count } = this.state.movies;

        // const { pageSize, currentPage, movies: allMovies} = this.state;

        const { pageSize, currentPage} = this.state;
        let allMovies = [...this.state.movies];

        if(this.state.genre_filter !== '' ) {
            allMovies = allMovies.filter(movie => movie.genre._id == this.state.genre_filter);
        }
        

        if(count === 0 ) return <p>There is no movies in the list. </p>;

        const movies = paginate(allMovies, currentPage, pageSize);
        
        return ( 
            
            <div className="row">
                <div className="col-2">
                    {/* <Genres filterMovies={this.handleFilterMovies}/> */}
                    <ListGroup 
                        items={this.state.genres} 
                        onClick={this.handleFilterMovies}
                    />
                </div>
                <div className="col">
                    <p>Showing {count} Movies in the Datatbase</p>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Rate</th>
                            <th scope="col">Like it</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map(mv => (
                                    <tr key={mv._id}>
                                        <th scope="row">{mv.title}</th>
                                        <td>{mv.genre.name}</td>
                                        <td>{mv.numberInStock}</td>
                                        <td>{mv.dailyRentalRate}</td>
                                        <td>
                                            <Like 
                                                liked={mv.liked} 
                                                onClick = {()=>this.handleLikeDislike(mv)}
                                            />
                                            </td>
                                        <td>
                                            <button 
                                                className="btn btn-danger btn-sm"
                                                onClick={()=>this.handleDelete(mv)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            )}                    
                        </tbody>
                    </table>

                    <Pagination 
                        itemsCount = {count}
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