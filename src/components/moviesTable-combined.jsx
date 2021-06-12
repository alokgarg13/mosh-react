import React, { Component } from 'react';
import Like from './like';

class MoviesTable_Combined extends Component {
    raiseSort = (path) => {
        const sortColumn = {...this.props.sortColumn};
        if(sortColumn.path === path) {
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        }
        else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.props.onSort(sortColumn);
    }

    render() { 
        const { movies, onDelete, onLikeDislike } = this.props;
        return ( 
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col" onClick={()=>this.raiseSort('title')}>Title</th>
                    <th scope="col" onClick={()=>this.raiseSort('genre.name')}>Genre</th>
                    <th scope="col" onClick={()=>this.raiseSort('numberInStock')}>Stock</th>
                    <th scope="col" onClick={()=>this.raiseSort('dailyRentalRate')}>Rate</th>
                    <th scope="col" onClick={()=>this.raiseSort('liked')}>Like it</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movie => (
                            <tr key={movie._id}>
                                <th scope="row">{movie.title}</th>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td>
                                    <Like 
                                        liked={movie.liked} 
                                        onClick = {()=>onLikeDislike(movie)}
                                    />
                                    </td>
                                <td>
                                    <button 
                                        className="btn btn-danger btn-sm"
                                        onClick={()=>onDelete(movie)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    )}                    
                </tbody>
            </table> 
         );
    }
}
 
export default MoviesTable_Combined;