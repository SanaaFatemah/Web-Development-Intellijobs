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

import { State } from "./contextApp";
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

  if (action.type === USER_REGISTRATION_START) {
    return { ...state, isLoading: true };
  }

  if (action.type === USER_REGISTRATION_SUCCESSFUL) {
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

  if (action.type === USER_REGISTRATION_ERROR) {
    return {
      ...state,
      isLoading: false,
      displayAlertMsg: true,
      alertType: "danger",
      alertMsg: action.payload.msg,
    };
  }

  if (action.type === USER_LOGIN_START) {
    return { ...state, isLoading: true };
  }

  if (action.type === USER_LOGIN_SUCCESSFUL) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      displayAlertMsg: true,
      alertType: "success",
      alertMsg: "Login successful! Please wait...",
    };
  }

  if (action.type === USER_LOGIN_ERROR) {
    return {
      ...state,
      isLoading: false,
      displayAlertMsg: true,
      alertType: "danger",
      alertMsg: action.payload.msg,
    };
  }

  if (action.type === USER_SETUP_START) {
    return { ...state, isLoading: true };
  }

  if (action.type === USER_SETUP_SUCCESSFUL) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      displayAlertMsg: true,
      alertType: "success",
      alertMsg: action.payload.alertMsg,
    };
  }

  if (action.type === USER_SETUP_ERROR) {
    return {
      ...State,
      isLoading: false,
      displayAlertMsg: true,
      alertType: "danger",
      alertMsg: action.payload.msg,
    };
  }
  if (action.type === SIDEBAR_TOGGLE) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...state,
      user: null,
      token: null,
      jobLocation: "",
      userLocation: "",
    };
  }

  if (action.type === UPDATE_USER_START) {
    return { ...state, isLoading: true };
  }

  if (action.type === UPDATE_USER_SUCCESSFULL) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      displayAlertMsg: true,
      alertType: "success",
      alertMsg: "User Profile Updated!",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      displayAlertMsg: true,
      alertType: "danger",
      alertMsg: action.payload.msg,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editJobId: "",
      position: "",
      company: "",
      jobLocation: state.userLocation,
      jobType: "Full-Time",
      status: "Awaiting Response",
    };
    return {
      ...state,
      ...initialState,
    };
  }
  if (action.type === CREATE_JOB_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      displayAlertMsg: true,
      alertType: "success",
      alertMsg: "New Job Created!",
    };
  }
  if (action.type === CREATE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      displayAlertMsg: true,
      alertType: "danger",
      alertMsg: action.payload.msg,
    };
  }
  if (action.type === GET_JOBS_BEGIN) {
    return { ...state, isLoading: true, displayAlertMsg: false };
  }
  if (action.type === GET_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      jobs: action.payload.jobs,
      totalJobs: action.payload.totalJobs,
      pageNums: action.payload.pageNums,
    };
  }
  if (action.type === SET_EDIT_JOB) {
    const job = state.jobs.find((job) => job._id === action.payload.id);
    const { _id, position, company, jobLocation, jobType, status } = job;
    return {
      ...state,
      isEditing: true,
      editJobId: _id,
      position,
      company,
      jobLocation,
      jobType,
      status,
    };
  }

  if (action.type === DELETE_JOB_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === EDIT_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      displayAlertMsg: true,
      alertType: "success",
      alertMsg: "Job Updated!",
    };
  }
  if (action.type === EDIT_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      displayAlertMsg: true,
      alertType: "danger",
      alertMsg: action.payload.msg,
    };
  }
  if (action.type === STATS_SHOW_BEGIN) {
    return {
      ...state,
      isLoading: true,
      displayAlertMsg: false,
    };
  }

  if (action.type === STATS_SHOW_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyApplications: action.payload.monthlyApplications,
    };
  }

  if (action.type === CLEAR_SEARCH) {
    return {
      ...state,
      search: "",
      searchStatus: "All",
      searchType: "All",
      sort: "Latest",
    };
  }

  if (action.type === PAGE_CHANGE) {
    return { ...state, page: action.payload.page };
  }

  throw new Error(`not a valid action :${action.type}`);
};
export default reducer;
