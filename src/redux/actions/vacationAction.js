import { ActionTypes } from './actionTypes';
export const setVacation = (data) => {
  return {
    type: ActionTypes.SET_VACATION,
    payload: data,
  };
};
