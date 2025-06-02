import React, { createContext, useReducer, useEffect } from 'react'; 
import { initialState, reducer } from '../../Utility/reducer';
import { auth } from '../../Utility/firebase'; 

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState); // <-- Destructure state and dispatch

    useEffect(() => {
        // This listener will run whenever the user's authentication state changes
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // User is signed in
                dispatch({
                    type: "SET_USER", // <-- Dispatch an action to set the user
                    user: authUser,
                });
            } else {
                // User is signed out
                dispatch({
                    type: "SET_USER", // <-- Dispatch an action to clear the user
                    user: null,
                });
            }
        });

        // Cleanup subscription on component unmount
        return () => {
            unsubscribe();
        };
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <DataContext.Provider value={[state, dispatch]}> {/* <-- Pass state and dispatch */}
            {children}
        </DataContext.Provider>
    );
};