// components/SearchComponent.js
import React from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { motion } from "framer-motion";
import { Search } from "react-bootstrap-icons";

// Animation variants for button and input
const buttonVariants = {
  hover: { scale: 1.05, backgroundColor: '#ffffff', color: '#000000' },
  tap: { scale: 0.95 },
};

const inputVariants = {
  focus: { scale: 1.02, boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)" },
  blur: { scale: 1, boxShadow: "none" }
};

function SearchComponent({ searchText, setSearchText, onSearch }) {
  return (
    <div className="mb-4">
      <InputGroup
        className="shadow-sm"
        style={{ borderRadius: "10px", overflow: "hidden" }}
      >
        <InputGroup.Text
          className="bg-dark text-white"
          style={{
            background: 'linear-gradient(135deg, #000000, #C0C0C0)',
            border: 'none',
          }}
        >
          <Search />
        </InputGroup.Text>
        <motion.div
          initial="blur"
          whileFocus="focus"
          variants={inputVariants}
        >
          <Form.Control
            type="text"
            placeholder="Search students by name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="shadow-sm"
            style={{
              borderRadius: "0 5px 5px 0",
              border: 'none',
              boxShadow: 'none',
            }}
          />
        </motion.div>
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            variant="primary"
            onClick={onSearch}
            className="shadow-sm ms-2"
            style={{
              background: 'linear-gradient(135deg, #000000, #C0C0C0)',
              border: 'none',
              color: '#ffffff',
              borderRadius: '5px',
            }}
          >
            Search
          </Button>
        </motion.div>
      </InputGroup>
    </div>
  );
}

export default SearchComponent;
