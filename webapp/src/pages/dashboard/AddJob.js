import { FormInput, AlertMessage, FormRowSelect } from "../../components";
import { useContextApp } from "../../context/contextApp";
import "../../sass/DashboardPage.scss";

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    valuesClear,
    createNewJob,
    editJob,
  } = useContextApp();

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!position || !company || !jobLocation) {
    //   showAlert();
    //   return;
    // }
    if (isEditing) {
      editJob();
      return;
    }
    createNewJob();
  };

  const jobInputHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <div className="jobCommon">
      <form className="form">
        <h3>{isEditing ? "Edit Job Status" : "Add New Job"}</h3>
        {showAlert && <AlertMessage />}

        {/*HTML element for position field */}
        <div className="form-center">
          <FormInput
            type="text"
            name="position"
            labelText="Job Role"
            value={position}
            handleChange={jobInputHandle}
            placeholder="Enter a job role"
          />
          {/* company */}
          <FormInput
            type="text"
            name="company"
            value={company}
            handleChange={jobInputHandle}
            placeholder="Enter the company"
          />
          {/* location */}
          <FormInput
            type="text"
            labelText="location"
            name="jobLocation"
            value={jobLocation}
            handleChange={jobInputHandle}
            placeholder="Enter the job location"
          />
          {/* job status */}
          <FormRowSelect
            name="status"
            value={status}
            handleChange={jobInputHandle}
            list={statusOptions}
            placeholder="Enter the job status"
          />
          {/* job type */}
          <FormRowSelect
            name="jobType"
            labelText="Job type"
            value={jobType}
            handleChange={jobInputHandle}
            list={jobTypeOptions}
          />
          {/* btn container */}
          <div className="button-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                valuesClear();
                //console.log("hello")
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
