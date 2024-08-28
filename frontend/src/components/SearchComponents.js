// components/SearchComponent.js
import React from 'react';
import { Form, Button } from 'react-bootstrap';

function SearchComponent({ searchText, setSearchText, onSearch }) {
  return (
    <div className="mb-4">
      <Form.Control
        type="text"
        placeholder="Search students by name..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="mr-2"
      />
      <Button variant="primary" onClick={onSearch} className="mt-2">
        Search
      </Button>
    </div>
  );
}

export default SearchComponent;
