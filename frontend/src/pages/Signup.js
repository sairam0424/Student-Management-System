import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../gqlopertions/mutations';
import { Container, Form, Button, Alert, ButtonGroup } from 'react-bootstrap';

export default function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'user'
    });
    const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);

    if (loading) return <div className="text-center mt-5"><h1>Loading...</h1></div>;

    // Store role in localStorage if signup is successful
    if (data && data.user) {
        localStorage.setItem("role", data.user.role); // Store the role in localStorage
    }

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
        });
    };

    return (
        <Container className="my-5" style={{ maxWidth: '500px' }}>
            {error && <Alert variant="danger">{error.message}</Alert>}
            {data && data.user && (
                <Alert variant="success">{data.user.firstName} is signed up. You can login now!</Alert>
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
                    <ButtonGroup className="d-flex">
                        <Button
                            variant={formData.role === 'admin' ? 'primary' : 'outline-primary'}
                            onClick={() => handleRoleChange('admin')}
                            className="flex-fill"
                        >
                            Admin
                        </Button>
                        <Button
                            variant={formData.role === 'user' ? 'primary' : 'outline-primary'}
                            onClick={() => handleRoleChange('user')}
                            className="flex-fill"
                        >
                            User
                        </Button>
                    </ButtonGroup>
                </Form.Group>

                <Form.Group className="mb-3 text-center">
                    <Link to="/login">
                        <Button variant="link">Already have an account?</Button>
                    </Link>
                </Form.Group>

                <Button className="w-100" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}
