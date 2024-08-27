import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../gqlopertions/mutations';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [signinUser, { data, loading, error }] = useMutation(LOGIN_USER);

    if (loading) return <div className="text-center mt-5"><h1>Loading...</h1></div>;
    if (data) {
        localStorage.setItem("token", data.user.token);
        console.log("role", data.user.role);
        if (data.user.role === 'admin') {
            navigate('/admindashboard');
        } else {
            navigate('/userdashboard');
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signinUser({
            variables: {
                userSignin: formData
            }
        });
    };

    return (
        <Container className="my-5">
            {error && <Alert variant="danger">{error.message}</Alert>}
            <h3 className="text-center mb-4">Login</h3>
            <Form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Login
                </Button>
            </Form>
        </Container>
    );
}
