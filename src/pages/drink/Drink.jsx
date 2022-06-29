import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import '../../component/recipeCard.css';
import Gallery from '../../component/Gallery';
import { MeuContextoInterno } from '../../context';
import * as localApi from '../../helpers/localApi/index';

const Drink = () => {
  const { id: urlId } = useParams();

  const [recipeDetails, setRecipeDetails] = useState({});
  const [isBtnEnable, setIsBtnEnable] = useState(false);
  const [isRecipeInProgress, setContinueBtn] = useState(true);
  const [isURLcopied, setCopiedURL] = useState(false);
  const [isFavorite, setFavorite] = useState(false);

  const {
    recipes: { drinks },
  } = useContext(MeuContextoInterno);

  const SIX = 4;
  const recomendation = drinks.slice(0, SIX);

  const {
    idDrink,
    strCategory,
    strDrinkThumb,
    strDrink,
    strAlcoholic,
    strInstructions,
  } = recipeDetails;

  useEffect(() => {
    const getRecipe = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${urlId}`;
      const response = await fetch(url);
      const data = await response.json();
      setRecipeDetails(data.drinks[0]);
    };
    getRecipe();
    const verifyInProgress = () => {
      const inProgressRecipes = localApi
        .getLocalKey('inProgressRecipes') || { cocktails: {} };
      const isInProgress = urlId in inProgressRecipes.cocktails;
      setContinueBtn(isInProgress);
    };
    verifyInProgress();
    const verifyIsDone = () => {
      const doneRecipes = localApi.getLocalKey('doneRecipes') || [];
      const recipeIsDone = doneRecipes.some(({ id }) => id === urlId);
      setIsBtnEnable(!recipeIsDone);
    };
    verifyIsDone();
    const verifyIsFavorite = () => {
      const favoriteRecipes = localApi.getLocalKey('favoriteRecipes') || [];
      const checkIsFavorite = favoriteRecipes.some(({ id }) => id === urlId);
      setFavorite(checkIsFavorite);
    };
    verifyIsFavorite();
  }, [urlId]);

  const filterIgredients = (recipe) => {
    const FIFTEEN = 15;
    const ingredientList = [];

    for (let i = 1; i <= FIFTEEN; i += 1) {
      const ingredientKey = `strIngredient${i}`;
      const measureKey = `strMeasure${i}`;

      if (recipe[ingredientKey] !== null && recipe[measureKey] !== null) {
        const ingredient = `${recipe[ingredientKey]}: ${recipe[measureKey]}`;
        ingredientList.push(ingredient);
      }
    }

    return ingredientList;
  };

  const linkToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedURL(true);
  };

  const handleFavoriteBtn = () => {
    localApi.setLocalKey('favoriteRecipes',
      [{ id: idDrink,
        type: 'drink',
        nationality: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb }]);
    setFavorite(!isFavorite);
  };

  return (
    <div>
      <h1 data-testid="recipe-title" className="l-drink">{ strDrink }</h1>

      <img
        className="card-img card-img-mine"
        data-testid="recipe-photo"
        src={ strDrinkThumb }
        alt={ strDrink }
      />

      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => linkToClipboard() }
      >
        <img src={ shareIcon } alt="Share" className="share-icon" />
        { isURLcopied && <p>Link copied!</p> }
      </button>

      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => handleFavoriteBtn() }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      >
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="Favorite"
          className="favorite-icon"
        />
      </button>

      <p data-testid="recipe-category">{strAlcoholic}</p>

      <ul>
        {filterIgredients(recipeDetails).map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { ingredient }
          </li>
        ))}
      </ul>

      <p data-testid="instructions">{strInstructions}</p>

      <Gallery recipes={ recomendation } type="drinks" />
      {isBtnEnable && (
        <Link to={ `${urlId}/in-progress` }>
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-btn btn btn-primary btn-lg"
          >
            { isRecipeInProgress ? 'Continue Recipe' : 'Start Recipe' }
          </button>
        </Link>
      )}
    </div>
  );
};

export default Drink;
