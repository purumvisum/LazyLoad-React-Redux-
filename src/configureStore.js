import React from 'react';
import thunkMiddleware from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux'
import reducer from './reducers'


export default function configureStore(initialState) {
    const middleware = applyMiddleware(
        thunkMiddleware
    );

    let createStoreWithMiddleware = compose(
        middleware,
        window.devToolsExtension ? window.devToolsExtension() : f => f
    );

    return createStoreWithMiddleware(createStore)(reducer);
}