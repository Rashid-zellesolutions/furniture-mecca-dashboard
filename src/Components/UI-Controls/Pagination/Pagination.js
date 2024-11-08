import React from 'react';
import './Pagination.css';
import ActiveNavLeft from '../../../Assets/Images/Active-Navigator-Left 15 x 15.png';
import ActiveNavRight from '../../../Assets/Images/Active-Navigator-Right 15 x 15.png';
import InactiveNavLeft from '../../../Assets/Images/InActive-Navigator-Left 15 x 15.png';
import InactiveNavRight from '../../../Assets/Images/InActive-Navigator-Right 15 x 15.png';

const CustomPagination = ({ rowsPerPage, rowCount, currentPage, onChangePage }) => {
  const totalPages = Math.ceil(rowCount / rowsPerPage);
  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, rowCount);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="custom-pagination-container">
      <div className="custom-pagination-info">
          <span className="entries-display">{`${startRow} - ${endRow}`}</span> of {rowCount}
      </div>
      <div className="custom-pagination-nav">
        <button
          className="pagination-btn"
          disabled={isFirstPage}
          onClick={() => onChangePage(currentPage - 1)}
        >
          <img
            src={isFirstPage ? InactiveNavLeft : ActiveNavLeft}
            alt="Previous"
            className="pagination-icon"
          />
        </button>
        <button
          className="pagination-btn"
          disabled={isLastPage}
          onClick={() => onChangePage(currentPage + 1)}
        >
          <img
            src={isLastPage ? InactiveNavRight : ActiveNavRight}
            alt="Next"
            className="pagination-icon"
          />
        </button>
      </div>
    </div>
  );
};

export default CustomPagination;
