'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/auth';
import { BsTrash3 } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';

const BlogList = () => {
  const { auth } = useAuth();

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/blogs`);
      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async slug => {
    try {
      const answer = window.confirm('Are you sure?');
      if (answer) {
        const { data } = await axios.delete(
          `${process.env.NEXT_PUBLIC_API}/blog/${slug}`,
          {
            headers: {
              Authorization: auth?.token
            }
          }
        );
        toast.success(data.message);
        loadBlogs();
      }
    } catch (error) {
      toast.error('Something went wrong. Try again.');
    }
  };

  return (
    <div className='container'>
      <div className='row mt-5 text-center'>
        <h1>All Blogs</h1>
      </div>
      <div className='row'>
        <div className='col'>
          {blogs &&
            blogs.map(blog => {
              return (
                <div key={blog._id}>
                  <div className='d-flex  p-3 m-1 bg-light'>
                    <h2>{blog.title}</h2>

                    <div className='ms-auto'>
                      <Link
                        href={`/admin/dashboard/blog/edit/${blog.slug}`}
                        className='text-dark'
                        style={{ textDecoration: 'none' }}
                      >
                        <AiFillEdit
                          className='text-success'
                          style={{ cursor: 'pointer' }}
                        />{' '}
                      </Link>
                      &nbsp;
                      <BsTrash3
                        className='text-danger'
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDelete(blog.slug)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
