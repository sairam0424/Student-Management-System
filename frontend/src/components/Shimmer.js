import React from "react";
import { Placeholder, Card, Row, Col, Container, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const shimmerAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: [0, 1] },
  transition: { duration: 1.5, repeat: Infinity, repeatType: "reverse" },
};

const Shimmer = () => {
  return (
    <>
      <Helmet>
        <title>Loading | Your App Name</title>
        <meta name="description" content="Loading placeholder for Your App Name." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Container
        className="mt-5"
        style={{
          background: 'linear-gradient(135deg, #000000, #C0C0C0)',
          color: '#ffffff',
          minHeight: '100vh',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
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
                    <Placeholder xs={6} style={{ background: 'linear-gradient(135deg, #000000, #C0C0C0)' }} />
                  </Placeholder>
                  <Placeholder
                    as={Card.Subtitle}
                    animation="glow"
                    className="mb-3"
                  >
                    <Placeholder xs={4} style={{ background: 'linear-gradient(135deg, #000000, #C0C0C0)' }} />
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
                        background: 'linear-gradient(135deg, #000000, #C0C0C0)',
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
                <Placeholder xs={12} style={{ background: 'linear-gradient(135deg, #000000, #C0C0C0)' }} />
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
                  <Placeholder xs={6} style={{ background: 'linear-gradient(135deg, #000000, #C0C0C0)' }} />
                </Placeholder>
              </motion.div>
            </div>
          </Col>
        </Row>

        {/* Student List Shimmer */}
        <Row>
          {[...Array(6)].map((_, idx) => (
            <Col xs={12} md={4} lg={3} key={idx} className="mb-4">
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <motion.div
                    variants={shimmerAnimation}
                    initial="initial"
                    animate="animate"
                  >
                    <Placeholder as="div" animation="glow">
                      <Placeholder xs={12} style={{ background: 'linear-gradient(135deg, #000000, #C0C0C0)', height: '150px' }} />
                      <Placeholder xs={12} className="mt-2" style={{ background: 'linear-gradient(135deg, #000000, #C0C0C0)', height: '20px' }} />
                      <Placeholder xs={12} className="mt-2" style={{ background: 'linear-gradient(135deg, #000000, #C0C0C0)', height: '20px' }} />
                    </Placeholder>
                  </motion.div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Additional Placeholder Rows */}
        <Row>
          {[...Array(3)].map((_, idx) => (
            <Col xs={12} md={4} key={idx} className="mb-4">
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <motion.div
                    variants={shimmerAnimation}
                    initial="initial"
                    animate="animate"
                  >
                    <Placeholder as="div" animation="glow">
                      <Placeholder xs={12} style={{ background: 'linear-gradient(135deg, #000000, #C0C0C0)', height: '150px' }} />
                      <Placeholder xs={12} className="mt-2" style={{ background: 'linear-gradient(135deg, #000000, #C0C0C0)', height: '20px' }} />
                      <Placeholder xs={12} className="mt-2" style={{ background: 'linear-gradient(135deg, #000000, #C0C0C0)', height: '20px' }} />
                    </Placeholder>
                  </motion.div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Shimmer;
