import "./pagination.scss";
import ReactPaginate from "react-paginate";

const Pagination = ({
  totalMovie,
  moviesPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (var i = 1; i <= Math.ceil(totalMovie / moviesPerPage); i++) {
    pages.push(i);
  }

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <div>
      <div className="pagination">
        <div>
          <ReactPaginate
            className="paginationPage"
            previousLabel="<<"
            nextLabel=">>"
            breakLabel={"..."}
            pageCount={pages.length}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            activeClassName={"active"}
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
