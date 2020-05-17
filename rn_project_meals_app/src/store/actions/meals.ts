export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const SET_FILTERS = "SET_FILTERS";

export type MealsActions = {
  type: typeof TOGGLE_FAVORITE;
  mealId: string;
};
export type FilterAction = {
  type: typeof SET_FILTERS;
  filters: FilterSettings;
};

export interface FilterSettings {
  glutenFree: boolean;
  lactoseFree: boolean;
  vegan: boolean;
  vegetarian: boolean;
}

export const toggleFavorite = (id: string) => {
  return { type: TOGGLE_FAVORITE, mealId: id };
};

export const setFilters = (filterSettings: FilterSettings) => {
  return { type: SET_FILTERS, filters: filterSettings };
};
