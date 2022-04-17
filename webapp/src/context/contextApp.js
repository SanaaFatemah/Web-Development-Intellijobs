import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import { SHOW_ALERT, HIDE_ALERT } from "./actions";
const State = {
  isLoading: false,
  displayAlertMsg: false,
  alertMsg: "",
  alertType: "",
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

  return (
    <ContextApp.Provider
      value={{
        ...state,
        showAlert,
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
