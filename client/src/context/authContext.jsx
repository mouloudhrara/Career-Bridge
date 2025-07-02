// createContext: to create context, useReducer: to manage the context 
import {createContext, useReducer} from 'react';
// create our context and export it to use it in other files
export const AuthContext = createContext();

// Now we'll create our authReducer func
// we take 2 args: 1st is the previous state, 2nd is the action
export const authReducer = (state, action)=>{
    // handling different cases
    // two cases: log in and log out 
    switch( action.type){
        case 'LOGIN':
            return {user: action.payload};
        case 'LOGOUT': 
            return { user: null}
        default: 
            return state;
    }
}

// create a custom component that's going to wrap our entire app and 
export const AuthContextProvider = ({children})=>{
    // register the state using useReducer hook
    // 1 arg: authReducer is function that we'll make later 
    // 2 arg: the initial state which is an object with a user property
    const [state, dispatch] = useReducer(authReducer, {
        user : null
    })
    console.log("AuthContext state: ",state);

    // returning a template inside this component
    return (
        // this context should wrap our entire app
        <AuthContext.Provider value={{...state, dispatch}}>  {/*here we have one property for the state:
            user, so we can say state.user  */}
            {children} {/* root App */}
        </AuthContext.Provider>
    )
}