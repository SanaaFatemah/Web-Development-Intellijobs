import { useContextApp } from "../context/contextApp";
import { useEffect } from "react";
import Loading from "./Loading";
import Job from "./Job";
import "../sass/JobContainer.scss";

const JobsContainer = () => {
  const {
    getJobs,
    jobs,
    isLoading,
    page,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
  } = useContextApp();

  useEffect(() => {
    getJobs();
  }, [search, searchStatus, searchType, sort]);
  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <div className="jobContaier">
        <h2>No Jobs to Display...</h2>
      </div>
    );
  }

  return (
    <div className="jobContaier">
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {/*pagination buttons*/}
    </div>
  );
};

export default JobsContainer;
