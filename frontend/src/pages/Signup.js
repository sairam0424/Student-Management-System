import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "../gqlopertions/mutations";
import { Container, Form, Button, Alert, ButtonGroup, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { PersonFill, EnvelopeFill, LockFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  });
  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (error) {
      if (error.message.includes("already exists")) {
        setErrorMessage(
          "An account with this email already exists. Please try logging in."
        );
      } else {
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
      }
    } else {
      setErrorMessage("");
    }
  }, [error]);

  useEffect(() => {
    if (data && data.user) {
      localStorage.setItem("role", data.user.role);
      setErrorMessage("");
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (role) => {
    setFormData({
      ...formData,
      role,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signupUser({
      variables: {
        userNew: formData,
      },
    }).catch((err) => {
      if (err.message.includes("already exists")) {
        setErrorMessage(
          "An account with this email already exists. Please try logging in."
        );
      } else {
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
      }
    });
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{ background: 'linear-gradient(135deg, #000000, #C0C0C0)', overflow: 'hidden' }}
    >
      <Helmet>
        <title>Signup | Your App Name</title>
        <meta
          name="description"
          content="Sign up for Your App Name to create a new account. Choose your role and get started."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Signup | Your App Name" />
        <meta
          property="og:description"
          content="Sign up for Your App Name to create a new account. Choose your role and get started."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourappname.com/signup" />
      </Helmet>
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
            <h3 className="text-center mb-4" style={{ color: "#ffffff" }}>
              Signup
            </h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label style={{ color: "#dcdcdc" }}>
                  <PersonFill className="me-2" /> First Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your first name"
                  name="firstName"
                  value={formData.firstName}
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

              <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label style={{ color: "#dcdcdc" }}>
                  <PersonFill className="me-2" /> Last Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your last name"
                  name="lastName"
                  value={formData.lastName}
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

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label style={{ color: "#dcdcdc" }}>
                  <EnvelopeFill className="me-2" /> Email address
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
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
                  <LockFill className="me-2" /> Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
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

              <Form.Group className="mb-3">
                <Form.Label className="text-light">Role</Form.Label>
                <ButtonGroup className="d-flex">
                  <Button
                    variant={
                      formData.role === "admin" ? "primary" : "outline-primary"
                    }
                    onClick={() => handleRoleChange("admin")}
                    className="flex-fill rounded-pill"
                    style={{
                      background: formData.role === "admin" ? 'linear-gradient(135deg, #000000, #C0C0C0)' : 'transparent',
                      color: formData.role === "admin" ? '#ffffff' : '#ffffff',
                      borderColor: formData.role === "admin" ? 'transparent' : '#ffffff',
                    }}
                  >
                    Admin
                  </Button>
                  <Button
                    variant={
                      formData.role === "user" ? "primary" : "outline-primary"
                    }
                    onClick={() => handleRoleChange("user")}
                    className="flex-fill rounded-pill"
                    style={{
                      background: formData.role === "user" ? 'linear-gradient(135deg, #000000, #C0C0C0)' : 'transparent',
                      color: formData.role === "user" ? '#ffffff' : '#ffffff',
                      borderColor: formData.role === "user" ? 'transparent' : '#ffffff',
                    }}
                  >
                    User
                  </Button>
                </ButtonGroup>
              </Form.Group>

              <Form.Group className="mb-3 text-center">
                <Link to="/login">
                  <Button variant="link" className="p-0 text-light">
                    Already have an account? Login
                  </Button>
                </Link>
              </Form.Group>

              <Button
                className="w-100 rounded-pill shadow-sm"
                variant="primary"
                type="submit"
                as={motion.button}
                whileHover={{ 
                  scale: 1.05,
                  background: 'linear-gradient(135deg, #000000, #C0C0C0)',
                  color: '#ffffff'
                }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
                style={{
                  background: 'linear-gradient(135deg, #000000, #C0C0C0)',
                  border: 'none',
                  color: '#ffffff',
                }}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </Form>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}
