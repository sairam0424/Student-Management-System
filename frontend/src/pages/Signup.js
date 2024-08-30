import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../gqlopertions/mutations';
import { Container, Form, Button, Alert, ButtonGroup, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'user'
    });
    const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Handle GraphQL error
        if (error) {
            if (error.message.includes('already exists')) {
                setErrorMessage('An account with this email already exists. Please try logging in.');
            } else {
                setErrorMessage('An unexpected error occurred. Please try again later.');
            }
        } else {
            // Clear error message if no error
            setErrorMessage('');
        }
    }, [error]);

    useEffect(() => {
        // Handle successful signup
        if (data && data.user) {
            localStorage.setItem("role", data.user.role); // Store the role in localStorage
            setErrorMessage(''); // Clear error message on success
        }
    }, [data]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRoleChange = (role) => {
        setFormData({
            ...formData,
            role
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signupUser({
            variables: {
                userNew: formData
            }
        }).catch((err) => {
            // Catch and handle any additional errors from the mutation
            if (err.message.includes('already exists')) {
                setErrorMessage('An account with this email already exists. Please try logging in.');
            } else {
                setErrorMessage('An unexpected error occurred. Please try again later.');
            }
        });
    };

    return (
        <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <Helmet>
                <title>Signup | Your App Name</title>
                <meta name="description" content="Sign up for Your App Name to create a new account. Choose your role and get started." />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Signup | Your App Name" />
                <meta property="og:description" content="Sign up for Your App Name to create a new account. Choose your role and get started." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://yourappname.com/signup" />
            </Helmet>
            <Row className="w-100 justify-content-center">
                <Col md={8} lg={6} xl={4} className="p-4 bg-white rounded shadow-sm">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {errorMessage && (
                            <Alert variant="danger" className="mb-4">
                                {errorMessage}
                            </Alert>
                        )}
                        {data && data.user && (
                            <Alert variant="success" className="mb-4">
                                {data.user.firstName} is signed up. You can login now!
                            </Alert>
                        )}
                        <h3 className="text-center mb-4">Signup</h3>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your first name"
                                    name="firstName"
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your last name"
                                    name="lastName"
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    name="email"
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password"
                                    name="password"
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Role</Form.Label>
                                <ButtonGroup className="d-flex flex-wrap">
                                    <Button
                                        variant={formData.role === 'admin' ? 'primary' : 'outline-primary'}
                                        onClick={() => handleRoleChange('admin')}
                                        className="flex-fill mb-2"
                                    >
                                        Admin
                                    </Button>
                                    <Button
                                        variant={formData.role === 'user' ? 'primary' : 'outline-primary'}
                                        onClick={() => handleRoleChange('user')}
                                        className="flex-fill mb-2"
                                    >
                                        User
                                    </Button>
                                </ButtonGroup>
                            </Form.Group>

                            <Form.Group className="mb-3 text-center">
                                <Link to="/login">
                                    <Button variant="link">Already have an account? Login</Button>
                                </Link>
                            </Form.Group>

                            <Button className="w-100" variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </motion.div>
                </Col>
            </Row>
        </Container>
    );
}
