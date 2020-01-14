import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import FormikLoginForm from "./components/LoginForm";
import FormikRegisterForm from "./components/RegisterForm";
import Welcome from "./components/Welcome";
import SearchBar from "./components/SearchBar";
import RecipeView from "./components/RecipeView";
import SeeRecipe from "./components/SeeRecipe";
import ProfileView from "./components/ProfileView";
import EditProfile from "./components/EditProfile";
import IngredientView from "./components/IngredientView";
import InstructionView from "./components/InstructionView";
import CreateRecipe from "./components/CreateRecipe";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={RecipeView} />
      <Route path="/login" component={FormikLoginForm} />
      <Route path="/register" component={FormikRegisterForm} />
      <Route path="/recipes" exact component={RecipeView} />
      <Route path="/recipes/:id" render={props => <SeeRecipe {...props} />} />
      {/* <PrivateRoute path='/profile' component={ProfileView}/> */}
      {/* <PrivateRoute path='/editprofile' component={EditProfile}/> */}
      <PrivateRoute path='/createrecipe' component={ CreateRecipe}/>
      <Route path="/profile" component={ProfileView} />
      <Route path="/editprofile" component={EditProfile} />
      {/* <Route path="/createrecipe" component={CreateRecipe} /> */}
      <Route path="/ingredient" component={IngredientView} />
      <Route path="/instruction" component={InstructionView} />
    </div>
  );
}

export default App;