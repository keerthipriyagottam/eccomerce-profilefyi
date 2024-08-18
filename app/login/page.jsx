'use client'

import Navbar from '@/components/Navbar'
import { useState } from "react";
import { useRouter } from 'next/navigation';

const page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !email) {
        setError('All fields are required');
        return;
    }

    try {
        const endpoint = `https://ecommerce-profilefyi-backend.onrender.com/user/login`;
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password, email }),
        });

        const result = await response.json();

        if (response.ok) {
            localStorage.setItem("userId",result.userId);
            setEmail('');
            setPassword('');
            router.push('/home');
        } else {
          console.error('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
  };

  return (
    <div className='flex flex-col h-screen'>
      <Navbar pageType='login'/>
      <div className='bg-stone-100 rounded-md center p-8 w-96 mx-auto my-auto justify-self-center'>
        <form onSubmit={handleSubmit}className='flex flex-col'>
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
          <button type="submit" className='bg-slate-500 hover:bg-slate-600 text-white py-2 px-4 rounded'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default page