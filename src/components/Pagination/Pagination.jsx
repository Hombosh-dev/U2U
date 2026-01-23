import React from 'react';
import './Pagination.css';

const FirstIcon = () => (<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" /></svg>);
const PrevIcon = () => (<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 18l-6-6 6-6" /></svg>);
const NextIcon = () => (<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 18l6-6-6-6" /></svg>);
const LastIcon = () => (<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M13 17l5-5-5-5M6 17l5-5-5-5" /></svg>);


const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages > 1 && currentPage > 2) {
      pages.push(1);
      if (currentPage > 3) {
        pages.push('...');
      }
    }

    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (totalPages > 1 && currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        pages.push('...');
      }
      pages.push(totalPages);
    } else if (currentPage === totalPages - 2) {
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  return (
    <div className="pagination-container">
      <button 
        className="pagination-button" 
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        <FirstIcon />
      </button>
      <button 
        className="pagination-button" 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <PrevIcon />
      </button>
      
      {getPageNumbers().map((page, index) => 
        typeof page === 'number' ? (
          <button 
            key={index}
            className={`pagination-button ${currentPage === page ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="pagination-button disabled">...</span>
        )
      )}

      <button 
        className="pagination-button" 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <NextIcon />
      </button>
      <button 
        className="pagination-button" 
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <LastIcon />
      </button>
    </div>
  );
};

export default Pagination;
