import { Action } from "history";
import { SHOW_ALERT } from "./action";

const reducer = (state, action) => {
  if (action.type === SHOW_ALERT) {
    return {
      ...state,
      displayAlert: true,
      alertType: "danger",
      alertMsg: "One or more fields are empty. provide all values!",
    };
  }
  throw new Error(`not a valid action :${action.type}`);
};
export default reducer;
