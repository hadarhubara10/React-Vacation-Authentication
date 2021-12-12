import { ActionTypes } from '../actions/actionTypes';

export const vacationReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_VACATION:
      return payload;
    default:
      return state;
  }
};
