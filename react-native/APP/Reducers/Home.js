'use strict';

import * as types from '../Actions/ActionTypes';

const initialState = {
    bannerData: {},
    bannerFetching: false,
    bannerFetched: false,
    hotLiveData: {},
    hotLiveFetching: false,
    hotLiveFetched: false,
    giftData: {},
    giftFetching: false,
    giftFetched: false,
    error: '',
}

export default function home(state = initialState, action) {

    switch (action.type) {
        case types.FETCH_BANNERDATA_RESULT:
            return { ...state,
                bannerFetching: true,
                bannerData: [],
            };
        case types.RECEIVE_BANNERDATA_RESULT:
            return{ ...state,
                bannerFetching: false,
                bannerFetched: true,
                bannerData: action.bannerData,
                error: action.error,
            };
        case types.FETCH_HOTLIVEDATA_RESULT:
            return { ...state,
                hotLiveFetching: true,
                hotLiveData: [],
            };
        case types.RECEIVE_HOTLIVEDATA_RESULT:
            return{ ...state,
                hotLiveFetching: false,
                hotLiveFetched: true,
                hotLiveData: action.hotLiveData,
                error: action.error,
            };
        case types.FETCH_GIFTDATA_RESULT:
            return { ...state,
                giftFetching: true,
                giftData: [],
            };
        case types.RECEIVE_GIFTDATA_RESULT:
            return{ ...state,
                giftFetching: false,
                giftFetched: true,
                giftData: action.giftData,
                error: action.error,
            };
        default:
            return state;
    }
}
