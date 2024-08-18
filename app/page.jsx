'use client'
import Link from 'next/link';
import './../styles/globals.css'
import { useEffect } from 'react';

// Component for initial instructions about the application.
const Page = () => {
    const backendHealthCheck=async()=>{
        try {
            const response = await fetch(`https://ecommerce-profilefyi-backend.onrender.com/health`,{
                method:'GET',
                headers:{'Content-Type': 'application/json'}
              });
            if(!response.ok) {
                alert('Some issue with backend server.')
            }
        } catch {
            alert('Error occured while trying to contact backend')
        }
    }

    useEffect(()=>{backendHealthCheck()},[]);
  return (
    <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100">
      <div className="bg-white p-4 rounded-lg shadow-xl">
        <p className="mb-4">
          Hello there! Welcome to my e-commerce application built as part of a job application for Frontend engineer at <strong className="text-teal-500"><Link href="https://profile.fyi">profile.fyi</Link></strong>. This page provides some important information.
        </p>
        <p className="mb-4">
          The backend is deployed on Render and may take some time to initialize. I have sent a health check request to make it hot while you read this.
        </p>
        <h1 className="text-3xl font-bold text-slate-500 mb-4">Features:</h1>
        <ul className="list-disc pl-6 mb-4">
          <li>Register a new user on the <strong className="text-teal-500">Register</strong> page.</li>
          <li>Sign in existing users on the <strong className="text-teal-500">Login</strong> page.</li>
          <li>View all available products on the <strong className="text-teal-500">Home</strong> page with an "Add to Cart" button. Hitting "Add to Cart" button will update the cart as well as show visual feedback to the user.</li>
          <li>Access the cart page by clicking the cart button on the navigation bar. The cart icon also shows the number of items present.</li>
          <li>Adjust item quantities on the cart page as needed.</li>
          <li>View the grand total of all items and enter coupon codes on the right half of the cart page.</li>
          <li>Use 'off10' for a fixed discount of 10 rupees and 'percent10' for a 10% discount.</li>
          <li>Click the "Place Order" button to clear the cart.</li>
          <li>Your cart content is persistent, allowing access across multiple sessions.</li>
        </ul>
        <h1 className="text-3xl font-bold text-slate-500 mb-4">Note:</h1>
        <p className="mb-4">
          Please be patient as Render may serve the APIs with higher latency. Updates may take a moment to appear after clicking buttons.
        </p>
      </div>
      <Link href='/login'>
        <button className="mt-6 px-4 py-2 text-white bg-slate-500 rounded-md text-lg font-semibold hover:bg-slate-600">
          Enter the application...
        </button>
      </Link>
    </div>
  );
};

export default Page;
