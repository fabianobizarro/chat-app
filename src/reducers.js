import { combineReducers } from 'redux';

//  import reducers
import user from './components/Login/reducer';
import { messages, users, selectedThread, threads, showUsers } from './components/Chat/reducer';

export default combineReducers({
    user,
    selectedThread,
    threads,
    users,
    showUsers,
    messages
});