import _ from 'lodash';
import { 
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case CREATE_STREAM || FETCH_STREAM || EDIT_STREAM : 
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
            return _.omit(state, action.payload);
        case FETCH_STREAMS:
            // mapKeys transforms an array of objects into an object of objects
            // where the keys are the ids taken from each array element
            // and the values are the same array elements (objects).

            // The second argument will either override or add new streams.

            // Spreading the second large object into a flat collection of objects.
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        default:
            return state;
    }
}