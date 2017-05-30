import reducer from '../reducers';
import {
    CHANGE_LOADING_DATA_STATE,
    SWITCH_LOADING_UI,
    RECEIVE_POSTS,
    CHANGE_LOADING_STATUS
} from '../actions';

describe('LazyLoad reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(
            {
                items: [],
                page: 1,
                infiniteScroll: false,
                loading: 'hide',
                allLoaded: false
            }
        );
    });

    it('should handle CHANGE_LOADING_STATUS', () => {
        expect(
            reducer(
                {
                    page: 3,
                    infiniteScroll: false,
                    loading: 'loading'
                },
                {
                    type: CHANGE_LOADING_STATUS,
                    loading: 'hide'
                }
            )
        ).toEqual(
            {
                page: 3,
                infiniteScroll: false,
                loading: 'hide'
            }
        );
    });

    it('should handle RECEIVE_POSTS', () => {
        expect(
            reducer(
                {
                    page: 3,
                    items: []
                },
                {
                    type: RECEIVE_POSTS,
                    data: [
                        {
                            albumId: 1,
                            id: 1,
                            title: 'title',
                            url: 'http://placehold.it/600/92c952',
                            thumbnailUrl: 'http://placehold.it/150/92c952'
                        }
                    ]
                }
            )
        ).toEqual(
            {
                page: 4,
                items: [
                    {
                        albumId: 1,
                        id: 1,
                        title: 'title',
                        url: 'http://placehold.it/600/92c952',
                        thumbnailUrl: 'http://placehold.it/150/92c952'
                    }
                ]
            }
        );
    });

    it('should handle CHANGE_LOADING_DATA_STATE', () => {
        expect(
            reducer(
                {
                    allLoaded: false
                },
                {
                    type: CHANGE_LOADING_DATA_STATE,
                    allLoaded: true
                }
            )
        ).toEqual(
            {
                allLoaded: true
            }
        );
    });

    it('should handle SWITCH_LOADING_UI', () => {
        expect(
            reducer(
                {
                    infiniteScroll: false
                },
                {
                    type: SWITCH_LOADING_UI,
                    infiniteScroll: false
                }
            )
        ).toEqual(
            {
                infiniteScroll: true
            }
        );
    });
});
