// src/layouts/Layout.tsx

import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/Store";
import Navbar from "../components/Navbar";

const Layout: React.FC = () => {
    const { token: isLoggedIn } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    return (
        <>
            <Navbar />
            <div className="container mx-auto">
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
