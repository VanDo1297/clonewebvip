import React from 'react'
import ReactPaginate  from 'react-paginate';

import './style.css';
const Panigations = ({
    activePage = 0,
    length,
    handlePageChange,
    total,
    customStyle,
    pageRangeDisplayed = 5,
  }) => {
    const totalPage =
      total % length !== 0 ? Math.ceil(total / length) : total / length;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-5" >
            <div
              className="dataTables_info"
              id="titleTable_info"
              role="status"
              aria-live="polite"
            >
              {/* Showing {from + 1} to{' '}
              {total > from + length ? from + length : total} of {total} entries */}
            </div>
          </div>
          <div className="col-sm-12 col-md-7" style={{paddingLeft:"70px"}}>
            <div
              className="dataTables_paginate paging_simple_numbers"
              id="MainTable_paginate"
              style={
                customStyle ? { display: 'flex', justifyContent: 'flex-end' } : {}
              }
            >
              <ReactPaginate
                pageCount={totalPage}
                pageRangeDisplayed={pageRangeDisplayed}
                marginPagesDisplayed={1}
                previousLabel="Previous"
                nextLabel="Next"
                breakClassName="page-item"
                pageClassName="page-item"
                previousClassName="page-item"
                nextClassName="page-item"
                pageLinkClassName="page-link"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                onPageChange={handlePageChange}
                breakLabel={<p className="page-link">...</p>}
                containerClassName={'pagination'}
                forcePage={activePage}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default  React.memo(Panigations)