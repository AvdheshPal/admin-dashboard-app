import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulate user login state

    return (
        <>
            <nav className="bg-gray-800 text-white">
                <div className="container mx-auto px-4 flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold">
                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="h-8 w-auto"
                            />
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link
                            to="/blogs"
                            className="hidden md:block px-4 py-2 hover:bg-gray-700 rounded-md"
                        >
                            Blogs
                        </Link>
                        {isLoggedIn ? (
                            <div
                                className="flex items-center cursor-pointer"
                                onClick={() => alert("Navigate to Profile")}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>

                            </div>
                        ) : (
                            <button
                                onClick={() => alert("Navigate to Login")}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Page Content */}
            <div className="container mx-auto p-4">
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
