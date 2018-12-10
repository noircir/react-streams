import streams from '../apis/streams';

import { 
    SIGN_IN, 
    SIGN_OUT, 
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from './types'

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

// How exactly this form data ends up in the state store, 
// is handled by the Redux form. 

export const createStream = formValues => async dispatch => {
    const res = await streams.post('/streams', formValues);
    // console.log(res);

    dispatch({ type: CREATE_STREAM, payload: res.data });
};

export const fetchStreams = () => async dispatch => {
    const res = await streams.get('/streams');
    // console.log(res);

    dispatch({ type: FETCH_STREAMS, payload: res.data });
};

export const fetchStream = id => async dispatch => {
    const res = await streams.get(`/streams/${id}`);
    // console.log(res);

    dispatch({ type: FETCH_STREAM, payload: res.data });
};

export const editStream = (id, formValues) => async dispatch => {
    const res = await streams.put(`/streams/${id}`, formValues);
    // console.log(res);

    dispatch({ type: EDIT_STREAM, payload: res.data });
};

export const deleteStream = id => async dispatch => {
    await streams.get(`/streams/${id}`);

    dispatch({ type: DELETE_STREAM, payload: id });
};