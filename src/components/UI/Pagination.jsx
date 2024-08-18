import React, { useState } from 'react';
import '../../styles/pagination.css';

const Pagination = ({ currentPage, postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} className={currentPage === number ? 'page-link active' : 'page-link'}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
