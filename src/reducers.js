import {
    RECEIVE_POSTS,
    CHANGE_LOADING_STATUS,
    CHANGE_LOADING_DATA_STATE,
    SWITCH_LOADING_UI
} from './actions'

let initial = {
    items: [],
    page: 1,
    infiniteScroll: false,
    loading: "hide",
    allLoaded: false
};

function reducer(state = initial, action) {
    switch (action.type) {
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                items: [ ...state.items,
                    ...action.data],
                page: state.page + 1
            });
        case CHANGE_LOADING_STATUS:
            return Object.assign({}, state, {
                loading: action.loading
            });
        case CHANGE_LOADING_DATA_STATE:
            return Object.assign({}, state, {
                allLoaded: action.allLoaded
            });
        case SWITCH_LOADING_UI:
            return Object.assign({}, state, {
                infiniteScroll: !state.infiniteScroll
            });
        default:
            return state
    }
}

export default reducer
