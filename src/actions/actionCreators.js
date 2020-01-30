import * as types from "./actionTypes";
import { Axios, axiosWithAuth } from "../utils/axios";

export const register = (credentials, history) => dispatch => {
  dispatch({ type: types.REQUEST_START });
  Axios()
    .post("api/auth/register", credentials)
    .then(res => {
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userID", res.data.id);
      dispatch({ type: types.REGISTER_SUCCESS, payload: res.data });
      history.push("/recipes");
    })
    .catch(error => {
      dispatch({ type: types.REGISTER_FAILURE, payload: error.message });
      alert("Username already exists");
    });
};

export const login = (credentials, history) => dispatch => {
  dispatch({ type: types.REQUEST_START });
  Axios()
    .post("api/auth/login", credentials)
    .then(res => {
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userID", res.data.id);
      dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
      history.push("/recipes");
    })
    .catch(error => {
      dispatch({ type: types.LOGIN_FAILURE, payload: error });
    });
};

export const logout = () => {
  localStorage.clear();
  return { type: types.LOGOUT };
};

export const getRecipes = () => dispatch => {
  dispatch({ type: types.REQUEST_START });
  Axios()
    .get("api/recipe")

    .then(res => {
      dispatch({ type: types.GET_ALL_RECIPES_SUCCESS, payload: res.data });
    })
    .catch(error => {
      dispatch({ type: types.GET_ALL_RECIPES_FAILURE, payload: error.message });
    });
};

export const getRecipesById = id => dispatch => {
  dispatch({ type: types.GET_RECIPE });
  Axios()
    .get(`api/recipe/${id}`)

    .then(res => {
      dispatch({ type: types.GET_RECIPE_SUCCESS, payload: res.data });
    })
    .catch(error => {
      dispatch({ type: types.GET_RECIPE_FAILURE, payload: error.message });
    });
};
// Might not be needed
export const addIngredient = ingredientData => dispatch => {
  dispatch({ type: types.REQUEST_START });
  Axios()
    .post("api/recipe", ingredientData)

    .then(res => {
      dispatch({
        type: types.ADD_INGREDIENT_SUCCESS,
        payload: res.data.ingredients
      });
    })
    .catch(error => {
      dispatch({ type: types.ADD_INGREDIENT_FAILURE, payload: error.message });
    });
};

export const getIngredients = () => dispatch => {
  dispatch({ type: types.REQUEST_START });
  Axios()
    .get("api/recipe/")

    .then(res => {
      dispatch({ type: types.GET_INGREDIENT_SUCCESS, payload: res.data });
    })
    .catch(error => {
      dispatch({
        type: types.GET_INGREDIENT_FAILURE,
        payload: error.message
      });
    });
};
// Might not be needed
export const addInstruction = instructionData => dispatch => {
  dispatch({ type: types.REQUEST_START });
  Axios()
    .post("api/recipe", instructionData)

    .then(res => {
      dispatch({
        type: types.ADD_INSTRUCTION_SUCCESS,
        payload: res.data.instructions
      });
    })
    .catch(error => {
      dispatch({ type: types.ADD_INSTRUCTION_FAILURE, payload: error.message });
    });
};
// Might not be needed
export const getInstructions = () => dispatch => {
  dispatch({ type: types.REQUEST_START });
  Axios()
    .get("api/recipe")

    .then(res => {
      dispatch({
        type: types.GET_INSTRUCTION_SUCCESS,
        payload: res.data.instructions
      });
    })
    .catch(error => {
      dispatch({
        type: types.GET_INSTRUCTION_FAILURE,
        payload: error.message
      });
    });
};

export const submitNewRecipe = (newRecipeData, history) => dispatch => {
  dispatch({ type: types.REQUEST_START });
  axiosWithAuth()
    .post("api/recipe", newRecipeData)
    .then(res => {
      dispatch({ type: types.POST_NEW_RECIPE_SUCCESS, payload: res.data });
      dispatch({ type: types.RESET_NEW_RECIPE });
      history.push(`/recipes/${res.data.id}`);
    })
    .catch(error => {
      dispatch({ type: types.POST_NEW_RECIPE_FAILURE, payload: error.message });
      // This doesn't work because the url is not what dictates what view were in but the page counter
      history.push("/createrecipe");
    });
};

export const addToNewRecipe = newRecipeData => {
  return {
    type: types.ADD_TO_NEW_RECIPE,
    payload: newRecipeData
  };
};

