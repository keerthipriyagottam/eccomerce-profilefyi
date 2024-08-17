'use client'

import './../styles/globals.css'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

const Navbar = ({pageType,cartItemCount}) => {
    const router = useRouter();

    const handleLogout=()=>{
        localStorage.clear();
        router.push('/login');
    }

  return (
    <div className='w-full h-20 bg-slate-500 flex gap-6 items-center justify-end p-6'>
        <div className='justify-self-start'>
            {pageType==='loggedIn' &&
                <Link href='/home'>
                    <button className='hover:bg-slate-600 rounded p-2 text-white text-lg font-bold'>Home</button>
                </Link>
            }
        </div>
        <div className='flex gap-6 ml-auto'>
            {pageType==='loggedIn' &&
                <Link className='flex' href="/cart">
                    <FontAwesomeIcon icon={faShoppingCart} size="2x" color='white' />
                    <span className='w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center self-end'> {cartItemCount?cartItemCount:0} </span>
                </Link>
            }

            {pageType==='loggedIn' &&
                <Link href="/login">
                    <button className='bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600' onClick={()=>handleLogout()}>Logout</button>
                </Link>
            }
                
            {pageType==='register' &&
                <Link href="/login">
                    <button className='bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600'>Login</button>
                </Link>
            }
            
            {pageType==='login' &&
                <Link href="/register">
                    <button className='bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600'>Sign up</button>
                </Link>
            }
        </div>
    </div>
  )
}

export default Navbar