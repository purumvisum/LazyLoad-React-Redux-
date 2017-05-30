import fetch from 'isomorphic-fetch';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const CHANGE_LOADING_STATUS = 'CHANGE_LOADING_STATUS';
export const CHANGE_LOADING_DATA_STATE = 'CHANGE_LOADING_DATA_STATE';
export const SWITCH_LOADING_UI = 'SWITCH_LOADING_UI';

export function receivePosts(json) {
    return {
        type: RECEIVE_POSTS,
        data: json
    };
}

export function changeLoadingStatus(status) {
    return {
        type: CHANGE_LOADING_STATUS,
        loading: status
    };
}

export function changeLoadingDataState(allLoaded) {
    return {
        type: CHANGE_LOADING_DATA_STATE,
        allLoaded
    };
}

export function switchLoadingUI() {
    return {
        type: SWITCH_LOADING_UI
    };
}

export function fetchPosts() {
    return (dispatch, getState) => {
        dispatch(changeLoadingStatus('loading'));
        // https://jsonplaceholder.typicode.com/photos
        // http://localhost:3000/photos
        return fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${getState().page}`)
            .then(
                response => response.json()
            )
            .then((json) => {
                if (json.length) {
                    dispatch(receivePosts(json));
                    dispatch(changeLoadingStatus('ready'));
                } else {
                    dispatch(changeLoadingStatus('hide'));
                    dispatch(changeLoadingDataState(true));
                }
            });
    };
}
