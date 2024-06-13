

import React from 'react';
import './NotFound.scss'; 

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h3>404 Page not found</h3>
        <p>Oops! Looks like you've wandered off the beaten path.</p>
        <p className="funny-quote">But hey, at least the scenery is nice!</p>
      </div>
    </div>
  );
};

export default NotFound;
