'use client';
import React, { useEffect } from 'react';
// import axios from 'axios';
import BlogCard from '@/components/BlogCard';

const fecthBlogs = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/blogs`, {
    next: {
      revalidate: 1
    }
  });
  const data = await response.json();
  return data;
};

const Home = async () => {
  useEffect(() => {}, [fecthBlogs()]);
  const blogs = await fecthBlogs();
  return (
    <div className='container'>
      <div className='row'>
        {blogs.map(blog => {
          return <BlogCard blog={blog} />;
        })}
      </div>
    </div>
  );
};

export default Home;
