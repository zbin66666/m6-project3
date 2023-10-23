import React, { useEffect, useState } from 'react'
import axios from 'axios';
import useGetUserID from '../hooks/useGetUserID.js'
import '../styles/Saved.css'

const SavedRecipes = () => {

    const userID = useGetUserID();
    const [savedRecipes, setSavedRecipes] = useState([]);

    useEffect(() => {
        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/recipes/savedRecipes/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchSavedRecipe();
    }, []);

    return (
        <div className='saved'>
            <h1>Saved Recipes</h1>
            <ul>
                {
                    savedRecipes.map((recipe) => (
                        <li key={recipe._id}>
                            <div>
                                <h2>{recipe.name}</h2>
                            </div>
                            <div className='instructions'>
                                <p>{recipe.instructions}</p>
                            </div>
                            <img src={recipe.imageUrl} alt={recipe.name} />
                            <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default SavedRecipes