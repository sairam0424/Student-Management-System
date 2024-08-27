import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../gqlopertions/mutations';

export default function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'user' // Default role
    });
    const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);

    if (loading) return <h1>Loading</h1>;

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
        <div className="container my-container">
            {error && <div className="red card-panel">{error.message}</div>}
            {data && data.user && (
                <div className="green card-panel">{data.user.firstName} is SignedUp. You can login now!</div>
            )}
            <h5>Signup!!</h5>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    // value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    // value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    // value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    // value={formData.password}
                    onChange={handleChange}
                    required
                />
                <div className="signup-role-buttons">
                        <button
                            type="button"
                            onClick={() => handleRoleChange('admin')}
                            className={`signup-role-button ${formData.role === 'admin' ? 'active' : ''}`}
                        >
                            Admin
                        </button>
                        <button
                            type="button"
                            onClick={() => handleRoleChange('user')}
                            className={`signup-role-button ${formData.role === 'user' ? 'active' : ''}`}
                        >
                            User
                        </button>
                    </div>
                <Link to="/login">
                    <p>Already have an account?</p>
                </Link>
                <button className="btn #673ab7 deep-purple" type="submit">Submit</button>
            </form>
        </div>
    );
}
