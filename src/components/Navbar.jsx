import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className='w-full h-24 bg-gray-900 text-white fixed top-0 z-10'>
            <div className='flex justify-between items-center font-bold leading-8'>
                <div className='ml-4  text-xl ' >Logo</div>
                <ul className=' flex justify-center gap-9 text-md' >
                    <li ><Link to="/">Home</Link></li>
                    <li ><Link to="/about">About</Link></li>
                    <li ><Link to="/contact">Contact</Link></li>
                    <li><Link to="/showData">Show Data</Link></li>
                    <li><Link to="/update-shop-data">Update Shop Data</Link></li>
                </ul>
                <form className="w-2/6 mr-4  text-xl" >
                    <label htmlFor="default-search" className="text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Hospitals..." required />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>
            </div>
        </nav>
    );
}

export default Navbar;
