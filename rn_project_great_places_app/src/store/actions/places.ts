import * as RNFS from "react-native-fs";
import { Dispatch } from "redux";
import { insertPlace, fetchPlaces } from "../../helpers/db";
import { Coords } from "../../components/LocationPicker";
import { ENV } from "../../../env";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title: string, image: string, location: Coords) => {
  return async (dispatch: Dispatch) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`,
    );

    if (!response.ok) {
      throw new Error("Something went wrong when fetching location");
    }

    const resData = await response.json();
    if (!resData.results) {
      throw new Error("Something went wrong data not found in request body!");
    }
    console.log(resData);
    const address = resData.results[0].formatted_address;
    const fileName = image.split("/").pop();
    const newPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    try {
      await RNFS.moveFile(image, newPath);
      const dbResult = await insertPlace(title, newPath, address, location.lat, location.lng);
      console.log(dbResult);
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title,
          imageUri: `file://${newPath}`,
          address,
          coords: {
            lat: location.lat,
            lng: location.lng,
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch: Dispatch) => {
    try {
      const dbResult = await fetchPlaces();
      console.log(dbResult.rows.raw());
      dispatch({ type: SET_PLACES, places: dbResult.rows.raw() });
    } catch (error) {
      throw error;
    }
  };
};
