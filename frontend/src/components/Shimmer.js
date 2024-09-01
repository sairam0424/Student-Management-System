/* This code snippet is a React component that creates a loading placeholder UI using shimmer animation
effects. Here's a breakdown of what the code does: */
import React, { memo } from "react";
import { Placeholder, Card, Row, Col, Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

// Define shimmer animation variants outside component
const shimmerAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: [0, 1] },
  transition: { duration: 1.5, repeat: Infinity, repeatType: "reverse" },
};

// Static styles
const containerStyle = {
  background: 'linear-gradient(135deg, #000000, #C0C0C0)',
  color: '#ffffff',
  minHeight: '100vh',
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
};

const placeholderStyle = {
  background: 'linear-gradient(135deg, #000000, #C0C0C0)',
};

const ShimmerCard = memo(() => (
  <Card className="shadow-sm border-0">
    <Card.Body>
      <motion.div
        variants={shimmerAnimation}
        initial="initial"
        animate="animate"
      >
        <Placeholder as="div" animation="glow">
          <Placeholder xs={12} style={{ ...placeholderStyle, height: '150px' }} />
          <Placeholder xs={12} className="mt-2" style={{ ...placeholderStyle, height: '20px' }} />
          <Placeholder xs={12} className="mt-2" style={{ ...placeholderStyle, height: '20px' }} />
        </Placeholder>
      </motion.div>
    </Card.Body>
  </Card>
));

const Shimmer = () => {
  return (
    <>
      <Helmet>
        <title>Loading | Your App Name</title>
        <meta name="description" content="Loading placeholder for Your App Name." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Container className="mt-5" style={containerStyle}>
        {/* Header Shimmer */}
        <Row className="mb-4 align-items-center">
          <Col xs={12} md={4} className="d-flex align-items-center">
            <motion.div
              variants={shimmerAnimation}
              initial="initial"
              animate="animate"
            >
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6} style={placeholderStyle} />
                  </Placeholder>
                  <Placeholder
                    as={Card.Subtitle}
                    animation="glow"
                    className="mb-3"
                  >
                    <Placeholder xs={4} style={placeholderStyle} />
                  </Placeholder>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Placeholder.Button
                      variant="primary"
                      xs={6}
                      className="w-100"
                      style={{
                        ...placeholderStyle,
                        border: 'none',
                        color: '#ffffff',
                        cursor: 'pointer',
                      }}
                    />
                  </motion.div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          <Col xs={12} md={4} className="text-center">
            <motion.h1
              className="text-3xl font-bold text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ color: '#ffffff' }}
            >
              <Placeholder as="div" animation="glow">
                <Placeholder xs={12} style={placeholderStyle} />
              </Placeholder>
            </motion.h1>
          </Col>

          <Col xs={12} md={4} className="d-flex align-items-center justify-content-end">
            <div style={{ marginTop: '15px' }}>
              <motion.div
                variants={shimmerAnimation}
                initial="initial"
                animate="animate"
              >
                <Placeholder as="div" animation="glow">
                  <Placeholder xs={6} style={placeholderStyle} />
                </Placeholder>
              </motion.div>
            </div>
          </Col>
        </Row>

        {/* Student List Shimmer */}
        <Row>
          {[...Array(6)].map((_, idx) => (
            <Col xs={12} md={4} lg={3} key={idx} className="mb-4">
              <ShimmerCard />
            </Col>
          ))}
        </Row>

        {/* Additional Placeholder Rows */}
        <Row>
          {[...Array(3)].map((_, idx) => (
            <Col xs={12} md={4} key={idx} className="mb-4">
              <ShimmerCard />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default memo(Shimmer);
