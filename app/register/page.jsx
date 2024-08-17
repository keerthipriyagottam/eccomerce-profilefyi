'use client'

import Navbar from '@/components/Navbar'
import { useState } from "react";
import { useRouter } from 'next/navigation';

const page = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !email || !name) {
        setError('All fields are required');
        return;
    }

    try {
        const endpoint = 'http://localhost:8080/user/register';
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const result = await response.json();

        if (response.ok) {
          setName('');
          setEmail('');
          setPassword('');
          router.push('/login');
        } else {
          console.error('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
  };
  return (
    <div className='flex flex-col h-screen'>
      <Navbar pageType='register'/>
      <div className='bg-stone-100 rounded-md center p-8 w-96 mx-auto my-auto justify-self-center'>
        <form onSubmit={handleSubmit}className='flex flex-col'>
        <div className="flex flex-col mb-4">
            <label htmlFor="name" className='text-gray-700 font-semibold'>Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='border border-gray-300 rounded-md p-2'
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className='text-gray-700 font-semibold'>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='border border-gray-300 rounded-md p-2'
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="password" className='text-gray-700 font-semibold'>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='border border-gray-300 rounded-md p-2'
            />
          </div>
          <button type="submit" className='bg-slate-500 hover:bg-slate-600 text-white py-2 px-4 rounded'>Register</button>
        </form>
      </div>
    </div>
  )
}

export default page