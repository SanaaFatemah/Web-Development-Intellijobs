import { FormInput, AlertMessage } from "../../components";
import { useContextApp } from "../../context/contextApp";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddJob = () => {
  const {
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
  } = useContextApp();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
    console.log("create job");
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}:${value}`);
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Edit Job Status" : "Add New Job"}</h3>
        {displayAlert && <AlertMessage />}

        {/*HTML element for position field */}
        <div className="form-center">
          <FormInput
            type="text"
            name="position"
            labelText="Job Role"
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormInput
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormInput
            type="text"
            labelText="location"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* job type */}

          {/* job status */}

          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              //onClick={handleSubmit}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
