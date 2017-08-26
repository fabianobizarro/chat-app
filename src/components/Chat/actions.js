export const ADD_MESSAGE = 'ADD_MESSAGE';
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

export const addMessage = (message) => ({
    type: ADD_MESSAGE,
    message
});

export const clearMessages = () => ({
    type: CLEAR_MESSAGES
});


export const SET_USERS = 'SET_USERS';
export const ADD_USER = 'ADD_USER';

export const setUsers = (users) => ({
    type: SET_USERS,
    users
});

export const addUser = (user) => ({
    type: ADD_USER,
    user
});

export const SELECT_THREAD = 'SELECT_THREAD';
export const ADD_THREAD = 'ADD_THREAD';
export const REMOVE_THREAD = 'REMOVE_THREAD';

export const selectThread = (thread) => ({
    type: SELECT_THREAD,
    thread
});

export const addThread = (thread) => ({
    type: ADD_THREAD,
    thread
});

export const removeThread = (thread) => ({
    type: REMOVE_THREAD,
    thread
});

export const TOGGLE_USERS_MENU = 'TOGGLE_USERS_MENU';

export const toggleUsersMenu = () => ({
    type: TOGGLE_USERS_MENU
});