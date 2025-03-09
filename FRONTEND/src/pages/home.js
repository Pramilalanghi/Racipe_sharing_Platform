import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://mern-recipe-app1-server.onrender.com/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };

    const fetchSavedRecipes = async () => {
      if (!userID) return;
      try {
        const response = await axios.get(
          `https://mern-recipe-app1-server.onrender.com/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes || []);
      } catch (err) {
        console.error("Error fetching saved recipes:", err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("https://mern-recipe-app1-server.onrender.com/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error("Error saving recipe:", err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div>
    <div className="container-fluid p-0">
    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://thumbs.dreamstime.com/b/stunning-hyper-realistic-image-authentic-kokani-maharashtrian-cuisine-india-generated-ai-355169187.jpg"
            className="d-block w-100"
            alt="Slide 1" />
        </div>
        <div className="carousel-item">
          <img src="corrozel3.jpg"
            className="d-block w-100"
            alt="Slide 2" />
        </div>
        <div className="carousel-item">
          <img src="download.jpg"
            className="d-block w-100"
            alt="Slide 3" />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    </div>
      {/* Recipe List */}
      <div className="container mt-4">
        <h1 className="text-center">Recipes</h1>
        <ul className="list-unstyled">
          {recipes.map((recipe) => (
            <li key={recipe._id} className="mb-4 p-3 border rounded shadow-sm">
              <h2 className="mb-2">{recipe.name}</h2>
              <button 
                className={`btn ${isRecipeSaved(recipe._id) ? "btn-success" : "btn-primary"} mb-2`} 
                onClick={() => saveRecipe(recipe._id)} 
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
              <div className="instructions">
                <p>{recipe.instructions}</p>
              </div>
              <img 
                src={recipe.imageUrl} 
                alt={recipe.name} 
                className="img-fluid rounded"
              />
              <p className="mt-2"><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
