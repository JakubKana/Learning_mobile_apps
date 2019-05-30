import { ADD_PLACE } from "./types";

export const addPlace = placeName => {
  return {
    type: ADD_PLACE,
    payload: placeName
  };
};

export const addPlaceWithLog = placeName => {
  return function(dispatch, getState) {
    console.log(getState());
    dispatch(addPlace(placeName));
    dispatch(addPlace(placeName));
  };
};
