import React from 'react';

const LoadingPage = () => {
  return (
    <div className='d-flex justify-content-center text-center align-items-center vh-100'>
      <div
        className='spinner-border text-danger'
        role='status'
        style={{ width: '3rem', height: '3rem' }}
      >
        <span className='visually-hidden'>Loading</span>
      </div>
    </div>
  );
};

export default LoadingPage;
