'use client';
import React, { Fragment } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth';

const AdminLayout = ({ children }) => {
  const { auth } = useAuth();

  return (
    <Fragment>
      {auth?.token && auth?.user?.role === 'Admin' ? (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-3'>
              <nav
                className='nav flex-column nav-pills mt-5'
                id='v-pills-tab'
                role='tablist'
                aria-orientation='vertical'
              >
                <Link
                  className='nav-link active'
                  id='v-pills-create-blog'
                  href='/admin/dashboard/blog/create'
                  role='tab'
                  aria-selected='true'
                >
                  Create Blog
                </Link>
                <Link
                  className='nav-link'
                  href='/admin/dashboard/blog/bloglist'
                >
                  Blogs List
                </Link>
              </nav>
            </div>
            <div className='col-lg-9'>{children}</div>
          </div>
        </div>
      ) : (
        <p className='d-flex justify-content-center align-items-center vh-100 text-danger'>
          Access Restricted
        </p>
      )}
    </Fragment>
  );
};

export default AdminLayout;
