import { type } from './types';

export const uiActions = {
    startSpining: () => {
        return {
            type: type.START_SPINING,
        };
    },
    stopSpining: () => {
        return {
            type: type.STOP_SPINING,
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
