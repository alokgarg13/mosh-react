import React, { Component } from 'react';
import Table from './../common/table';
import Like from './../common/like';
import { NavLink } from 'react-router-dom';



class MoviesTable extends Component {
    
    columns = [
        {
            path: 'title', 
            label : 'Title', 
            content: movie => (
                <NavLink to={`/mongo-movies/list/${movie._id}`}>{movie.title}</NavLink>
            )
        },
        {path: 'genre.name', label : 'Genre'},
        {path: 'numberInStock', label : 'Stock'},
        {path: 'dailyRentalRate', label : 'Rate'},
        {
            path: 'liked', 
            label : 'Like it', 
            content: movie => (
                <Like liked={movie.liked} onClick = {()=>this.props.onLikeDislike(movie)} />
            )
        },
        {
            key: 'Action',
            label : 'Action',
            content: movie => (
                <button className="btn btn-danger btn-sm" onClick={()=>this.props.onDelete(movie)}>
                    Delete
                </button>
            )
        }
    ];

    render() { 
        const { movies, sortColumn, onSort } = this.props;
        return ( 
           <Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={movies}  />
         );
    }
}
 
export default MoviesTable;