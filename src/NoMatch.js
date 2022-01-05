import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => {
  return (
    <div>
      <h1>Sorry, No Match</h1>
      <Link to='/'>Head Back</Link>
    </div>
  );
};

export default NoMatch;
