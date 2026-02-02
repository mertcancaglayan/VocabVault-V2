import { useAppContext } from "../../hooks/useAppContext"
import "./Pagination.css"

function Pagination() {
    const { page, setPage, pageCount } = useAppContext()

    function handlePrev() {
        setPage((page) => {
            if (page === 1) return page
            return page - 1
        })
    }

    function handleNext() {
        setPage((page) => {
            if (page === pageCount) return page
            return page + 1
        })
    }

    return (
        <div className="pagination-container">
            <button onClick={handlePrev} disabled={page === 1}>Previous</button>
            <div className="page-btns">
                {Array.from({ length: pageCount }, (_, index) => {
                    const pageNumber = index + 1

                    return (
                        <button
                            key={pageNumber}
                            onClick={() => setPage(pageNumber)}
                            disabled={page === pageNumber}
                            className="page-btn"
                        >
                            {pageNumber}
                        </button>
                    )
                })}
            </div>
            <button onClick={handleNext} disabled={page === pageCount}>Next</button>
        </div>
    )
}

export default Pagination