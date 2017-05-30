import React from 'react';
import { Provider } from 'react-redux';
import AsyncApp from './AsyncApp';
import { fetchPosts } from '../actions';
import configureStore from '../configureStore';

export const store = configureStore();

store.dispatch(fetchPosts(store.getState()));

const Root = () => (
    <Provider store={store}>
        <AsyncApp />
    </Provider>
);
export default Root;
