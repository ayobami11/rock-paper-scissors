import { createContext, useReducer } from "react";

import { initialState, reducer } from "../reducers/app";

export const AppContext = createContext(null);

export const AppContextWrapper = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}