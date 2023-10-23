import React, { useState } from 'react';
import axios from 'axios';
import useGetUserID from '../hooks/useGetUserID.js';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import '../styles/CreateRecipe.css';


const CreateRecipe = () => {

    const userID = useGetUserID();
    const navigate = useNavigate();
    const [cookies,] = useCookies(['access_token']);

    const [recipe, setRecipe] = useState({
        name: '',
        ingredients: [],
        instructions: '',
        imageUrl: '',
        cookingTime: 0,
        userOwner: userID
    });


    const handleChange = (event) => {
        const { name, value } = event.target;
        setRecipe({ ...recipe, [name]: value });
    };

    const addIngredient = (e) => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] });
    };

    const handleIngredientChange = (event, index) => {
        const { value } = event.target;
        const ingredients = recipe.ingredients;
        ingredients[index] = value;
        setRecipe({ ...recipe, ingredients });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/recipes', recipe, { headers: { authorization: cookies.access_token } });
            alert('Recipe Created');
            navigate('/');
        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <h1>Create Recipe</h1>
            <div className='create-recipe'>
                <form onSubmit={onSubmit}>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' name='name' onChange={handleChange} placeholder='Recipe Name' />
                    <hr id='line' />
                    <label htmlFor='ingredients'>Ingredients</label>
                    {
                        recipe.ingredients.map((ingredient, index) => (
                            <input placeholder='Ingredient' key={index} type='text' name='ingredients' value={ingredient} onChange={(e) => handleIngredientChange(e, index)} />
                        ))
                    }
                    <button type='button' onClick={addIngredient}>Add Ingredient</button>
                    <hr id='line' />

                    <label htmlFor='instructions'>Instructions</label>
                    <textarea id='instructions' placeholder='Instructions' name='instructions' onChange={handleChange}></textarea>
                    <hr id='line' />
                    <label htmlFor='imageUrl'>Image URL</label>
                    <input type='text' id='imageUrl' placeholder='Image URL' name='imageUrl' onChange={handleChange} />
                    <hr id='line' />
                    <label htmlFor='cookingTime'>Cooking Time (minutes)</label>
                    <input type='number' id='cookingTime' placeholder='Cooking Time' name='cookingTime' onChange={handleChange} />

                    <button type='submit'>Create Recipe</button>
                </form>
            </div>
        </>
    )
}

export default CreateRecipe