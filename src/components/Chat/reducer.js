import {
    ADD_MESSAGE,
    CLEAR_MESSAGES,
    SET_USERS,
    ADD_USER,
    SELECT_THREAD,
    ADD_THREAD,
    REMOVE_THREAD,
    TOGGLE_USERS_MENU
} from './actions'

export const messages = (state = [], action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return [
                ...state,
                action.message
            ]
        case CLEAR_MESSAGES:
            return [];
        default:
            return state;
    }
};

export const users = (state = [], action) => {
    switch (action.type) {
        case SET_USERS:
            return [
                ...action.users
            ];
        case ADD_USER:
            return [
                ...state,
                action.user
            ];
        default:
            return state;
    }
}

export const showUsers = (state = false, action) => {
    switch (action.type) {
        case TOGGLE_USERS_MENU:
            return !state;
        default:
            return state;
    }
};

export const selectedThread = (state = 'all', action) => {
    switch (action.type) {
        case SELECT_THREAD:
            return action.thread;
        default:
            return state;
    }
};

export const threads = (state = [], action) => {
    switch (action.type) {
        case ADD_THREAD:
            if (state.indexOf(action.thread) == -1) {
                return [
                    action.thread,
                    ...state
                ]
            }
            else
                return state;
        case REMOVE_THREAD:
            return state.filter(t => t !== action.thread);
        default:
            return state;
    }
}