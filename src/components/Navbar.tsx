import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import Logo from "../assets/admin-logo.png";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/Store";
import { clearToken } from "../Redux/features/authSlice";

const Navbar: React.FC = () => {
    const { token: isLoggedIn } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
    const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

    const handleLogout = () => {
        dispatch(clearToken());
    };

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

                    {/* Admin Dashboard Title */}
                    <Link to="/" className="hidden lg:flex text-2xl font-bold">
                        <div>Admin Dashboard</div>
                    </Link>

                    {/* Hamburger Menu (Mobile View) */}
                    <div className="lg:hidden flex items-center" onClick={toggleMobileMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </div>

                    {/* Navigation Links (Desktop View) */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {isLoggedIn ? (
                            <>
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
                                <Button
                                    onClick={handleLogout}
                                    variant="contained"
                                    color="primary"
                                    size="medium"
                                    className="w-auto"
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Button
                                onClick={() => console.log("Go to Login")}
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

            {/* Mobile Drawer */}
            <div
                className={`lg:hidden fixed top-0 right-0 w-64 h-full bg-gray-800 text-white transition-transform transform ${
                    showMobileMenu ? "translate-x-0" : "translate-x-full"
                } p-4`}
            >
                <div className="flex justify-between items-center mb-6">
                    <Link to="/" className="text-2xl font-bold">
                        <img src={Logo} alt="Logo" className="h-12 w-auto" />
                    </Link>
                    <button onClick={toggleMobileMenu} className="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div>
                    {isLoggedIn && (
                        <>
                            <Link to="/profile" className="block py-2" onClick={toggleMobileMenu}>
                                Profile
                            </Link>
                            <Button
                                onClick={handleLogout}
                                variant="contained"
                                color="primary"
                                size="medium"
                                className="w-full py-2 mt-4"
                            >
                                Logout
                            </Button>
                        </>
                    )}
                    {!isLoggedIn && (
                        <Button
                            onClick={() => console.log("Go to Login")}
                            variant="contained"
                            color="primary"
                            size="medium"
                            className="w-full py-2 mt-4"
                        >
                            Login
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
