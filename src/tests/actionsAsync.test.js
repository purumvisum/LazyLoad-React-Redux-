import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import fetch from 'isomorphic-fetch';

import {
    fetchPosts,
    RECEIVE_POSTS,
    CHANGE_LOADING_STATUS,
    CHANGE_LOADING_DATA_STATE
} from '../actions'

const promisifyMiddleware = ({dispatch, getState}) => next => action => {
    return new Promise((resolve) => resolve(next(action)))
};

const middlewares = [thunk, promisifyMiddleware]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
    afterEach(() => {
        nock.cleanAll()
    })

    it('creates RECEIVE_POSTS when fetching has been done', () => {
        nock('https://jsonplaceholder.typicode.com/')
            .get('/photos?albumId=1')
            .reply(200,
                [{
                    "albumId": 1,
                    "id": 1,
                    "title": "title",
                    "url": "http://placehold.it/600/92c952",
                    "thumbnailUrl": "http://placehold.it/150/92c952"
                }]
            )

        const expectedActions = [
            {type: CHANGE_LOADING_STATUS, loading: "loading"},
            {
                type: RECEIVE_POSTS,
                data: [{
                    "albumId": 1,
                    "id": 1,
                    "title": "title",
                    "url": "http://placehold.it/600/92c952",
                    "thumbnailUrl": "http://placehold.it/150/92c952"
                }]
            },
            {type: CHANGE_LOADING_STATUS, loading: "ready"},
        ];

        let initial = {
            items: [],
            page: 1
        };

        const store = mockStore(initial);

        return store.dispatch(fetchPosts())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
    })

    it('Actions without responce', () => {
        nock('https://jsonplaceholder.typicode.com/')
            .get('/photos?albumId=1')
            .reply(200, []
            )

        const expectedActions = [
            {type: CHANGE_LOADING_STATUS, loading: "loading"},
            {type: CHANGE_LOADING_STATUS, loading: "hide"},
            {type: CHANGE_LOADING_DATA_STATE, allLoaded: true},
        ];

        let initial = {
            items: [],
            page: 1
        };

        const store = mockStore(initial);

        return store.dispatch(fetchPosts())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
    })
})