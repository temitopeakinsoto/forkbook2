import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Recipe = ({ recipe }) => {
  console.log("AAA", recipe);

  const {
    id,
    recipe_title,
    author,
    time_required,
    difficulty,
    budget,
    imageUrl
  } = recipe;

  let color = "";
  if (difficulty === 1) color = "green";
  else if (difficulty === 2) color = "orange";
  else color = "red";
  const lastLetter = author.substr(-1) === "s" ? "'" : "'s";

  return (
    <div className="box">
      <Link to={`/recipes/${id}`}>
        {/* <div className='box'> */}
        <img className="recipe" src={imageUrl} alt="an " />
        {/* <img className='recipe' src={recipe_image} alt='an '/> */}
        <div className="recipe-card">
          {/* <p>{no_of_likes}</p> */}
          {/* <img className='recipe' alt='an'/> */}
          <p>{author + lastLetter}</p>
          <h2>{recipe_title}</h2>
          <div className="recipe-card-tag">
            <div>
              <p>{time_required} mins</p>
            </div>
            <div>
              <p>${budget}</p>
            </div>
            <div>
              <p style={{ backgroundColor: color }} className="level-recipe">
                {difficulty}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Recipe;