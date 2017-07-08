import { REMOVE_USER, SET_USER } from './actions'

export default (state = '', action) => {
    switch (action.type) {
        case SET_USER:
            return action.username;
        case REMOVE_USER:
            return '';
        default:
            return state;
    }
};