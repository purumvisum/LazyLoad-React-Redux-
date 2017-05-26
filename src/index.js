import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux'
import {fetchPosts } from './actions'
import reducer from './reducers'
import AsyncApp from './containers/AsyncApp'

let createStoreWithMiddleware;

const middleware = applyMiddleware(
    thunkMiddleware
);

createStoreWithMiddleware = compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStoreWithMiddleware(createStore)(reducer);

store.dispatch(fetchPosts(store.getState()));

render(
    <Provider store={store}>
        <AsyncApp/>
    </Provider>,
    document.getElementById('root')
);
