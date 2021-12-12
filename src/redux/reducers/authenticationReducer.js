import { ActionTypes } from '../actions/actionTypes';
import { combineReducers } from 'redux';
import { vacationReducer } from './vacatuinReducer';

export const authenticationReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_TOKEN:
      return { ...state, token: payload };
    default:
      return state;
  }
};
export const userDataReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_USER:
      return payload;
    default:
      return state;
  }
};
const reducers = combineReducers({
  authentication: authenticationReducer,
  userData: userDataReducer,
  vacation: vacationReducer,
});

export default reducers;
