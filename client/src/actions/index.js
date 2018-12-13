import streams from '../apis/streams';
import history from '../history';

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

// The getState function allows us to reach into Redux store
// and get some piece of information (we want to get users who created 
// each stream).

export const createStream = formValues => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const res = await streams.post('/streams', { ...formValues, userId });

    dispatch({ type: CREATE_STREAM, payload: res.data });
    // some programmatic navigation to get the user back to the root route.
    // The Browser history is hard to send as props to children out of the box.
    history.push('/');
};

export const fetchStreams = () => async dispatch => {
    const res = await streams.get('/streams');
    // console.log(res.data);
    dispatch({ type: FETCH_STREAMS, payload: res.data });
};

export const fetchStream = id => async dispatch => {
    const res = await streams.get(`/streams/${id}`);

    dispatch({ type: FETCH_STREAM, payload: res.data });
};

// PATCH!! If you don't want to lose info.
export const editStream = (id, formValues) => async dispatch => {
    const res = await streams.patch(`/streams/${id}`, formValues);

    dispatch({ type: EDIT_STREAM, payload: res.data });
    history.push('/');
};

export const deleteStream = id => async dispatch => {
    await streams.delete(`/streams/${id}`);

    dispatch({ type: DELETE_STREAM, payload: id });
    history.push('/');
};