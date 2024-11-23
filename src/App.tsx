import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Layout from "./pages/Layout";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={
                            <Home />
                    } />
                    <Route path="/profile" element={
                            <Profile />
                    } />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;
