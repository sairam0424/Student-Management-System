import React, { lazy, Suspense, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../gqlopertions/mutations";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { useUser } from "../customHooks/UserContext";
import { Helmet } from "react-helmet";
import { EnvelopeFill, LockFill } from "react-bootstrap-icons";

// Lazy load components
const Shimmer = lazy(() => import("../components/Shimmer"));

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useUser();
  const [signinUser, { data, loading, error }] = useMutation(LOGIN_USER);

  if (loading)
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Shimmer />
      </Suspense>
    );

  if (data) {
    const { token, role } = data.user;
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setUser({ role });
    navigate(role === "admin" ? "/admindashboard" : "/userdashboard");
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signinUser({
      variables: {
        userSignin: formData,
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>Login | Your App Name</title>
        <meta
          name="description"
          content="Login to Your App Name to access your account. Secure and easy login for all users."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Login | Your App Name" />
        <meta
          property="og:description"
          content="Login to Your App Name to access your account. Secure and easy login for all users."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourappname.com/login" />
      </Helmet>
      <Container
        fluid
        className="d-flex align-items-center justify-content-center min-vh-100"
        style={{ background: 'linear-gradient(135deg, #000000, #C0C0C0)' }}
      >
        <Row className="w-100 justify-content-center">
          <Col 
            md={8} lg={6} xl={4}
            className="p-4 rounded"
            style={{
              background: 'linear-gradient(135deg, #f0f0f0, #d3d3d3)',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
              borderRadius: '15px'
            }}
          >
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
              <h3 className="text-center mb-4" style={{ color: '#333' }}>Login</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label style={{ color: '#555' }}>
                    <EnvelopeFill className="me-2" /> Email address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                    required
                    className="rounded-pill border-0 shadow-sm"
                    style={{ backgroundColor: "#ffffff", borderColor: '#ddd' }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label style={{ color: '#555' }}>
                    <LockFill className="me-2" /> Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    required
                    className="rounded-pill border-0 shadow-sm"
                    style={{ backgroundColor: "#ffffff", borderColor: '#ddd' }}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mt-3 rounded-pill"
                  as={motion.button}
                  whileHover={{ scale: 1.05, backgroundColor: '#0069d9' }}
                  whileTap={{ scale: 0.95 }}
                  style={{ backgroundColor: '#007bff', border: 'none' }}
                >
                  Login
                </Button>
              </Form>
              <div className="text-center mt-4">
                <p className="mb-0">Don't have an account?</p>
                <Button
                  variant="link"
                  onClick={() => navigate("/signup")}
                  className="p-0"
                  as={motion.button}
                  whileHover={{ scale: 1.1, color: '#0069d9' }}
                  style={{ color: '#007bff', textDecoration: 'none' }}
                >
                  Sign Up
                </Button>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
