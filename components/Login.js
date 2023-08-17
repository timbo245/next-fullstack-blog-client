'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  // access context
  const { auth, setAuth } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/login`,
        {
          email,
          password
        }
      );

      localStorage.setItem('auth', JSON.stringify(data));
      setLoading(false);
      setAuth(data);
      router.push(
        data?.user?.role === 'Admin' ? '/admin/dashboard/blog/bloglist' : '/'
      );
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.error);
      console.log(error);
    }
  };

  return (
    <div className='container'>
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className='row border border-light border-1 border-secondary rounded shadow pb-5 pt-5'>
          <h2 className='mb-3 text-center'>Login</h2>
          <form action='' onSubmit={handleSubmit}>
            <input
              type='email'
              className='form-control mb-3'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='Enter your email'
            />
            <input
              type='password'
              className='form-control mb-3'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Create a Password'
            />
            <div className='d-grid'>
              <button
                className='btn btn-primary text-align-center'
                disabled={loading || !email || !password}
              >
                {loading ? (
                  <div className='spinner-border spinner-border-sm text-light'>
                    <span className='visually-hidden'></span>
                  </div>
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
