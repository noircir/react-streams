import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';

// The form reducer is already provided by redux-form, 
// we just need to wire it up into our store.

export default combineReducers ({
    auth: authReducer,
    form: formReducer,
    streams: streamReducer
});