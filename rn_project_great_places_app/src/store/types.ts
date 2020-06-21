/*
/ === ACTIONS ===
*/
export type ActionType = { type: string; [payload: string]: any };


/*
/ === STATES ===
*/
export interface PlacesState {
  places: Array<any>;
}
