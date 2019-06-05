import * as ACTIONS from './actionTypes';
export const addPlace = (placeName) => {
    return {
        type: ACTIONS.ADD_PLACE,
        placeName
    };
};

export const deletePlace = (key) => {
    return {
        type: ACTIONS.DELETE_PLACE,
        placeKey: key
    };
};

