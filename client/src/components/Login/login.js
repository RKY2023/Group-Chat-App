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
        let userData;
        if(loginMode == 'signup') {
            userData = {
                email: inputEmailRef.current.value,
                password: inputPasswordRef.current.value,
                name: inputNameRef.current.value, 
                phoneno: inputPhonenoRef.current.value
            }    
        } else {
            userData = {
                email: inputEmailRef.current.value,
                password: inputPasswordRef.current.value,
            }
        }        
        console.log(userData)
        loginHandler(userData);

    }
    const [backendData, setBackendData] = useState();

    const loginHandler = useCallback( async (userData) => {
        let loginUrl, payload;
        if(loginMode == 'signup') {
            loginUrl = "http://localhost:5000/api/signup";
            payload = {
                email: userData.email,
                password: userData.password,
                name: userData.name,
                phoneno: userData.phoneno,
            };
        } else {
            loginUrl = "http://localhost:5000/api/login"
            payload = {
                email: userData.email,
                password: userData.password,
            }
        }
         
        const response = await  fetch(loginUrl, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        if(data.token) {
            localStorage.setItem('token', data.token);
        }
        if(data.error) {
            setError(data.error.message);
        }
        if (loginMode == 'login' || loginMode == 'signup') {
        // window.location.href = 'http://'+window.location.host+'/chat';
        }
    
        setBackendData(data);
    },[loginMode]);

    const switchLoginModeHandler = () => {
        if(loginMode == 'signup') {
            setLoginMode('login');
        } else {
            setLoginMode('signup');
        }
    }

    useEffect( () => {
        console.log('useEffect');
        console.log('Mode:', loginMode);
        // datafetcher();
    },[loginMode]);



    return (
        <>
        <div className="container">
        <div>{error}</div>
        <Form onSubmit={submitHandler}>
            { loginMode == 'signup' && 
            <Form.Group className="mt-2">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" ref={inputNameRef}/>
            </Form.Group>
            }
            <Form.Group className="mt-2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" ref={inputEmailRef}/>
            </Form.Group>
            <Form.Group className="mt-2">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={inputPasswordRef}/>
            </Form.Group>
            { loginMode == 'signup' && 
            <Form.Group className="mt-2">
                <Form.Label>Phone No</Form.Label>
                <Form.Control type="number" placeholder="Phone no" ref={inputPhonenoRef}/>
            </Form.Group>
            }
            <Button variant="primary" type="submit" className="mt-3">
                {loginMode == 'signup' ? 'Sign Up': 'Login' }
            </Button>
            <hr/>
            <Button onClick={switchLoginModeHandler} variant="success">
                {(loginMode == 'signup') ? 'Already have an Account? Login' : 'Don\'t have an account? Signup' }
            </Button>
        </Form>
        </div>
        </>
    );
}

export default Login;
