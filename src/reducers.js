import { combineReducers } from 'redux';

//  import reducers
import user from './components/Login/reducer';
import { messages, users, thread, showUsers } from './components/Chat/reducer';

export default combineReducers({
    user,
    thread,
    users,
    showUsers,
    messages
});