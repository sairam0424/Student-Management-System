import React, { lazy, Suspense, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../gqlopertions/mutations";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { useUser } from "../customHooks/UserContext";
import { Helmet } from "react-helmet";
import { EnvelopeFill } from "react-bootstrap-icons";
import { RiLockPasswordLine } from "react-icons/ri"; // Importing a custom icon

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
        style={{
          background: "linear-gradient(135deg, #000000, #C0C0C0)",
          overflow: "hidden",
        }}
      >
        <Row className="w-100 justify-content-center">
          <Col
            md={8}
            lg={6}
            xl={4}
            className="p-4 position-relative"
            as={motion.div}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              background: "rgba(255, 255, 255, 0.1)", // Glassmorphism effect
              borderRadius: "15px",
              border: "1px solid rgba(255, 255, 255, 0.2)", // Glass border
              backdropFilter: "blur(15px)", // Glass blur effect
              WebkitBackdropFilter: "blur(15px)", // Safari support for backdrop-filter
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)", // Deep shadow for glow effect
              overflow: "hidden", // Prevent overflow for effects
              position: "relative", // For pseudo-elements
            }}
          >
            {/* Neon Glow Effect */}
            <div
              style={{
                position: "absolute",
                top: "-20px",
                left: "-20px",
                right: "-20px",
                bottom: "-20px",
                borderRadius: "20px",
                background:
                  "linear-gradient(135deg, #000000, #C0C0C0)", // Updated to use the same gradient
                filter: "blur(20px)",
                zIndex: "-1",
              }}
            ></div>

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
              <h3 className="text-center mb-4" style={{ color: "#ffffff" }}>
                Login
              </h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label style={{ color: "#dcdcdc" }}>
                    <EnvelopeFill className="me-2" /> Email address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    onChange={handleChange}
                    required
                    className="rounded-pill border-0 shadow-sm"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      color: "#ffffff",
                      backdropFilter: "blur(5px)", // Blur effect inside the input
                      border: "1px solid rgba(255, 255, 255, 0.3)", // Light border
                      transition: "border 0.3s ease",
                    }}
                    as={motion.input}
                    whileFocus={{
                      border: "1px solid #007bff",
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label style={{ color: "#dcdcdc" }}>
                    <RiLockPasswordLine className="me-2" /> Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    onChange={handleChange}
                    required
                    className="rounded-pill border-0 shadow-sm"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      color: "#ffffff",
                      backdropFilter: "blur(5px)", // Blur effect inside the input
                      border: "1px solid rgba(255, 255, 255, 0.3)", // Light border
                      transition: "border 0.3s ease",
                    }}
                    as={motion.input}
                    whileFocus={{
                      border: "1px solid #007bff",
                    }}
                  />
                </Form.Group>

                <Button
                  variant="light"
                  type="submit"
                  className="w-100 mt-3 rounded-pill"
                  as={motion.button}
                  whileHover={{
                    scale: 1.05,
                    background:
                      "linear-gradient(135deg, #000000, #C0C0C0)", // Hover effect with same gradient
                    color: "#ffffff",
                    boxShadow: "0 0 20px rgba(0, 0, 0, 0.7)", // Deep glow effect
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: 'linear-gradient(135deg, #000000, #C0C0C0)', // Gradient for login button
                    border: "none",
                    color: "#ffffff",
                    transition: "background 0.3s ease",
                    fontWeight: "bold",
                  }}
                >
                  Login
                </Button>
              </Form>
              <div className="text-center mt-4">
                <p className="mb-0" style={{ color: "#ffffff" }}>
                  Don't have an account?
                </p>
                <Button
                  variant="link"
                  onClick={() => navigate("/signup")}
                  className="p-0 text-white"
                  as={motion.button}
                  whileHover={{ scale: 1.1, color: "#0056b3" }}
                  style={{
                    color: "#007bff",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
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
