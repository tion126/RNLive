'use strict';

import * as types from '../Actions/ActionTypes';

const initialState = {
    nearData: {},
    nearFetching: false,
    nearFetched: false,
    error: '',
}

export default function Near(state = initialState, action) {

    switch (action.type) {
        case types.FETCH_NEARDATA_RESULT:
            return { ...state,
                nearFetching: true,
                nearData: [],
            };
        case types.RECEIVE_NEARDATA_RESULT:
            return{ ...state,
                nearFetching: false,
                nearFetched: true,
                nearData: action.nearData.flow.slice(0,100),
                error: action.error,
            };
        default:
            return state;
    }
}
