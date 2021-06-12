import React from 'react';

const MovieDetails = ({match, history}) => {
    return ( 

        <React.Fragment>
            <h2>Movie Detail - {match.params.id}</h2> 
            <button onClick={()=> history.goBack()}>Back </button>
        </React.Fragment>
     );
}
 
export default MovieDetails;