'use client';
import React, { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth';
import axios from 'axios';
import ReactQuill from 'react-quill';

import { toast } from 'react-hot-toast';
import 'react-quill/dist/quill.snow.css';

const BlogForm = params => {
  // Context
  const { auth } = useAuth();
  // State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (!params) {
      console.log('No Params');
    }
    loadBlogs(params);
  }, []);

  const loadBlogs = async params => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/blog/${params.blog.slug}`
      );
      setTitle(data.title);
      setCategory(data.category);
      setContent(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async e => {
    console.log(params);
    if (!params.blog) {
      console.log('Hitme');
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);
        formData.append('image', image);

        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/blog/create`,
          formData,
          {
            headers: {
              Authorization: `${auth?.token}`
            }
          }
        );
        toast.success('Blog created successfully.');
        router.push('/admin');
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error);
      }
    } else {
      console.log('Edit');
      e.preventDefault();
      try {
        const { slug } = params.blog;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);
        formData.append('image', image);

        const { data } = await axios.put(
          `${process.env.NEXT_PUBLIC_API}/blog/${slug}`,
          formData,
          {
            headers: {
              Authorization: `${auth?.token}`
            }
          }
        );
        toast.success('Blog updated successfully.');
        router.push('/admin/dashboard/blog/bloglist');
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error);
      }
    }
  };

  const handleEdit = async e => {};

  return (
    <Fragment>
      <div className='container'>
        <input
          type='text'
          className='form-control mb-2'
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder='Enter blog title'
        />
        <ReactQuill
          style={{ height: '250px' }}
          theme='snow'
          value={content}
          onChange={setContent}
        />
        <input
          type='text'
          style={{ marginTop: '55px' }}
          className='form-control mb-2'
          value={category}
          onChange={e => setCategory(e.target.value)}
          placeholder='Enter blog category'
        />
        <label className='btn btn-secondary'>
          Upload Image
          <input
            type='file'
            onChange={e => setImage(e.target.files[0])}
            accept='image/*'
            hidden
          />
        </label>
        {image && (
          <img
            src={URL.createObjectURL(image)}
            style={{ width: '150px', margin: '10px' }}
          ></img>
        )}
        <button
          type='submit'
          className='btn btn-primary mx-2'
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </Fragment>
  );
};

export default BlogForm;