/// THIS IS THE NEW STUFF DO NOT DELETE BELOW

export const addRecipeToBody = recipe => dispatch => {
  dispatch({
    type: types.ADD_RECIPE_TO_BODY,
    payload: recipe
  });
};

export const addRecipeCategoriesToBody = recipe_categories => dispatch => {
  dispatch({
    type: types.ADD_RECIPE_CATEGORIES_TO_BODY,
    payload: recipe_categories
  });
};
export const addTagsToBody = tags => dispatch => {
  dispatch({
    type: types.ADD_TAGS_TO_BODY,
    payload: tags
  });
};

export const addRecipeTagsToBody = recipe_tags => dispatch => {
  dispatch({
    type: types.ADD_RECIPE_TAGS_TO_BODY,
    payload: recipe_tags
  });
};

export const addImagesToBody = images => dispatch => {
  dispatch({
    type: types.ADD_IMAGES_TO_BODY,
    payload: images
  });
};

export const addRecipeIngredientsToBody = recipe_ingredients => dispatch => {
  dispatch({
    type: types.ADD_RECIPE_INGREDIENTS_TO_BODY,
    payload: recipe_ingredients
  });
};

export const addInstructionsToBody = instructions => dispatch => {
  dispatch({
    type: types.ADD_INSTRUCTIONS_TO_BODY,
    payload: instructions
  });
};

export const postRecipe = payload => dispatch => {
  axiosWithAuth()
    .post("api/recipe", payload)
    .then(res => {
      dispatch({ type: types.POST_RECIPE_OK, payload: res.data });
    })
    .catch(error => {
      console.dir(error);
      dispatch({ type: types.POST_RECIPE_FAIL, payload: error });
    });
};

export const getProfile = () => dispatch => {
  dispatch({ type: types.GET_PROFILE });

  const generalError = error => { // For use below!
    dispatch({ type: types.GET_PROFILE_FAILURE, payload: error});
  }

  const getProfileInfo = axiosWithAuth()
    .get('/api/profile')
    .then(res => {
      const payload = res.data;
      const massagedPayload = {
        profile_pic: payload.profile_pic,
        first_name: payload.first_name,
        last_name: payload.last_name,
        bio: payload.bio,
        isFetchingProfile: false,
      }

      dispatch({ type: types.GET_PROFILE_SUCCESS, payload: massagedPayload});
    })
    .catch(generalError);

  const getUserRecipes = axiosWithAuth()
    .get('/api/profile/recipes') // **subject to change!**
    .then(res => {
      const payload = res.data; // an array of recipe objects
      const massagedPayload = {
        user_recipes: payload,
        recipe_count: payload.length,
        isFetchingUserRecipes: false,
      }

      dispatch({ type: types.GET_PROFILE_SUCCESS, payload: massagedPayload});
    })
    .catch(generalError);

  const getUserLikes = axiosWithAuth()
    .get('api/profile/liked') // **subject to change!**
    .then(res => {
      const payload = res.data; // an array of recipe objects
      const massagedPayload = {
        liked_recipes: payload,
        recipes_forked_count: payload.length,
        isFetchingUserLikes: false,
      }

      dispatch({ type: types.GET_PROFILE_SUCCESS, payload: massagedPayload });
    })
    .catch(generalError);

  const getForkedRecipesCount = axiosWithAuth()
    .get('api/profile/forked') // **subject to change!**
    .then(res => {
      const payload = res.data; // an integer
      const massagedPayload = {
        forked_recipes_count: payload,
        isFetchingForkedRecipesCount: false,
      }

      dispatch({ type: types.GET_PROFILE_SUCCESS, payload: massagedPayload });
    })
    .catch(generalError);

  // Promise.all([getProfileInfo, getUserRecipes, getUserLikes, getForkedRecipesCount])
  //   .then(res => {
  //     console.log(res.data);
  //   })
  //   .catch(generalError);
}

// for Modal:
export const displayNotificationModal = (message, buttonLink) => dispatch => {
  const payload = ({ message, buttonLink });
  dispatch({ type: types.DISPLAY_NOTIFICATION_MODAL, payload });
}

export const displayErrorModal = message => dispatch => {
  dispatch({ type: types.DISPLAY_ERROR_MODAL, payload: message });
}

export const dismissModal = () => dispatch => {
  dispatch({ type: types.DISMISS_MODAL });
}