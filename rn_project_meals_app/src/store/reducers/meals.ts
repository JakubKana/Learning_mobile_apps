import { MEALS } from "../../data/dummy-data";
import { Meal } from "../../models/meals";
import { MealsActions, FilterAction } from "../actions/meals";

export type State = {
  meals: Meal[];
  filteredMeals: Meal[];
  favoriteMeals: Meal[];
};

type Action = MealsActions | FilterAction;

const initialState: State = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state: State = initialState, action: Action) => {
  // THIS IS FASTER THAN SWITCH SWITCH DOES TYPE CHECK WE DONT NEED IT
  // eslint-disable-next-line eqeqeq
  if (action.type == "TOGGLE_FAVORITE") {
    const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
    if (existingIndex >= 0) {
      const updatedFavMeals = [...state.favoriteMeals];
      updatedFavMeals.splice(existingIndex, 1);
      return { ...state, favoriteMeals: updatedFavMeals };
    } else {
      const meal = state.meals.find(m => m.id === action.mealId);
      return { ...state, favoriteMeals: meal ? state.favoriteMeals.concat(meal) : state.favoriteMeals };
    }
  }
  // eslint-disable-next-line eqeqeq
  if (action.type == "SET_FILTERS") {
    const appliedFilters = action.filters;
    const filteredMeals = state.meals.filter(m => {
      if (appliedFilters.glutenFree && !m.isGlutenFree) {
        return false;
      }
      if (appliedFilters.lactoseFree && !m.isLactoseFree) {
        return false;
      }
      if (appliedFilters.vegan && !m.isVegan) {
        return false;
      }
      if (appliedFilters.vegetarian && !m.isVegetarian) {
        return false;
      }
      return true;
    });
    return { ...state, filteredMeals };
  }

  return state;
};

export { mealsReducer };
