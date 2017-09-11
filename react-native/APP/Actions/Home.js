import * as types from './ActionTypes.js'
import {request,BannerRequestURL,HotLiveRequestURL,GiftInfoRequestURL} from '../Utils/RequestUtils.js'

export function fetchBannerData() {
    return dispatch => {
        dispatch(fetchBannerDataResult());
         request(BannerRequestURL, 'get')
            .then((responseData) => {
                if (responseData) {
                    dispatch(receiveBannerDataResult(responseData));
                }
                else {
                    dispatch(receiveBannerDataResult([]));
                }
            })
            .catch((error) => {
                console.error('fetchAddressSearch error: ' + error);
                dispatch(receiveBannerDataResult([], error));
            })
    }
}


function fetchBannerDataResult() {
    return {
        type: types.FETCH_BANNERDATA_RESULT,
    }
}

function receiveBannerDataResult(responseData, error) {
    return {
        type: types.RECEIVE_BANNERDATA_RESULT,
        bannerData: responseData,
        error: error,
    }
}

export function fetchHotLiveData() {

    return dispatch => {
        dispatch(fetchHotLiveDataResult());
        request(HotLiveRequestURL, 'get')
            .then((responseData) => {
                if (responseData) {
                    dispatch(receiveHotLiveDataResult(responseData));
                }
                else {
                    dispatch(receiveHotLiveDataResult([]));
                }
            })
            .catch((error) => {
                console.error('fetchContentData error: ' + error);
                dispatch(receiveHotLiveDataResult([], error));
            })
    }
}

function fetchHotLiveDataResult() {
    return {
        type: types.FETCH_HOTLIVEDATA_RESULT,
    }
}

function receiveHotLiveDataResult(responseData, error) {
    return {
        type: types.RECEIVE_HOTLIVEDATA_RESULT,
        hotLiveData: responseData,
        error: error,
    }
}


export function fetchGiftData() {
    return dispatch => {
        dispatch(fetchGiftDataResult());
        request(GiftInfoRequestURL, 'get')
            .then((responseData) => {
                if (responseData) {
                    dispatch(receiveGiftDataResult(responseData));
                }
                else {
                    dispatch(receiveGiftDataResult({}));
                }
            })
            .catch((error) => {
                console.error('fetchGiftDataResult error: ' + error);
                dispatch(receiveGiftDataResult([], error));
            })
    }
}

function fetchGiftDataResult() {
    return {
        type: types.FETCH_GIFTDATA_RESULT,
    }
}

function receiveGiftDataResult(responseData, error) {
    return {
        type: types.RECEIVE_GIFTDATA_RESULT,
        giftData: responseData,
        error: error,
    }
}