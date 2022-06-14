import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ErrorPage() {
    return (
        <div>
            <h1>
                404
            </h1>
            <h2>
                We are sorry, page not found!
            </h2>
            <NavLink to="/">
                Go Back To Homepage
            </NavLink>
        </div>
    )
}
