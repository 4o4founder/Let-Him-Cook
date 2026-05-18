import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import API from './api';

import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CreateRecipe from './pages/CreateRecipe.jsx';
import RecipeDetails from './pages/RecipeDetails.jsx';

// --- HOME FEED ---
function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('profile'));

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

  const handleDelete = async (e, id) => {
    e.preventDefault(); // Prevents navigating to the details page
    if (window.confirm("Delete this recipe?")) {
      try {
        await API.delete(`/api/recipes/${id}`);
        setRecipes(recipes.filter((r) => r._id !== id));
      } catch (error) {
        alert("Delete failed. You might not have permission.");
      }
    }
  };

  return (
    <div style={{ width: '100%', margin: 0, padding: 0 }}>
      {loading ? (
        <p style={{ textAlign: 'center', color: '#818384', marginTop: '40px' }}>Loading feed...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {recipes.map((recipe) => (
            <Link to={`/recipe/${recipe._id}`} key={recipe._id} style={{ textDecoration: 'none' }}>
              <div style={{ 
                backgroundColor: '#1A1A1B', 
                borderBottom: '1px solid #343536', 
                padding: '20px 40px',
                width: '100%',
                boxSizing: 'border-box',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#212122'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1A1A1B'}
              >
                <p style={{ fontSize: '12px', color: '#818384', marginBottom: '8px' }}>
                  Posted by u/{recipe.creator?.username || 'chef'} • {new Date(recipe.createdAt).toLocaleDateString()}
                </p>
                <h3 style={{ fontSize: '20px', fontWeight: '500', color: '#D7DADC', margin: '0 0 10px 0' }}>{recipe.title}</h3>
                <p style={{ color: '#D7DADC', fontSize: '15px', marginBottom: '15px' }}>{recipe.description}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ color: '#818384', fontSize: '12px', fontWeight: 'bold' }}>💬 View Recipe</div>
                  
                  {/* Delete button only shows if you are the creator */}
                  {user?.result?._id === (recipe.creator?._id || recipe.creator) && (
                    <button 
                      onClick={(e) => handleDelete(e, recipe._id)} 
                      style={{ background: 'none', border: 'none', color: '#ed4245', cursor: 'pointer', fontSize: '12px', padding: '0' }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </Link>
          ))}
          {recipes.length === 0 && (
            <p style={{ textAlign: 'center', color: '#818384', marginTop: '40px' }}>No recipes yet. Start cooking!</p>
          )}
        </div>
      )}
    </div>
  );
}

// --- MAIN APP ---
function App() {
  const user = JSON.parse(localStorage.getItem('profile'));

  const toggleTheme = () => {
    alert("The developer of this website does not like light theme, so you have to use the website in dark theme too! 👨‍💻🚫☀️");
  };

  const handleLogout = () => { 
    localStorage.clear(); 
    window.location.href = '/'; 
  };

  return (
    <Router>
      <div style={{ 
        backgroundColor: '#030303', 
        minHeight: '100vh', 
        color: '#D7DADC', 
        fontFamily: 'sans-serif', 
        margin: 0, 
        padding: 0 
      }}>
        <nav style={{ 
          height: '56px', 
          padding: '0 40px', 
          backgroundColor: '#1A1A1B', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: '1px solid #343536', 
          position: 'sticky', 
          top: 0, 
          zIndex: 100,
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <Link to="/" style={{ color: '#D7DADC', textDecoration: 'none', fontWeight: '800', fontSize: '20px', letterSpacing: '-0.5px' }}>
            LET HIM COOK
          </Link>
          
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <button onClick={toggleTheme} style={{ 
              background: '#272729', 
              color: '#D7DADC', border: '1px solid #343536', 
              padding: '6px 15px', borderRadius: '20px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold'
            }}>
              ☀️ Light Mode
            </button>

            {!user ? (
              <>
                <Link to="/login" style={{ color: '#D7DADC', textDecoration: 'none', fontSize: '14px' }}>Log In</Link>
                <Link to="/register" style={{ 
                  color: '#030303', 
                  backgroundColor: '#D7DADC', 
                  padding: '6px 18px', 
                  borderRadius: '20px', 
                  textDecoration: 'none', 
                  fontSize: '14px', 
                  fontWeight: 'bold' 
                }}>Sign Up</Link>
              </>
            ) : (
              <>
                <Link to="/create" style={{ color: '#D7DADC', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>+ Create</Link>
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#818384', cursor: 'pointer', fontSize: '12px' }}>
                  Logout ({user.result.username})
                </button>
              </>
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
