import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  PersonCircle,
  BoxArrowRight,
  BoxArrowInRight,
} from "react-bootstrap-icons";
import { FaHome } from "react-icons/fa";
import { Helmet } from "react-helmet";


export default function NavBar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const navbarStyle = {
    background: "linear-gradient(135deg, #000000, #C0C0C0)",
    color: "#FFFFFF",
  };

  return (
    <>
      <Helmet>
        <title>Home SMS</title>
        <meta name="description" content="Home SMS application" />
        {/* Add other SEO tags here */}
      </Helmet>
      <Navbar style={navbarStyle} variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ color: "#FFFFFF" }}>
            <FaHome className="me-2" />
            Home SMS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav className="ms-auto">
              {token ? (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    variant="danger"
                    onClick={handleLogout}
                    className="d-flex align-items-center btn-custom"
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
