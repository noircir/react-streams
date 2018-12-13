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
        case CREATE_STREAM:
            // Here is where keys are created for stream objects. 
            // (The stream objects are kept in the db as an array of objects without keys). 

            // key interpolation
            return { ...state, [action.payload.id]: action.payload };

        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload };

        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload };

        case DELETE_STREAM:
            return _.omit(state, action.payload);

        case FETCH_STREAMS:
            // Since the json-server API provides us with an array of streams,
            // we need to transform an array into an object. 

            // mapKeys transforms an array of objects into an object of objects
            // where the keys are the ids taken from each array element
            // and the values are the same array elements (objects).

            // console.log(action.payload) // an array of objects
            // console.log(...action.payload) // objects by themselves, one at a time
            // one object of objects, with keys from the payload's ids
            // console.log(_.mapKeys(action.payload, 'id')) 

            // The same one object of objects, added to a copy of state
            return { ...state, ..._.mapKeys(action.payload, 'id') };

        default:
            return state;
    }
}