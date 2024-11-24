import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import { Toaster } from "sonner";

const App: React.FC = () => {
    return (
        <>
        <Toaster
         expand={false}
         position="top-right"
         richColors
         closeButton
          />
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
        </>
    );
};

export default App;
