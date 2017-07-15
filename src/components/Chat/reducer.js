import {
    ADD_MESSAGE,
    CLEAR_MESSAGES,
    SET_USERS,
    ADD_USER,
    SELECT_THREAD,
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
                'all',
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

export const thread = (state = 'all', action) => {
    switch (action.type) {
        case SELECT_THREAD:
            return action.thread;
        default:
            return state;
    }
};