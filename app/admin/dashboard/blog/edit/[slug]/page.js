import React from 'react';
import axios from 'axios';
import BlogForm from '@/components/BlogForm';

const fecthBlog = async slug => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/blog/${slug}`
  );
  return data;
};

const BlogEdit = async ({ params }) => {
  const blog = await fecthBlog(params.slug);
  return (
    <div className='container mb-5 mt-5'>
      <div className='row'>
        <h1 className='bg-light p5 rounded-5'>Edit Blog</h1>
      </div>
      <div className='row'>
        <div className='col'>
          <img
            src={`${process.env.NEXT_PUBLIC_API}/uploads/${blog.image}`}
            alt={blog.title}
            style={{ height: '200px', objectFit: 'cover' }}
            className='card-img-top img-thumbnail rounded-5 mb-2'
          />
          <BlogForm blog={blog} />
        </div>
      </div>
    </div>
  );
};

export default BlogEdit;
