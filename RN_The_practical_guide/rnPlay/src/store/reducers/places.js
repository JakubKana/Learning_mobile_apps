import * as ACTIONS from '../actions/actionTypes';

const initialState = {
  places: [],
  selectedPlace: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case ACTIONS.SELECT_PLACE:
      case ACTIONS.DESELECT_PLACE:
      case ACTIONS.DELETE_PLACE:
      case ACTIONS.ADD_PLACE:
    default:
      return state;
  }
};

export default reducer;
