import { ADD_MESSAGE, CLEAR_MESSAGES } from './actions'

export default (state = [], action) => {
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