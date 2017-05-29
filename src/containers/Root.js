import React, { Component }  from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import AsyncApp from './AsyncApp'
import {fetchPosts } from '../actions'
import configureStore from '../configureStore'

export const store = configureStore();

store.dispatch(fetchPosts(store.getState()));

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <AsyncApp />
            </Provider>
        )
    }
}