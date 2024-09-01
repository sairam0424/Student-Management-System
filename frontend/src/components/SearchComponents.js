/**
 * The `SearchComponent` function is a React component that displays a search input field with a search
 * button, styled with animations and custom styles.
 * @returns The `SearchComponent` function component is being returned. It renders a search input field
 * with an associated button for searching students by name. The component utilizes various animations
 * and styles to enhance the user interface.
 */
import React, { memo, useCallback } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { motion } from "framer-motion";
import { Search } from "react-bootstrap-icons";

// Animation variants for button and input
const buttonVariants = {
  hover: { scale: 1.05, backgroundColor: "#ffffff", color: "#000000" },
  tap: { scale: 0.95 },
};

const inputVariants = {
  focus: { scale: 1.02, boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)" },
  blur: { scale: 1, boxShadow: "none" },
};

// Define styles outside of the component to avoid re-creation
const inputGroupTextStyle = {
  background: "linear-gradient(135deg, #000000, #C0C0C0)",
  border: "none",
};

const inputStyle = {
  borderRadius: "0 5px 5px 0",
  border: "none",
  boxShadow: "none",
};

const buttonStyle = {
  background: "linear-gradient(135deg, #000000, #C0C0C0)",
  border: "none",
  color: "#ffffff",
  borderRadius: "5px",
};

// The component itself
function SearchComponent({ searchText, setSearchText, onSearch }) {
  // Memoize the change handler to avoid unnecessary re-creations
  const handleInputChange = useCallback(
    (e) => setSearchText(e.target.value),
    [setSearchText]
  );

  return (
    <div className="mb-4">
      <InputGroup className="shadow-sm" style={{ borderRadius: "10px", overflow: "hidden" }}>
        <InputGroup.Text className="bg-dark text-white" style={inputGroupTextStyle}>
          <Search />
        </InputGroup.Text>
        <motion.div initial="blur" whileFocus="focus" variants={inputVariants}>
          <Form.Control
            type="text"
            placeholder="Search students by name..."
            value={searchText}
            onChange={handleInputChange}
            className="shadow-sm"
            style={inputStyle}
            aria-label="Search students by name"
          />
        </motion.div>
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button
            variant="primary"
            onClick={onSearch}
            className="shadow-sm ms-2"
            style={buttonStyle}
            aria-label="Search"
          >
            Search
          </Button>
        </motion.div>
      </InputGroup>
    </div>
  );
}

export default memo(SearchComponent);
