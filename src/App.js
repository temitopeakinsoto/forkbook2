import React from "react";
import { Route } from "react-router-dom";

import { connect } from "react-redux";

import PrivateRoute from "./components/authentication/privateRoute/PrivateRoute";
import FormikLoginForm from "./components/authentication/loginForm/LoginForm";
import FormikRegisterForm from "./components/authentication/registerForm/RegisterForm";
import RecipeView from "./components/recipe/RecipeView";
import SeeRecipe from "./components/recipe/SeeRecipe";
import ProfileView from "./components/profile/profileView/ProfileView";
import EditProfile from "./components/profile/editProfile/EditProfile";
import IngredientView from "./components/ingredients/ingredientView/IngredientView";
import InstructionView from "./components/instructions/instructionView/InstructionView";
import CreateRecipe from "./components/createRecipe/createRecipe/CreateRecipe";
import Modal from './components/notification/modal/Modal';
import EditRecipeOptions from "./components/EditRecipe/EditRecipeOptions" 

import "./App.css";

function App(props) {
  const { isDisplaying } = props;
  // ^Needed to stop the screen from scrolling when the modal is visible!

  return (
    <div  className="App" 
     style={{height: "100%",
      "overflowY": isDisplaying ? "hidden" : "visible", 
       }}
    >
      <Route exact path="/" component={RecipeView} />
      <Route path="/login" component={FormikLoginForm} />
      <Route path="/register" component={FormikRegisterForm} />

      <Route path="/recipes" exact component={RecipeView} />
      <Route path="/recipes/:id" render={props => <SeeRecipe {...props} />} />

      <PrivateRoute path='/profile' component={ProfileView}/>
      <PrivateRoute path='/editprofile' component={EditProfile}/>

      <PrivateRoute path='/createrecipe' component={ CreateRecipe}/>

      <PrivateRoute path="/ingredient" component={IngredientView} />
      <PrivateRoute path="/instruction" component={InstructionView} />
      {/* <Route path="/editrecipe/:block" render={props=> <EditRecipeOptions { ...props} />} /> */}
      {/* <Route path="/editrecipe" component={EditRecipeOptions} /> */}
      
      <Modal />
    </div>
  );
}

export default connect(state => state.modal)(App);
