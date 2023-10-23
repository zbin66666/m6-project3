import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useGetUserID from '../hooks/useGetUserID.js';
import { useCookies } from 'react-cookie';
import '../styles/Home.css'

const Home = () => {

    const [recipes, setRecipes] = useState([]);
    const userID = useGetUserID();
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies,] = useCookies(['access_token']);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get('http://localhost:5000/recipes');
                setRecipes(response.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/recipes/savedRecipes/ids/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchRecipe();
        if (cookies.access_token)
            fetchSavedRecipe();
    }, []);

    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put('http://localhost:5000/recipes', {
                recipeID,
                userID
            }, { headers: { authorization: cookies.access_token } });
            setSavedRecipes(response.data.savedRecipes);
        }
        catch (err) {
            console.log(err);
        }
    };

    const isRecipeSaved = (id) => savedRecipes.includes(id);

    return (
        <div className='home'>
            <h1>RECIPES</h1>
            <ul>
                {
                    recipes.map((recipe) => (
                        <li key={recipe._id}>
                            <div id='div1'>
                                <h2>{recipe.name}</h2>
                                <button
                                    onClick={() => saveRecipe(recipe._id)}
                                    disabled={isRecipeSaved(recipe._id)}
                                >
                                    {isRecipeSaved(recipe._id) ? 'Saved' : 'Save'}
                                </button>
                            </div>
                            <div className='instructions'>
                                <p>{recipe.instructions}</p>
                            </div>
                            <div className="div3">
                                <img src={recipe.imageUrl} alt={recipe.name} />
                                <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Home