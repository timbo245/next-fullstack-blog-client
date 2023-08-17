import React from 'react';
import axios from 'axios';
import renderHTML from 'react-render-html';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';

dayjs.extend(relativeTime);

export async function generateMetadata({ params }) {
  const blog = await fetchBlog(params.slug);
  return {
    title: blog.title,
    description: blog.content.replace(/<[^>]+>/g, ' ').substring(0, 160)
  };
}

const fetchBlog = async slug => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/blog/${slug}`
  );
  return data;
};

const Blog = async ({ params }) => {
  const blog = await fetchBlog(params.slug);
  return (
    <div className='container'>
      <div className='row'>
        <h1 className='bg-light p-5 rounded-5 mt-4 text-center'>
          {blog.title}
        </h1>
      </div>
      <div class='row'>
        <img
          src={`${process.env.NEXT_PUBLIC_API}/uploads/${blog.image}`}
          alt={blog.title}
          className='card-img-top shadow img-thumbnail rounded-4 mb-2 p-3'
          style={{ height: '200px', objectFit: 'cover' }}
        />
      </div>
      <div className='row'>
        <p>
          Posted {dayjs(blog.createdAt).fromNow()} by {blog.postedBy.name} in
          category {blog.category}
        </p>
      </div>
      <div className='row'>
        <div className='col card bg-light p-4 my-4'>
          {renderHTML(blog.content)}
        </div>
      </div>
      <div className='text-center mb-5'>
        <Link href='/'>Back to home</Link>
      </div>
    </div>
  );
};

export default Blog;
