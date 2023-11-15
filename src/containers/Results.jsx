import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Results = () => {
  const [mealsData, setMealsData] = useState([]);
  const [mealDetails, setMealDetails] = useState(null);

  const location = useLocation();
  const { state } = location;
  const { meals: searchResults } = state || {};

  useEffect(() => {
    // Realizar la búsqueda cuando searchResults cambie
    if (searchResults) {
      fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchResults}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.meals) {
            setMealsData(data.meals);
          } else {
            setMealsData([]);
          }
        });
    }
  }, [searchResults]);

  return (
    <div>
      <div>
        {mealsData &&
          mealsData.map((meal) => (
            <div className="meal-item" key={meal.idMeal} data-id={meal.idMeal}>
              <div className="meal-img">
                <img src={meal.strMealThumb} alt="food" />
              </div>
              <div className="meal-name">
                <h3>{meal.strMeal}</h3>
                {/* No veo dónde está definida getMealRecipe, asegúrate de definirla o pasarla como prop */}
                <button
                  className="recipe-btn"
                  onClick={() => getMealRecipe(meal.idMeal)}
                >
                  Get Recipe
                </button>
              </div>
            </div>
          ))}
      </div>

      <div>
        {mealDetails && (
          <div>
            <h2 className="recipe-title">{mealDetails.strMeal}</h2>
            <p className="recipe-category">{mealDetails.strCategory}</p>
            <div className="recipe-instruct">
              <h3>Instructions:</h3>
              <p>{mealDetails.strInstructions}</p>
            </div>
            <div className="recipe-meal-img">
              <img src={mealDetails.strMealThumb} alt="" />
            </div>
            <div className="recipe-link">
              <a
                href={mealDetails.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Video
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
