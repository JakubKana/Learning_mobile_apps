import { PlacesState, ActionType } from "../types";
import { ADD_PLACE, SET_PLACES } from "../actions/places";
import { Place } from "../../models/place";
import { DbPlace } from "../../models/db-place";

type PlacesActionType = ActionType & {
  placeData: { id: number; title: string; imageUri: string };
  places: DbPlace[];
};

const initState: PlacesState = {
  places: [],
};

export function placesReducer(state: PlacesState = initState, action: PlacesActionType) {
  // eslint-disable-next-line eqeqeq
  if (action.type == ADD_PLACE) {
    const newPlace = new Place(action.placeData.id.toString(), action.placeData.title, action.placeData.imageUri);
    return {
      places: state.places.concat(newPlace),
    };
  }
  // eslint-disable-next-line eqeqeq
  if (action.type == SET_PLACES) {
    console.log("Action places", action.places);
    return {
      places: action.places.map(pl => {
        console.log("Place", pl);
        return new Place(pl.id.toString(), pl.title, `file://${pl.imageUri}`);
      }),
    };
  }
  return state;
}
