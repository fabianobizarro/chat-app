import { combineReducers } from 'redux';

//  import reducers
import user from './components/Login/reducer';
import messages from './components/Chat/reducer';

export default combineReducers({
    user,
    messages
});