// components/SearchComponent.js
import React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Search } from 'react-bootstrap-icons';

// Animation variants for button
const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

function SearchComponent({ searchText, setSearchText, onSearch }) {
  return (
    <div className="mb-4">
      {/* InputGroup with inline styling for better alignment */}
      <InputGroup className="shadow-sm">
        <InputGroup.Text className="bg-primary text-white">
          <Search />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search students by name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="shadow-sm"
          style={{ borderRadius: '0 5px 5px 0' }} // Rounded only on right side
        />
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="d-inline"
        >
          <Button
            variant="primary"
            onClick={onSearch}
            className="shadow-sm ms-2" // Margin for spacing
            style={{ borderRadius: '5px' }} // Rounded corners for the button
          >
            Search
          </Button>
        </motion.div>
      </InputGroup>
    </div>
  );
}

export default SearchComponent;
