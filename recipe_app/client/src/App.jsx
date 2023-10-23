import { Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import CreateRecipe from './pages/CreateRecipe';
import SavedRecipes from './pages/SavedRecipes';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <div>
            <Navbar />
            <div className='components'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/auth' element={<Auth />} />
                    <Route path='/create-recipe' element={<CreateRecipe />} />
                    <Route path='/saved-recipes' element={<SavedRecipes />} />
                </Routes>
            </div>
        </div>
    )
}

export default App