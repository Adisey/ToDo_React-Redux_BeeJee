import { type } from './types';

export const authAction = {
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
};
