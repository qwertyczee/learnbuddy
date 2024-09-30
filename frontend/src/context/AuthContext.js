import React, { createContext, useReducer, useEffect } from 'react';

// Define action types
const ACTIONS = {
    SET_USER: 'SET_USER',
    LOGOUT: 'LOGOUT',
};

// Initial state
const initialState = {
    user: JSON.parse(localStorage.getItem('learnbuddy-user')) || null,
    isAuthenticated: !!localStorage.getItem('learnbuddy-user'),
};

// Reducer function
const authReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            };
        case ACTIONS.LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

// Create context
const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        if (state.user) {
            localStorage.setItem('learnbuddy-user', JSON.stringify(state.user));
        } else {
            localStorage.removeItem('learnbuddy-user');
        }
    }, [state.user]);

    // Actions
    const login = (user) => dispatch({ type: ACTIONS.SET_USER, payload: user });
    const logout = () => dispatch({ type: ACTIONS.LOGOUT });

    return (
        <AuthContext.Provider value={{ state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
