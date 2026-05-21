import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', backgroundColor: '#030303' }}>
      {loading ? (
        <p style={{ marginTop: '40px', color: '#818384' }}>Loading feed...</p>
      ) : (
        <div style={{ width: '100%', maxWidth: '640px' }}>
          {recipes.map((recipe) => (
            <Link to={`/recipe/${recipe._id}`} key={recipe._id} style={{ textDecoration: 'none' }}>
              <div style={{ 
                backgroundColor: '#1A1A1B', borderBottom: '1px solid #343536', 
                padding: '20px 40px', width: '100%', boxSizing: 'border-box'
              }}>
                <p style={{ fontSize: '12px', color: '#818384', marginBottom: '8px' }}>
                  Posted by u/{recipe.creator?.username || 'chef'} • {new Date(recipe.createdAt).toLocaleDateString()}
                </p>
                <h3 style={{ fontSize: '20px', color: '#D7DADC', margin: '0 0 10px 0' }}>{recipe.title}</h3>
                <p style={{ color: '#D7DADC', fontSize: '15px' }}>{recipe.description}</p>
                <div style={{ color: '#818384', fontSize: '12px', fontWeight: 'bold', marginTop: '15px' }}>💬 View Recipe</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
