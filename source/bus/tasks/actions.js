import { type } from './types';

export const tasksActions = {
    // Sync
    fillTasks: (tasks) => {
        return {
            type:    type.FILL_TASKS,
            payload: tasks,
        };
    },

    createTask: (task) => {
        return {
            type:    type.CREATE_TASK,
            payload: task,
        };
    },
    completeTask: (task) => {
        return {
            type:    type.COMPLETE_TASK,
            payload: task,
        };
    },
    startEditTask: (id) => {
        return {
            type:    type.START_EDIT_TASK,
            payload: id,
        };
    },
    endEditTask: (id) => {
        return {
            type:    type.END_EDIT_TASK,
            payload: id,
        };
    },
    changeTask: (task) => {
        return {
            type:    type.CHANGE_TASK,
            payload: task,
        };
    },
    setPage: (page) => {
        return {
            type:    type.CHANGE_PAGE,
            payload: page,
        };
    },
    sortOrderTask: (sort) => {
        return {
            type:    type.SORT_ORDER_TASK,
            payload: sort,
        };
    },
    sortTask: (sort) => {
        return {
            type:    type.SORT_TASK,
            payload: sort,
        };
    },

    // Async
    fetchTasksAsync: (tasks) => {
        return {
            type:    type.FETCH_TASKS_ASYNC,
            payload: tasks,
        };
    },
    createTaskAsync: (taskMessage) => {
        return {
            type:    type.CREATE_TASK_ASYNC,
            payload: taskMessage,
        };
    },
    completeTaskAsync: (task) => {
        return {
            type:    type.COMPLETE_TASK_ASYNC,
            payload: task,
        };
    },
    changeTaskAsync: (task) => {
        return {
            type:    type.CHANGE_TASK_ASYNC,
            payload: task,
        };
    },
};
