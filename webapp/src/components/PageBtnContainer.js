import { useContextApp } from "../context/contextApp";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";

const PageBtnContainer = () => {
  const { pageNums, page, pageChange } = useContextApp();

  const pages = Array.from({ length: pageNums }, (_, index) => {
    return index + 1;
  });
  console.log(pages);
  const pageNext = () => {
    let pageNew = page + 1;
    if (pageNew === pageNums) {
      pageNew = 1;
    }
    pageChange(pageNew);
  };
  const prevPage = () => {
    let pageNew = page - 1;
    if (pageNew < 1) {
      pageNew = pageNums;
    }
    pageChange(pageNew);
  };
  return (
    <Wrapper>
      <button className="previous-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        previous
      </button>
      <div className="button-container">
        {pages.map((pageNumber) => {
          return (
            <button
              type="button"
              className={pageNumber === page ? "pageBtn active" : "pageBtn"}
              key={pageNumber}
              onClick={() => pageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button className="next-btn" onClick={pageNext}>
        Next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
