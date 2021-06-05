import React, { Component } from 'react';
import { getGenres } from '../services/fakeGenreService';


class Genres extends Component {
    state = { 
        genres: getGenres()
     }
    render() { 
        return (
            <React.Fragment>
                <ul className="list-group">
                    <li className="list-group-item">All Genres</li>
                    { this.state.genres.map(genre => 
                        <li key={genre._id} className="list-group-item">
                            {genre.name}
                        </li>
                    )}
                </ul>
            </React.Fragment>
          );
    }
}
 
export default Genres;