import React, { useState } from "react";
import {  Button, Input, Container, Card, CardBody } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";


import {
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase-config";

const Register = () => {
    const navigate = useNavigate();
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [error, setError] = useState("");
console.log(error);
    const handleRegister = () => {
        if(registerEmail !== "" && registerPassword !== ""){
            createUserWithEmailAndPassword(auth,registerEmail,registerPassword)
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                let errMsg = error.code.split("auth/")[1];
                setError(errMsg);
            });
        }
    };
    return (
            <>
            <Container className="mt-5 d-flex justify-content-center">
            <Card style={{width: '23rem', height: '25rem'}} className="rounded border border-warning border-2">
                <CardBody >
                <h1 className="text-center">Register</h1>
                {error !== "" ?<div className="text-danger text-center">{error}</div>: null}
                <Input
                type="email"
                    className='mt-5'
                    placeholder="Email"
                    value={registerEmail}
                    onChange={(event) => {
                        setRegisterEmail(event.target.value);
                    }}
                />
                <Input
                type="password"
                    className='mt-4'
                    placeholder="Password"
                    value={registerPassword}
                    onChange={(event) => {
                        setRegisterPassword(event.target.value);
                    }}
                />
                <Button className='mt-4 w-100 btn btn-warning' onClick={handleRegister}> Create User</Button>
                <p className="mt-4">Already have Account <Link to='/login'>Login</Link></p>
                </CardBody>
            </Card>
        </Container>
            </>
    )
}

export default Register;


// createUserWithEmailAndPassword(
//     auth,
//     registerEmail,
//     registerPassword
// ).then(auth => alert("User Successfully Registered"))
// navigate('/login')
//     .catch(err => console.log(err));