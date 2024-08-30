import React, { lazy, Suspense, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../gqlopertions/mutations';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useUser } from '../customHooks/UserContext';
import { Helmet } from 'react-helmet';

// Lazy load components
const Shimmer = lazy(() => import('../components/Shimmer'));

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { setUser } = useUser();
    const [signinUser, { data, loading, error }] = useMutation(LOGIN_USER);

    if (loading) return <Suspense fallback={<div>Loading...</div>}><Shimmer /></Suspense>;

    if (data) {
        const { token, role } = data.user;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        setUser({ role });
        navigate(role === 'admin' ? '/admindashboard' : '/userdashboard');
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
        <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <Helmet>
                <title>Login | Your App Name</title>
                <meta name="description" content="Login to Your App Name to access your account. Secure and easy login for all users." />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Login | Your App Name" />
                <meta property="og:description" content="Login to Your App Name to access your account. Secure and easy login for all users." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://yourappname.com/login" />
            </Helmet>
            <Row className="w-100 justify-content-center">
                <Col md={8} lg={6} xl={4} className="p-4 bg-white rounded shadow-sm">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {error && (
                            <Alert variant="danger" className="mb-4">
                                {error.message}
                            </Alert>
                        )}
                        <h3 className="text-center mb-4">Login</h3>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    onChange={handleChange}
                                    required
                                    className="rounded-pill border-0 shadow-sm"
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
                                    className="rounded-pill border-0 shadow-sm"
                                />
                            </Form.Group>

                            <Button 
                                variant="primary" 
                                type="submit" 
                                className="w-100 mt-3 rounded-pill shadow-sm"
                                as={motion.button}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Login
                            </Button>
                        </Form>
                    </motion.div>
                </Col>
            </Row>
        </Container>
    );
}
