import React, { useEffect, useCallback, useState, useReducer, useRef } from "react";
import { Row, Col, FormGroup, FormLabel, FormControl, Form, Button} from 'react-bootstrap';


const Login = () => {
    const [loginMode, setLoginMode] = useState('signup');
    const [error, setError] = useState();
    const inputNameRef = useRef();
    const inputEmailRef = useRef();
    const inputPasswordRef = useRef();
    const inputPhonenoRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        const userData = {
            email: inputEmailRef.current.value,
            password: inputPasswordRef.current.value,
            name: inputNameRef.current.value, 
            phoneno: inputPhonenoRef.current.value
        }
        console.log(userData)
        loginHandler(userData);

    }
    const [backendData, setBackendData] = useState();



    const loginHandler = useCallback( async (userData) => {
        
        const response = await  fetch("http://localhost:5000/api/signup", {
            method: "POST",
            body: JSON.stringify({
                email: userData.email,
                password: userData.password,
                name: userData.name,
                phoneno: userData.phoneno,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        if(data.error) {
            setError(data.error.message);
        }
        if (loginMode == 'login' || loginMode == 'signup') {
        window.location.href = 'http://'+window.location.host+'/chat';
        }
    
        setBackendData(data);
    },[])

    useEffect( () => {
        console.log('useEffect');
        // datafetcher();
    },[]);

    return (
        <>
        <div className="container">
        <div>{error}</div>
        <Form onSubmit={submitHandler}>
            <Form.Group className="mt-2">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" ref={inputNameRef}/>
            </Form.Group>
            <Form.Group className="mt-2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" ref={inputEmailRef}/>
            </Form.Group>
            <Form.Group className="mt-2">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={inputPasswordRef}/>
            </Form.Group>
            <Form.Group className="mt-2">
                <Form.Label>Phone No</Form.Label>
                <Form.Control type="number" placeholder="Phone no" ref={inputPhonenoRef}/>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
                {loginMode == 'signup' ? 'Sign Up': 'Login' }
            </Button>
        </Form>
        </div>
        </>
    );
}

export default Login;
