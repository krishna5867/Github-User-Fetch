import React, { useState } from "react";
import {signInWithEmailAndPassword,} from "firebase/auth";
import { auth } from "../firebase-config";
import {  Button, Input, Container, Card, CardBody } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";


function App() {
    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const handleLogin = () => {
        signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
        ).then(auth =>
            console.log("User Successfully Login"))
            navigate('/')
            .catch(err => console.log("err"));
    };

    return (
        <>
        <Container className="mt-5 d-flex justify-content-center">
            <Card style={{width: '22rem', height: '23rem'}} className='rounded border border-2 border-warning'>
                <CardBody>
                <h1 className="text-center">Login</h1>
                <Input
                    placeholder="Enter Registered Email Here..."
                    className='mt-5'
                    value={loginEmail}
                    onChange={(event) => {
                        setLoginEmail(event.target.value);
                    }}
                />
                <Input
                    className='mt-4'
                    placeholder="Enter Password..."
                    value={loginPassword}
                    onChange={(event) => {
                        setLoginPassword(event.target.value);
                    }}
                />
                <Button className='mt-4 w-100 btn btn-warning' onClick={handleLogin}> Login</Button>
                <p className="mt-4">Don't have Account <Link to='/createuser'>Create Account</Link></p>
                </CardBody>
            </Card>
        </Container>
                
        </>
    );
}

export default App;