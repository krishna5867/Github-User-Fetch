import React from 'react'
import Login from "./Login"
import FetchUser from './FetchUsers'

import { auth } from "../firebase-config";
import { useAuthState } from 'react-firebase-hooks/auth';

const Home = () => {
    const [user] = useAuthState(auth);
    return (
        <>
        { user ? <FetchUser />: <Login /> }
        </>
    )
}

export default Home;