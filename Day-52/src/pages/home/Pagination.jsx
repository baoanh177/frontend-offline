import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

function Pagination({currentPage, totalPage, setCurrentPage}) {

    return <div className="pagination-wrapper">
        <ResponsivePagination
          current={currentPage}
          total={totalPage}
          onPageChange={setCurrentPage}
        />
    </div>
}

export default Pagination