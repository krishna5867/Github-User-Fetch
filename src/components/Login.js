import React, { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase-config";
import { Button, Input, Container, Card, CardBody } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function App() {
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [error, setError] = useState();

    //login using email and Id
    const handleLogin = () => {
        if (loginEmail !== "" && loginPassword !== "") {
            signInWithEmailAndPassword(auth, loginEmail, loginPassword)
                .then(e => navigate('/'))
                .catch(e => {
                    let errMsg = e.code.split("auth/")[1];
                    if (errMsg === "wrong-password") {
                        setError("The password is invalid");
                    } else if (errMsg === "user-not-found") {
                        setError("There is no user record corresponding to this email");
                    } else {
                        setError(errMsg);
                    }
                })
        } else {
            setError("Please enter email and password");
        }
    };

    //login with Google
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then(() => {
                toast.success("Successfully logged in with Google!");
                setTimeout(() => {
                    navigate('/')
                }, 1000);
            })
            .catch((error) => {
                toast.error("Error logging in with Google!");
                console.error(error);
            });
    };


    return (
        <>
            <Container className="mt-5 d-flex justify-content-center">
                <Card style={{ width: '23rem', height: '25rem' }} className='rounded border border-2 border-warning'>
                    <CardBody>
                        <h1 className="text-center">Login</h1>
                        {error !== "" ? <div className="text-danger text-center">{error}</div> : null}
                        <Input
                            type="text"
                            placeholder="Enter Registered Email Here..."
                            className='mt-3'
                            value={loginEmail}
                            onChange={(event) => {
                                setLoginEmail(event.target.value);
                            }}
                        />
                        <Input
                            type="password"
                            className='mt-4'
                            placeholder="Enter Password..."
                            value={loginPassword}
                            onChange={(event) => {
                                setLoginPassword(event.target.value);
                            }}
                        />
                        <Button className='mt-4 w-100 btn btn-warning' onClick={handleLogin}> Login</Button>
                        <Button className='mt-4 w-100 bg-light text-dark' onClick={signInWithGoogle}>
                            <i className="fab fa-google mx-3"></i>Sign In With Google</Button>
                        <p className="mt-4">Don't have Account <Link to='/createuser'>Create Account</Link></p>
                    </CardBody>
                </Card>
                <ToastContainer position="top-right" />
            </Container>
        </>
    );
}

export default App;
