import React, { useState } from "react";
import SpoonacularAPI from "../utils/SpoonacularAPI";
import RecipeSearchBar from "../components/home/RecipeSearchBar";
import RecipeCardDisplay from "../components/home/RecipeCardDisplay";
import Wrapper from "../components/home/Wrapper";
import UnsplashAPI from "../utils/unsplashAPI";

function RecipeSearchContainer() {
  const [search, setSearch] = useState(""); // useState is empty string
  const [spoonacularResults, setSpoonacularResults] = useState([]);
  const [unsplashImage, setBackgroundImg] = useState();

  function handleChange(e) {
    setSearch(e.target.value); // sets search var to search value
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    searchRecipes(search); // function starts axios GET with search parameter 
  }

  const searchRecipes = (query) => {
    SpoonacularAPI(query)
    .then((results) => {
      setSpoonacularResults(results);
    }) 
    .catch((err) => {
      throw err;
    })

    UnsplashAPI(search)
    .then((results) => {
      setBackgroundImg(results[0].urls.full);
    })
    .catch((err) => {
      throw err;
    })
  };

  const backgroundStyle = {
    backgroundImage: `url("${unsplashImage}")`,
    backgroundPosition: `center`,
    backgroundRepeat: `no-repeat`,
    backgroundSize: `cover`
  }

  return (
    <div  style={backgroundStyle}>
    <div className="container">
    <RecipeSearchBar
        onChange={handleChange}
        value={search}
        onClick={handleFormSubmit}
      />
      <div className="container">
        <Wrapper>
          {spoonacularResults.map((result) => (
            <RecipeCardDisplay 
              key={result.id}
              id={result.id}
              name={result.title}
              image={result.image}
            />
          ))}
        </Wrapper>
      </div>
    </div>
    </div>
  );
}

export default RecipeSearchContainer;
