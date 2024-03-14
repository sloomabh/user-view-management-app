import React from 'react';

const NoMatch = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-700">Oops! Looks like you're lost...</p>
      </div>
    </div>
  );
};

export default NoMatch;
