'use client';
import React, { Fragment } from 'react';
import Link from 'next/link';
import { FcReading } from 'react-icons/fc';

const BlogCard = ({ blog }) => {
  return (
    <div className='col-6' key={blog._id}>
      <div className='p-3 card mt-4'>
        <img
          src={`${process.env.NEXT_PUBLIC_API}/uploads/${blog.image}`}
          alt={blog.title}
          style={{ height: '200px', objectFit: 'cover' }}
          className='card-image-top shadow'
        />
        <div className='card-body'>
          <Link
            className='text-dark'
            style={{ textDecoration: 'none' }}
            href={`/blog/${blog.slug}`}
          >
            <h5 className='card-title'>{blog.title.substring(0, 50)}</h5>
          </Link>
          <p className='card-text'>
            {blog.content.replace(/<[^>]+>/g, ' ').substring(0, 60)}
          </p>
          <Link style={{ textDecoration: 'none' }} href={`/blog/${blog.slug}`}>
            <FcReading className='h2' /> Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
