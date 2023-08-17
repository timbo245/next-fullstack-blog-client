'use client';
import React from 'react';
import { useAuth } from '@/context/auth';

const UserPage = () => {
  const { auth } = useAuth();
  return (
    <div>
      <h1>User Page</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </div>
  );
};

export default UserPage;
