import * as reducers from "../reducers/reducers";
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const monsterReducer = combineReducers({
  editRecipe: reducers.editRecipeReducer,
  editCategory: reducers.editCategoryReducer,
  editTag: reducers.editTagReducer,
  editImage: reducers.editImageReducer,
  editIngredient: reducers.editIngredientReducer,
  editInstruction: reducers.editInstructionReducer,
  newRecipe : reducers.newRecipeReducer,
  onboard : reducers.onBoardingReducer,
  recipes : reducers.recipeViewReducer,
  singleRecipe: reducers.singleRecipeReducer,
  ingredients : reducers.ingredientReducer,
  profile : reducers.profileReducer,
  modal: reducers.modalReducer,
});

const store = createStore(
  monsterReducer,
  {},
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
