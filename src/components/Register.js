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

    const handleRegister = () => {
        createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
        ).then(auth => console.log("User Successfully Registered"))
        navigate('/login')
            .catch(err => console.log(err));
    };
    return (
            <>
            <Container className="mt-5 d-flex justify-content-center">
            <Card style={{width: '23rem', height: '25rem'}} className="rounded border border-warning border-2">
                <CardBody >
                <h1 className="text-center">Register</h1>
                <Input
                    className='mt-5'
                    placeholder="Email"
                    value={registerEmail}
                    onChange={(event) => {
                        setRegisterEmail(event.target.value);
                    }}
                />
                <Input
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