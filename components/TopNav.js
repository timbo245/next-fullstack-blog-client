'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth';
import Link from 'next/link';
import { AiFillHome } from 'react-icons/ai';
import {
  BiSolidUser,
  BiSolidLogOutCircle,
  BiSolidLogInCircle
} from 'react-icons/bi';
import { FaUserPlus } from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';

const TopNav = () => {
  const { auth, setAuth } = useAuth();
  const router = useRouter();

  // Logout
  const logout = () => {
    setAuth(null);
    localStorage.removeItem('auth');
    router.push('/login');
  };

  return (
    <nav className='nav p-2 shadow mb-d'>
      <Link className='nav-link text-body' href='/'>
        <AiFillHome className='h4' /> Home
      </Link>
      {auth?.token ? (
        <div className='ms-auto d-flex '>
          <p className='navbar-text'>
            <BiSolidUser className='h4' />
            You are logged in as: {auth?.user?.name} &nbsp; &nbsp;
          </p>
          {auth?.user?.role === 'Admin' ? (
            <Link
              className='nav-link text-dark'
              href='/admin/dashboard/blog/create'
            >
              <RiAdminFill className='h4' />
              &nbsp; Admin Dashboard
            </Link>
          ) : (
            ''
          )}
          <p className='navbar-text'> &#x7c;</p>
          <div>
            <a onClick={logout} className='nav-link pointer text-dark'>
              <BiSolidLogOutCircle className='h4' /> Logout
            </a>
          </div>
        </div>
      ) : (
        <div className='ms-auto d-flex'>
          <Link className='nav-link text-dark' href='/login'>
            <BiSolidLogInCircle className='h4' /> Login
          </Link>
          <Link className='nav-link text-dark' href='/register'>
            <FaUserPlus className='h4' /> Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default TopNav;
