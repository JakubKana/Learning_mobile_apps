import { MEALS } from "../../data/dummy-data";
import { Meal } from "../../models/meals";

export type State = {
  meals: Meal[];
  filteredMeals: Meal[];
  favoriteMeals: Meal[];
};

type Action = {};

const initialState: State = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state: State = initialState, _action: Action) => {
  return state;
};

export { mealsReducer };
