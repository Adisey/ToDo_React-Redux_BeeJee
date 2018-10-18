import { type } from './types';

export const authenticationAction = {
    //Sync
    login: () => {
        return {
            type: type.LOGIN,
        };
    },
    logout: () => {
        return {
            type: type.LOGOUT,
        };
    },
    // Async
    loginAsync: (userData) => {
        return {
            type:    type.LOGIN_ASYNC,
            payload: userData,
        };
    },

};
