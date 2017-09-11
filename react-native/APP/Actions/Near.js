import * as types from './ActionTypes.js'
import {request,NearInfoRequestURL} from '../Utils/RequestUtils.js'

export function fetchNearData() {
    return dispatch => {
        dispatch(fetchNearDataResult());
        request(NearInfoRequestURL, 'get')
            .then((responseData) => {
                if (responseData) {
                    dispatch(receiveNearDataResult(responseData));
                }
                else {
                    dispatch(receiveNearDataResult([]));
                }
            })
            .catch((error) => {
                console.error('fetchNearDataResult error: ' + error);
                dispatch(receiveNearDataResult([], error));
            })
    }
}


function fetchNearDataResult() {
    return {
        type: types.FETCH_NEARDATA_RESULT,
    }
}

function receiveNearDataResult(responseData, error) {
    return {
        type: types.RECEIVE_NEARDATA_RESULT,
        nearData: responseData,
        error: error,
    }
}
