import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import API from './api';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CreateRecipe from './pages/CreateRecipe.jsx';
import RecipeDetails from './pages/RecipeDetails.jsx';

// --- HOME FEED COMPONENT (Defined here to avoid import errors) ---
function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await API.get('/api/recipes');
        setRecipes(response.data);
        setLoading(false);
      } catch (error) { 
        console.error("Error fetching recipes:", error);
        setLoading(false); 
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '20px' }}>
      {loading ? (
        <p style={{ textAlign: 'center', color: '#818384' }}>Loading feed...</p>
      ) : (
        recipes.map((recipe) => (
          <Link to={`/recipe/${recipe._id}`} key={recipe._id} style={{ textDecoration: 'none' }}>
            <div style={{ 
              backgroundColor: '#1A1A1B', 
              borderBottom: '1px solid #343536', 
              padding: '20px',
              marginBottom: '10px',
              borderRadius: '4px'
            }}>
              <h3 style={{ color: '#D7DADC', margin: '0 0 10px 0' }}>{recipe.title}</h3>
              <p style={{ color: '#D7DADC', fontSize: '14px' }}>{recipe.description}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

// --- MAIN APP ---
function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  const handleLogout = () => { localStorage.clear(); window.location.href = '/'; };

  return (
    <Router>
      <div style={{ 
        backgroundColor: '#030303', 
        minHeight: '100vh', 
        color: '#D7DADC', 
        margin: 0, 
        padding: 0 
      }}>
        <nav style={{ 
          height: '56px', padding: '0 40px', backgroundColor: '#1A1A1B', 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '1px solid #343536', width: '100%', boxSizing: 'border-box'
        }}>
          <Link to="/" style={{ color: '#D7DADC', textDecoration: 'none', fontWeight: 'bold' }}>LET HIM COOK</Link>
          <div style={{ display: 'flex', gap: '20px' }}>
            {!user ? (
              <Link to="/login" style={{ color: '#D7DADC', textDecoration: 'none' }}>Log In</Link>
            ) : (
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#818384', cursor: 'pointer' }}>Logout</button>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateRecipe />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
