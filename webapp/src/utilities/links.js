import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  { id: 1, text: "Profile", path: "profile", icon: <ImProfile /> },
  { id: 2, text: "Manage Jobs", path: "add-job", icon: <FaWpforms /> },
  { id: 3, text: "View All Jobs", path: "all-jobs", icon: <MdQueryStats /> },
  { id: 4, text: "Job Analysis", path: "/", icon: <IoBarChartSharp /> },
];

export default links;
