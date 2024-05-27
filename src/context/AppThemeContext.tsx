import React from "react";

type AppThemeState = {
    mode: string;
    dispatch?: (action: any) => void;
}

export const initialState: AppThemeState = {
    mode: 'light'
}

export const AppThemeContext = React.createContext<AppThemeState>(initialState);

type AppThemeContextProviderProps = {
    children: React.ReactNode;

}

const reducer =(state: AppThemeState, action: any)=> {
    
    debugger;
    if(action.type === 'TOGGLE_THEME'){
        return {
            ...state,
            mode: state.mode === 'light' ? 'dark' : 'light'
        }
    }
    
    return state;
}

export const AppThemeContextProvider
            : React.FC<AppThemeContextProviderProps> =(props: AppThemeContextProviderProps)=> {

    const [state, dispatch] = React.useReducer(reducer, initialState);          

    return (
        <AppThemeContext.Provider value={{mode: state.mode, dispatch}}>
            {props.children}
        </AppThemeContext.Provider>
    )

}



