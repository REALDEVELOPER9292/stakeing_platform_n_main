import stakingReducer from './stakingReducer';
import loadingReducer from './loadingReducer';
import launchpadReducer from './launchpadReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    staking: stakingReducer,
    loading: loadingReducer,
    launchpad: launchpadReducer
})

export default rootReducer