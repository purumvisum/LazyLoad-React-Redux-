export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const CHANGE_STATUS = 'CHANGE_STATUS';
export const CHANGE_PROCESS_STATE = 'CHANGE_PROCESS_STATE';
export const SWITCH_LOADING = 'SWITCH_LOADING';

export function receivePosts(json) {
    return {
        type: RECEIVE_POSTS,
        data: json
    }
}

export function changeStatus(status) {
    return {
        type: CHANGE_STATUS,
        loading: status
    }
}

export function changeProcessState(allLoaded) {
    return {
        type: CHANGE_PROCESS_STATE,
        allLoaded: allLoaded
    }
}

export function switchLoading() {
    return {
        type: SWITCH_LOADING
    }
}

export function fetchPosts() {
    return function (dispatch, getState) {
        if (!(getState().loading === 'hide')) {
            dispatch(changeStatus("loading"));
        }
        // https://jsonplaceholder.typicode.com/photos
        // http://localhost:3000/photos
        return fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${getState().page}`)
            .then(
                response => response.json()
            )
            .then(json =>
            {
                if (json.length) {
                    dispatch(receivePosts(json));
                    dispatch(changeStatus("ready"));
                } else {
                    dispatch(changeStatus("hide"));
                    dispatch(changeProcessState(true));
                }
            })
    }
}