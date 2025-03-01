import React, { useEffect, useCallback, useState, useRef } from "react";
import { Form, Button} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { chatActions } from "../../store/chatReducer";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [loginMode, setLoginMode] = useState('login');
    const [error, setError] = useState();
    const inputNameRef = useRef();
    const inputEmailRef = useRef();
    const inputPasswordRef = useRef();
    const inputPhonenoRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        let userData;
        if(loginMode === 'signup') {
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

    const loginHandler = useCallback( async (userData) => {
        const baseAPIUrl = `${process.env.REACT_APP_API_URL}`;
        let loginUrl, payload;
        if(loginMode === 'signup') {
            loginUrl = baseAPIUrl+ "/api/signup";
            payload = {
                email: userData.email,
                password: userData.password,
                name: userData.name,
                phoneno: userData.phoneno,
            };
        } else {
            loginUrl = baseAPIUrl+ "/api/login"
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
            dispatch(chatActions.setUserId());
            history.replace('/group');
        }
        if(data.error) {
            setError(data.error.message);
        }
        if (loginMode === 'login' || loginMode === 'signup') {
            
        }
    },[loginMode, dispatch, history]);

    const switchLoginModeHandler = () => {
        if(loginMode === 'signup') {
            setLoginMode('login');
        } else {
            setLoginMode('signup');
        }
        setError('');
    }

    useEffect( () => {
        console.log('useEffect');
        console.log('Mode:', loginMode);
    },[loginMode]);



    return (
        <>
        <div className="container mt-5">
        <div className="card p-4">
        <h2 className="text-center mb-4">{loginMode === 'signup' ? 'Sign Up' : 'Login'}</h2>
        <Form onSubmit={submitHandler}>
        <div className="text-warning text-center mb-3">{error}</div>
            { loginMode === 'signup' && 
            <Form.Group className="text-dark mb-3">
                <Form.Control type="text" placeholder="Enter Name" ref={inputNameRef}/>
            </Form.Group>
            }
            <Form.Group className="text-dark mb-3">
                <Form.Control type="email" placeholder="Enter Email" ref={inputEmailRef}/>
            </Form.Group>
            <Form.Group className="text-dark mb-3">
                <Form.Control type="password" placeholder="Password" ref={inputPasswordRef}/>
            </Form.Group>
            { loginMode === 'signup' && 
            <Form.Group className="text-dark mb-3">
                <Form.Control type="number" placeholder="Phone no" ref={inputPhonenoRef}/>
            </Form.Group>
            }
            <Button variant="primary" type="submit" className="mt-2 w-100">
                {loginMode === 'signup' ? 'Sign Up': 'Login' }
            </Button>
            
            <Button onClick={switchLoginModeHandler} variant="link" className="mt-3 w-100 text-decoration-none">
                {(loginMode === 'signup') ? 'Already have an Account? Login' : 'Don\'t have an account? Signup' }
            </Button>
        </Form>
        </div>
        </div>
        </>
    );
}

export default Login;
