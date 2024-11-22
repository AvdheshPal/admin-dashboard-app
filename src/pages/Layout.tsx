import React from 'react'
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/blogs">Blogs</Link>
                    </li>
                </ul>
            </nav>

            <div>
                <Outlet />
            </div>

        </>
    )
}

export default Layout
