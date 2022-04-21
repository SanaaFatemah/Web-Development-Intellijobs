import React, { useReducer, useContext } from "react";
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
  LOGOUT_USER
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
  jobLocation: userLocation || " ",
  showSidebar: false,

};

const ContextApp = React.createContext();

const ProviderApp = ({ children }) => {
  // const [state, setState] = useState(State);
  const [state, dispatch] = useReducer(reducer, State);

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
      const {data} = await axios.post("/api/v1/auth/login", currentUser);
      
      const { user, token, location } = data;
      dispatch({
        type: LOGIN_USER_SUCCESSFUL,
        payload: {
          user,
          token,
          location
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
  }

  const setupUser = async ({currentUser, endPoint, alertMsg}) => {
    dispatch({ type: SETUP_USER_START });
    try {
      const {data} = await axios.post(`/api/v1/auth/${endPoint}`, currentUser);
      
      const { user, token, location } = data;
      dispatch({
        type: SETUP_USER_SUCCESSFUL,
        payload: {
          user,
          token,
          location,
          alertMsg
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
  }
  const toggleSidebar = () =>{
    dispatch ({type : TOGGLE_SIDEBAR})
  }

  const logoutUser= () => {
    dispatch({type:LOGOUT_USER})
    removeUserFromLocalStorage()
  }

  return (
    <ContextApp.Provider
      value={{
        ...state,
        showAlert,
        userRegistration, loginUser, setupUser, toggleSidebar, logoutUser
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
