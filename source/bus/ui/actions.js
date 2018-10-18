import { type } from './types';

export const uiActions = {
    startFetching: () => {
        return {
            type: type.START_FETCHING,
        };
    },
    stopFetching: () => {
        return {
            type: type.STOP_FETCHING,
        };
    },
    emitError: (error, meta = null) => {
        return {
            type:    type.EMIT_ERROR,
            payload: error,
            meta,
        };
    },
};
