'use client';
import React, { Fragment } from 'react';
import { useAuth } from '@/context/auth';

const UserLayout = ({ children }) => {
  const { auth } = useAuth();
  return (
    <Fragment>
      {auth?.token && auth?.user?.role === 'Subscriber' ? (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-3'>
              <nav className='d-flex justify-content-center bg-light mb-2'></nav>
            </div>
            <div className='col-lg-9'>{children}</div>
          </div>
        </div>
      ) : (
        <p className='d-flex justify-content-center align-itmes-center vh-100 text-danger'>
          Access Restricted
        </p>
      )}
    </Fragment>
  );
};

export default UserLayout;
