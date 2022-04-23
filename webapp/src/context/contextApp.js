import React, { useReducer, useContext, useEffect } from "react";
import reducer from "./reducer";
import axios from "axios";
import {
  SHOW_ALERT,
  HIDE_ALERT,
  REGISTER_USER_START,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_ERROR,
  LOGIN_USER_ERROR,
  LOGIN_USER_START,
  LOGIN_USER_SUCCESSFUL,
  SETUP_USER_START,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESSFUL,
  TOGGLE_SIDEBAR,
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
  GET_JOBS_SUCCESS
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
  statusOptions: ["Interview Scheduled", "Rejected", "Awaiting Response"],
  status: "Awaiting Response",
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
};

const ContextApp = React.createContext();

const ProviderApp = ({ children }) => {
  // const [state, setState] = useState(State);
  const [state, dispatch] = useReducer(reducer, State);

  //setting up instances in axios library
  const authFetch = axios.create({
    baseURL: "/api/v1",
    // headers: {
    //   Authorization: `Bearer ${state.token}`,
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
      //console.log(error.response);
      if (error.response.status === 401) {
        //console.log("AUTHENTICATION ERROR");
        logoutUser();
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

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };

  const userRegistration = async (currentUser) => {
    // console.log(currentUser);
    dispatch({ type: REGISTER_USER_START });
    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);
      console.log(response);
      const { user, token, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESSFUL,
        payload: {
          user,
          token,
          location,
        },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    hideAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_START });
    try {
      const { data } = await axios.post("/api/v1/auth/login", currentUser);

      const { user, token, location } = data;
      dispatch({
        type: LOGIN_USER_SUCCESSFUL,
        payload: {
          user,
          token,
          location,
        },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      //console.log(error.response);
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    hideAlert();
  };

  const setupUser = async ({ currentUser, endPoint, alertMsg }) => {
    dispatch({ type: SETUP_USER_START });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );

      const { user, token, location } = data;
      dispatch({
        type: SETUP_USER_SUCCESSFUL,
        payload: {
          user,
          token,
          location,
          alertMsg,
        },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      //console.log(error.response);
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    hideAlert();
  };
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
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

      addUserToLocalStorage({ user, location, token });
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

  const handleChange = ({name, value}) => {
    dispatch({type: HANDLE_CHANGE, payload: {name, value}})
  }

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES})
  }

  const createJob = async () => {
    dispatch({type:CREATE_JOB_BEGIN})
    try{
      const {position, company,jobLocation,jobType,status} = state
      await authFetch.post("/jobs",{
        position,
        company,
        jobLocation,
        jobType,
        status
      })
      dispatch({type:CREATE_JOB_SUCCESS})
      dispatch({type:CLEAR_VALUES})
    } catch (error){
      if(error.response.status === 401) return
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: {msg: error.response.data.msg},
      })
      hideAlert()
    }
  }
  
    
    const getJobs = async () => {
      let url = '/jobs'
      dispatch({type:GET_JOBS_BEGIN})
      try{
        const{data} = await authFetch(url);
        const{jobs, totalJobs, numOfPages} = data
        dispatch({
          type: GET_JOBS_SUCCESS,
          payload: {
            jobs,
            totalJobs,
            numOfPages,
          },
        })
      } catch(error){
        console.log(error.response)
        // logoutUser()
      }
      hideAlert()
    }

  useEffect(() => {
    getJobs()
  }, [])

  const setEditJob =(id) => {
    console.log(`set edit job : ${id}`)
  }

  const deleteJob =(id) => {
    console.log(`delete job : ${id}`)
  }

  return (
    <ContextApp.Provider
      value={{
        ...state,
        showAlert,
        userRegistration,
        loginUser,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        deleteJob
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