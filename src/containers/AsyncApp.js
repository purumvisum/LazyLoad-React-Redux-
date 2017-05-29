import React, { Component } from 'react'
import { connect } from 'react-redux'
import GridItem from '../components/titles'
import {fetchPosts, switchLoadingUI} from '../actions'
import {throttle} from 'lodash'


class AsyncApp extends Component {
    constructor(props) {
        super(props);
        this.listener = throttle(this.scrollListener, 200).bind(this);
    }

    componentDidMount() {
            this.attachScrollListener();
    }

    scrollListener () {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            // to avoid loading when all was loaded and something loading
            if(!(this.props.loading === "loading") && !(this.props.allLoaded === true) && (this.props.infiniteScroll)) {
                this.props.onScroll();
            }
            return false
        }
    }

    attachScrollListener() {
        // todo: add listner when infiniteScroll === true
        window.addEventListener('scroll', this.listener);
        this.listener();
    }

    detachScrollListener() {
        window.removeEventListener('scroll', this.listener);
        window.removeEventListener('resize', this.listener);
    }

    render() {
        return (
            <GridItem
                switchLoadingUI = {this.props.switchLoadingUI}
                items={this.props.items}
                onClick = {this.props.onClick}
                loading = {this.props.loading}
                infiniteScroll = {this.props.infiniteScroll}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.items,
        loading: state.loading,
        allLoaded: state.allLoaded,
        page: state.page,
        infiniteScroll: state.infiniteScroll
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: () => {
            dispatch(fetchPosts())
        },
        onScroll: () => {
            dispatch(fetchPosts())
        },
        switchLoadingUI: () => {
            dispatch(switchLoadingUI())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsyncApp)