/**
 * The `NavBar` component in this code snippet is a React functional component that renders a
 * navigation bar with login/logout and signup links based on the presence of a token in local storage.
 * @returns The `NavBar` component is being returned. It is a functional component that renders a
 * navigation bar using various components and styles from libraries like React Bootstrap, Framer
 * Motion, and React Icons. The navigation bar includes links for Home, Login, and Signup, as well as a
 * Logout button if a token is present in the local storage. The component also includes SEO metadata
 * using the `Helmet` component.
 */
import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { PersonCircle, BoxArrowRight, BoxArrowInRight } from "react-bootstrap-icons";
import { FaHome } from "react-icons/fa";
import { Helmet } from "react-helmet";

export default function NavBar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Memoize the handleLogout function to avoid re-creation
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  }, [navigate]);

  // Define styles and hover effects outside of JSX to avoid recreating them
  const buttonStyle = {
    background: "linear-gradient(135deg, #333333, #7f8c8d)",
    border: "none",
    color: "#FFFFFF",
    fontWeight: "bold",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  };

  const buttonHoverStyle = {
    background: "linear-gradient(135deg, #7f8c8d, #333333)",
  };

  const buttonLeaveStyle = {
    background: "linear-gradient(135deg, #333333, #7f8c8d)",
  };

  return (
    <>
      <Helmet>
        <title>Home SMS</title>
        <meta name="description" content="Home SMS application" />
        {/* Add other SEO tags here */}
      </Helmet>
      <Navbar style={{ background: "linear-gradient(135deg, #000000, #C0C0C0)", color: "#FFFFFF" }} variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ color: "#FFFFFF" }}>
            <FaHome className="me-2" />
            Home SMS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" />
            <Nav className="ms-auto">
              {token ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Button
                    variant="outline-light"
                    onClick={handleLogout}
                    className="d-flex align-items-center btn-custom"
                    style={buttonStyle}
                    onMouseEnter={(e) => {
                      e.target.style.background = buttonHoverStyle.background;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = buttonLeaveStyle.background;
                    }}
                    aria-label="Logout"
                  >
                    <BoxArrowRight className="me-2" />
                    Logout
                  </Button>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Nav.Link
                      as={Link}
                      to="/login"
                      style={{ color: "#FFFFFF" }}
                      aria-label="Login"
                    >
                      <PersonCircle className="me-2" />
                      Login
                    </Nav.Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Nav.Link
                      as={Link}
                      to="/signup"
                      style={{ color: "#FFFFFF" }}
                      aria-label="Signup"
                    >
                      <BoxArrowInRight className="me-2" />
                      Signup
                    </Nav.Link>
                  </motion.div>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
