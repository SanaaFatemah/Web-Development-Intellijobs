import "../sass/JobDetails.scss";

const JobInfo = ({ icon, text }) => {
  return (
    <div className="jInfoCom">
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </div>
  );
};

export default JobInfo;
