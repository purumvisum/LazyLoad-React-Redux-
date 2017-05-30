import {
    changeLoadingDataState,
    CHANGE_LOADING_DATA_STATE,
    switchLoadingUI,
    SWITCH_LOADING_UI,
    changeLoadingStatus,
    CHANGE_LOADING_STATUS
} from '../actions';

describe('changeLoadingDataState', () => {
    it('should create an action to change Process state to all loaded', () => {
        const allLoaded = true;
        const expectedAction = {
            type: CHANGE_LOADING_DATA_STATE,
            allLoaded
        };
        expect(changeLoadingDataState(allLoaded)).toEqual(expectedAction);
    });
});

describe('switchLoadingUI', () => {
    it('should create an action to switch loading from scroll to click', () => {
        const expectedAction = {
            type: SWITCH_LOADING_UI
        };
        expect(switchLoadingUI()).toEqual(expectedAction);
    });
});

describe('changeLoadingStatus', () => {
    it('should create an action to switch loading status of application', () => {
        const expectedAction = {
            type: CHANGE_LOADING_STATUS,
            loading: 'loading'
        };
        expect(changeLoadingStatus('loading')).toEqual(expectedAction);
    });
});

describe('changeLoadingDataState', () => {
    it('should create an action to switch AllLoaded switcher', () => {
        const expectedAction = {
            type: CHANGE_LOADING_DATA_STATE,
            allLoaded: true
        };
        expect(changeLoadingDataState(true)).toEqual(expectedAction);
    });
});
