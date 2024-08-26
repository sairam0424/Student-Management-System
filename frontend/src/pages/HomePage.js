import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button'; // Importing Button from MUI

const Homepage = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Welcome to School Management System</h1>
            <p>
                Streamline school management, class organization, and add students and faculty.
                Seamlessly track attendance, assess performance, and provide feedback.
                Access records, view marks, and communicate effortlessly.
            </p>

            <div>
                {/* Login Button */}
                <Link to="/choose" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" fullWidth>
                        Login
                    </Button>
                </Link>

                {/* Login as Guest Button */}
                <Link to="/chooseasguest" style={{ textDecoration: 'none', marginTop: '20px', display: 'block' }}>
                    <Button
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2, mb: 3, color: "#7f56da", borderColor: "#7f56da" }}
                    >
                        Login as Guest
                    </Button>
                </Link>

                {/* Sign up Link */}
                <p>
                    Don't have an account?{' '}
                    <Link to="/Adminregister" style={{ color: "#550080" }}>
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Homepage;
