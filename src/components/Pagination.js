import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationComponent = ({ page, totalPages, handlePageClick }) => {
  return (
    <Pagination>
      <Pagination.First onClick={() => handlePageClick(1)} />
      <Pagination.Prev
        disabled={page === 1}
        onClick={() => handlePageClick(page - 1)}
      />
      {Array.from({ length: totalPages }, (_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === page}
          onClick={() => handlePageClick(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        disabled={page >= totalPages}
        onClick={() => handlePageClick(page + 1)}
      />
      <Pagination.Last onClick={() => handlePageClick(totalPages)} />
    </Pagination>
  );
};

export default PaginationComponent;
