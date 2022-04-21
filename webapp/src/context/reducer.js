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

import {State} from './contextApp'
//to handle the action type Sent from dispatch
const reducer = (state, action) => {
  //if action type is equal to showalert then the alert mesage flat is set to true
  if (action.type === SHOW_ALERT) {
    return {
      ...state,
      displayAlertMsg: true,
      alertType: "danger",
      alertMsg: "One or more fields are empty. provide all values!",
    };
  }
  //if action type is equal to showalert then the alert mesage flat is set to true
  if (action.type === HIDE_ALERT) {
    return {
      ...state,
      displayAlertMsg: false,
      alertType: "",
      alertMsg: "",
    };
  }

  if (action.type === REGISTER_USER_START) {
    return { ...state, isLoading: true };
  }

  if (action.type === REGISTER_USER_SUCCESSFUL) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      displayAlertMsg: true,
      alertType: "success",
      alertMsg: "Successfull user registration! Redirecting...",
    };
  }

  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      displayAlertMsg: true,
      alertType: "danger",
      alertMsg: action.payload.msg,
    };
  }

   if (action.type === LOGIN_USER_START) {
    return { ...state, isLoading: true };
  }

  if (action.type === LOGIN_USER_SUCCESSFUL) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      displayAlertMsg: true,
      alertType: "success",
      alertMsg: "Login successful! Redirecting...",
    };
  }

  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      displayAlertMsg: true,
      alertType: "danger",
      alertMsg: action.payload.msg,
    };
  }

  if (action.type === SETUP_USER_START) {
    return { ...state, isLoading: true };
  }

  if (action.type === SETUP_USER_SUCCESSFUL) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      displayAlertMsg: true,
      alertType: 'success',
      alertMsg: action.payload.alertMsg,
    };
  }

  if (action.type === SETUP_USER_ERROR) {
    return {
      ...State,
      isLoading: false,
      displayAlertMsg: true,
      alertType: "danger",
      alertMsg: action.payload.msg,
    };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
      
    };
  }
  if(action.type === LOGOUT_USER){
    return {...state, user:null, token:null, jobLocation:'', userLocation:''}
  }

  throw new Error(`not a valid action :${action.type}`);
};
export default reducer;
