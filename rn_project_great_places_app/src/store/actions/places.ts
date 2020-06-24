import * as RNFS from "react-native-fs";
import { Dispatch } from "redux";
import { insertPlace, fetchPlaces } from "../../helpers/db";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title: string, image: string) => {
  return async (dispatch: Dispatch) => {
    const fileName = image.split("/").pop();
    const newPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    console.log("NEW PATH", newPath);
    console.log("OLD PATH", image);

    try {
      await RNFS.moveFile(image, newPath);
      const dbResult = await insertPlace(title, newPath, "Dummy addres", 15.6, 12.3);
      console.log(dbResult);
      dispatch({ type: ADD_PLACE, placeData: { id: dbResult.insertId, title, imageUri: `file://${newPath}` } });
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
