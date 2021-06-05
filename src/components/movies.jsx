import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './like';
import Genres from './genres';
import Pagination from './pagination';
import { paginate } from './../utils/paginate';


class Movies extends Component {
    state = { 
        movies: getMovies(),
        pageSize: 3,
        currentPage: 1
     }

    //  handleDelete = (id) => {
    //     let movies = this.state.movies;
    //     let movieInDb = movies.find(m => m._id === id);
    //     movies.splice(movies.indexOf(movieInDb), 1);
    //     this.setState({movies : movies});
    //  }
    
    

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

    render() { 
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, movies: allMovies} = this.state;
        if(count === 0 ) return <p>There is no movies in the list. </p>;

        const movies = paginate(allMovies, currentPage, pageSize);
        
        return ( 
            <React.Fragment>

            <div className="container">
                <div className="row">
                    <div className="col-sm-2">
                        <Genres />
                    </div>
                    <div className="col-sm-10">
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
            </div>
            </React.Fragment>
          );
    }
}
 
export default Movies;