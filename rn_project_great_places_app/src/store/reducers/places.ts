import { PlacesState, ActionType } from "../types";

const initState: PlacesState = {
  places: [],
};

export function placesReducer(state: PlacesState = initState, action: ActionType) {
  return state;
}
