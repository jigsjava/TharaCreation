import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import debounce from 'lodash.debounce';
import { SearchIcon } from '../assets/icons';

const SearchForm = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearch = debounce((query) => {
    onSearch(query);
  }, 100); // Adjust the debounce delay as needed

  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery]);

  return (
    <Form className="d-flex align-items-center w-25 my-4" style={{borderRadius:'6px',border:'1px solid #c2c2c2'}}>
      <span className='ms-2'><SearchIcon /></span>
      <Form.Control
      style={{border:0,fillOpacity:0}}
        type="text"
        placeholder="Search by category name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="me-2"
      />
    </Form>
  );
};

export default SearchForm;
