import {createStore} from 'redux';
import authReducer from '../dux/authReducer';

export default createStore(authReducer);