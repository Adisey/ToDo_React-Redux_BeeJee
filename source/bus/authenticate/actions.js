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
    showDrawerLogin: () => {
        return {
            type: type.SHOW_DRAWER_LOGIN,
        };
    },
    hideDrawerLogin: () => {
        return {
            type: type.HIDE_DRAWER_LOGIN,
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
