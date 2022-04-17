import { SHOW_ALERT, HIDE_ALERT } from "./actions";

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
  throw new Error(`not a valid action :${action.type}`);
};
export default reducer;
