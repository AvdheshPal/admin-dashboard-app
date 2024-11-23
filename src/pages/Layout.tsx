import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Logo from '../assets/admin-logo.png'

const Layout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const Navigate = useNavigate();

    return (
        <>
            <nav className="bg-gray-800 text-white">
                <div className="container mx-auto px-4 flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold">
                            <img
                                src={Logo}
                                alt="Logo"
                                className="h-12 w-auto"
                            />
                        </Link>
                    </div>

                    <Link to="/" className="text-2xl font-bold">
                        <div>Admin Dashboard</div>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-4">
                        {/* User Actions */}
                        {isLoggedIn ? (
                            <div
                                className="flex items-center cursor-pointer"
                                onClick={() => Navigate('/profile')}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                </svg>
                            </div>
                        ) : (
                            <Button
                                onClick={() => Navigate('/login')}
                                variant="contained"
                                color="primary"
                                size="medium"
                                className="w-auto"
                            >
                                Login
                            </Button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Page Content */}
            <div className="container mx-auto">
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
