import { FormInput, FormRowSelect } from ".";
import { useContextApp } from "../context/contextApp";
import Wrapper from "../assets/wrappers/SearchContainer";

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    handleChange,
    jobTypeOptions,
    statusOptions,
    clearSearch,
  } = useContextApp();

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearSearch();
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        {/* search position */}
        <div className="form-center">
          <FormInput
            labelText="Search:"
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          ></FormInput>

          {/* search by job application status */}

          <FormRowSelect
            labelText="Job Application Status:"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          ></FormRowSelect>

          {/* search by job Type */}

          <FormRowSelect
            labelText="Job Application Type:"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          ></FormRowSelect>

          {/* sort by job application status */}

          <FormRowSelect
            labelText="Sort Jobs By:"
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          ></FormRowSelect>

          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear Search
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
