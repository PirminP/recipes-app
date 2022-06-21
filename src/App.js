import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/food/Foods';
import Food from './pages/food/Food';
import Drink from './pages/drink/Drink';
import Drinks from './pages/drink/Drinks';
import Explore from './pages/Explore/Explore';
import ExploreFoods from './pages/Explore/ExploreFoods';
import ExploreDrinks from './pages/Explore/ExploreDrinks';
import ExpDrinksIng from './pages/Explore/especific/ExpDrinksIng';
import ExpFoodsIng from './pages/Explore/especific/ExpFoodsIng';
import ExpFoodsNat from './pages/Explore/especific/ExpFoodsNat';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/foods/:id" component={ Food } />
        <Route exact path="/drinks" component={ Drink } />
        <Route exact path="/drinks/:id" component={ Drinks } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route
          exact
          path="/explore/foods/ingredients"
          component={ ExpFoodsIng }
        />
        <Route
          exact
          path="/explore/drinks/ingredients"
          component={ ExpDrinksIng }
        />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ ExpFoodsNat }
        />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
