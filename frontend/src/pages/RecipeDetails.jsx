import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await API.get('/api/recipes');
        const found = response.data.find(r => r._id === id);
        setRecipe(found);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p style={{ textAlign: 'center', color: '#818384', marginTop: '50px' }}>Loading recipe...</p>;

  return (
    <div style={{ maxWidth: '640px', margin: '20px auto', backgroundColor: '#1A1A1B', border: '1px solid #343536', padding: '20px' }}>
      <button 
        onClick={() => navigate('/')} 
        style={{ background: 'none', border: '1px solid #343536', color: '#818384', padding: '5px 15px', borderRadius: '20px', cursor: 'pointer', marginBottom: '20px', fontSize: '12px' }}
      >
        ← Back to Feed
      </button>
      
      <h1 style={{ fontSize: '24px', color: '#D7DADC', marginBottom: '10px' }}>{recipe.title}</h1>
      <p style={{ color: '#818384', marginBottom: '20px' }}>{recipe.description}</p>
      
      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ color: '#f39c12', fontSize: '16px' }}>Ingredients</h3>
        <ul style={{ color: '#D7DADC', lineHeight: '1.8' }}>
          {recipe.ingredients.map((ing, index) => (
            <li key={index}>{ing}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 style={{ color: '#f39c12', fontSize: '16px' }}>Instructions</h3>
        <p style={{ color: '#D7DADC', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
          {recipe.instructions}
        </p>
      </div>
    </div>
  );
}

export default RecipeDetails;
