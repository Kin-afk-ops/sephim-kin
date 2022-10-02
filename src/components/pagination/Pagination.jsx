import "./pagination.scss";

const Pagination = (props) => {
  const { pagination, onPageChange } = props;
  const { page, totalPage } = pagination;

  const handleOnChange = (newPage) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  return (
    <div>
      <div className="pagination">
        <button
          className="paginationPrev"
          disabled={page <= 1}
          onClick={() => handleOnChange(page - 1)}
        >
          Trang trước
        </button>
        <button
          className="paginationNext"
          disabled={page >= totalPage}
          onClick={() => handleOnChange(page + 1)}
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default Pagination;
