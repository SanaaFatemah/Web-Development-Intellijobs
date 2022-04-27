import React, { useReducer, useContext, useEffect } from "react";
import reducer from "./reducer";
import axios from "axios";
import {
  SHOW_ALERT,
  HIDE_ALERT,
  USER_REGISTRATION_START,
  USER_REGISTRATION_SUCCESSFUL,
  USER_REGISTRATION_ERROR,
  USER_LOGIN_ERROR,
  USER_LOGIN_START,
  USER_LOGIN_SUCCESSFUL,
  USER_SETUP_START,
  USER_SETUP_ERROR,
  USER_SETUP_SUCCESSFUL,
  SIDEBAR_TOGGLE,
  LOGOUT_USER,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESSFULL,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  STATS_SHOW_BEGIN,
  STATS_SHOW_SUCCESS,
  CLEAR_SEARCH,
  PAGE_CHANGE,
} from "./actions";

// set as default
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

const State = {
  isLoading: false,
  displayAlertMsg: false,
  alertMsg: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || " ",
  showSidebar: false,
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobLocation: userLocation || " ",
  jobTypeOptions: ["Full-Time", "Internship", "Hybrid", "Remote"],
  jobType: "Full-Time",
  statusOptions: [
    "Interview Scheduled",
    "Rejected",
    "Awaiting Response",
    "Accepted",
  ],
  status: "Awaiting Response",
  jobs: [],
  totalJobs: 0,
  pageNums: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: "",
  searchStatus: "All",
  searchType: "All",
  sort: "Latest",
  sortOptions: ["Latest", "oldest", "a-z", "z-a"],
};

const ContextApp = React.createContext();

const ProviderApp = ({ children }) => {
  // const [state, setState] = useState(State);
  const [state, dispatch] = useReducer(reducer, State);

  //setting up instances in axios library
  const authFetch = axios.create({
    baseURL: "/api/v1",
    // headers: {
    // Authorization: `Bearer ${state.token}`,
    // },
  });

  //setup axios request interceptor
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //setup axios request interceptor
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        console.log("AUTHENTICATION ERROR");
        userLogout();
      }
      return Promise.reject(error);
    }
  );

  const showAlert = () => {
    dispatch({ type: SHOW_ALERT });
    hideAlert();
  };

  const hideAlert = () => {
    setTimeout(() => {
      dispatch({ type: HIDE_ALERT });
    }, 3000);
  };

  const localStorageAddUser = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const localStorageRemoveUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };

  const userRegister = async (currentUser) => {
    // console.log(currentUser);
    dispatch({ type: USER_REGISTRATION_START });
    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);
      //console.log(response);
      const { user, token, location } = response.data;
      dispatch({
        type: USER_REGISTRATION_SUCCESSFUL,
        payload: {
          user,
          token,
          location,
        },
      });
      localStorageAddUser({ user, token, location });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: USER_REGISTRATION_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    hideAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: USER_LOGIN_START });
    try {
      const { data } = await axios.post("/api/v1/auth/login", currentUser);

      const { user, token, location } = data;
      dispatch({
        type: USER_LOGIN_SUCCESSFUL,
        payload: {
          user,
          token,
          location,
        },
      });
      localStorageAddUser({ user, token, location });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: USER_LOGIN_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    hideAlert();
  };

  const userSetup = async ({ currentUser, endPoint, alertMsg }) => {
    dispatch({ type: USER_SETUP_START });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );

      const { user, token, location } = data;
      dispatch({
        type: USER_SETUP_SUCCESSFUL,
        payload: {
          user,
          token,
          location,
          alertMsg,
        },
      });
      localStorageAddUser({ user, token, location });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: USER_SETUP_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    hideAlert();
  };
  const sideToggle = () => {
    dispatch({ type: SIDEBAR_TOGGLE });
  };

  const userLogout = () => {
    dispatch({ type: LOGOUT_USER });
    localStorageRemoveUser();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_START });
    try {
      const { data } = await authFetch.put("/auth/updateUser", currentUser);
      const { user, location, token } = data;
      dispatch({
        type: UPDATE_USER_SUCCESSFULL,
        payload: { user, location, token },
      });

      localStorageAddUser({ user, location, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    hideAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const valuesClear = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createNewJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.post("/jobs", {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    hideAlert();
  };
  const getAllJobs = async () => {
    const { page, search, searchStatus, searchType, sort } = state;
    //constructing the url with search query parameters
    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }

    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { jobs, totalJobs, pageNums } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          pageNums,
        },
      });
    } catch (error) {
      userLogout();
    }
    hideAlert();
  };

  // useEffect(() => {
  // getAllJobs()
  // }, [])

  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };

  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });

    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.put(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: EDIT_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    hideAlert();
  };

  const deleteJob = async (id) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/jobs/${id}`);
      getAllJobs();
    } catch (error) {
      userLogout();
    }
  };
  const clearSearch = () => {
    //console.log("clear filters");
    dispatch({ type: CLEAR_SEARCH });
  };

  const showStats = async () => {
    dispatch({ type: STATS_SHOW_BEGIN });
    try {
      const { data } = await authFetch("jobs/stats");
      dispatch({
        type: STATS_SHOW_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      userLogout();
    }
  };

  const pageChange = (page) => {
    dispatch({ type: PAGE_CHANGE, payload: { page } });
  };

  return (
    <ContextApp.Provider
      value={{
        ...state,
        showAlert,
        userRegister,
        loginUser,
        userSetup,
        sideToggle,
        userLogout,
        updateUser,
        handleChange,
        valuesClear,
        createNewJob,
        getAllJobs,
        setEditJob,
        editJob,
        deleteJob,
        showStats,
        clearSearch,
        pageChange,
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};

const useContextApp = () => {
  return useContext(ContextApp);
};

export { ProviderApp, State, useContextApp };
