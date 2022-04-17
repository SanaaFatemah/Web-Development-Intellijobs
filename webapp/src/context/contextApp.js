import React, { useState, useReducer, useContext } from "react";

const State = {
  isLoading: false,
  displayAlertMsg: false,
  alertText: "",
  alertType: "",
};

const ContextApp = React.createContext();

const ProviderApp = ({ children }) => {
  const [state, setState] = useState(State);

  return (
    <ContextApp.Provider
      value={{
        ...state,
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
