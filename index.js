import { combineReducers } from 'redux';
//import { combineEpics } from 'redux-observable';
import DataReducer from './reducer_data';
import Validator from './checkIDReducer';
 import FilterBox from './filterReducer';
//import { fetchUserEpic } from '../actions/index';
import { fetchUserEpic } from '../actions/index';

const rootReducer = combineReducers({
    data: DataReducer,
    vad: Validator,
    filterBox: FilterBox
});


import { combineEpics } from 'redux-observable';

export const rootEpic = combineEpics(
  fetchUserEpic
);

/*
export const rootEpic = combineEpics(
    fetchUserEpic
);
*/


export default rootReducer;
