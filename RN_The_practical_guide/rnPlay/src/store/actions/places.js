import * as ACTIONS from './actionTypes';
export const addPlace = (placeName) => {
    return {
        type: ACTIONS.ADD_PLACE,
        placeName
    };
};

export const deletePlace = () => {
    return {
        type: ACTIONS.DELETE_PLACE
    };
};

export const selectPlace = key => {
    return {
        type: ACTIONS.SELECT_PLACE,
        placeKey: key
    };
};

export const deselectPlace = () => {
    return {
        type: ACTIONS.DESELECT_PLACE
    };
};