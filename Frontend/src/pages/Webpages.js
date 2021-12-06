import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/* Pages import */
import UserListPage from '../pages/UserListPage';
import LoginPage from '../pages/LoginPage';

/** User local storage data */
import UserProfile from '../models/UserProfile';

/**
 * Route pages
 */
const Webpages = () => {

    if(!UserProfile) {
        document.location.href = "/login";
    }

    return(
        <Router>
            <Routes>
                <Route exact path="/" element= {<UserListPage />} />
                <Route path = "/login" element = {<LoginPage />} />
            </Routes>
        </Router>
    );
};

export default Webpages;