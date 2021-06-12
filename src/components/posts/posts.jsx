import React from "react";
import { Link } from "react-router-dom";
import queryString from 'query-string';

const Posts = ({match, location}) => {
  const queryParams = queryString.parse(location.search);
  console.log(queryParams);

  return (
    <div>
      <h1>Posts</h1>
      <br />
      <Link to="/posts/1982">Year</Link><br />
      <Link to="/posts/1982/May">Year Month</Link><br />
      <Link to="/posts/2009/06?sortBy=newest&appproved=true">Query String</Link><br />
      <Link to="/messages">Messages</Link>
      <br />
      Year: {match.params.year} , Month: {match.params.month}
    </div>
  );
};

export default Posts;
