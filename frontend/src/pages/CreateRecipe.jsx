import { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

function CreateRecipe() {
  const [recipe, setRecipe] = useState({ title: '', description: '', ingredients: '', instructions: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const user = JSON.parse(localStorage.getItem('profile'));
    if (!user) {
      setError('You must be logged in to post.');
      return;
    }
    const formattedRecipe = {
      ...recipe,
      ingredients: recipe.ingredients.split(',').map(i => i.trim()),
      creator: user.result._id
    };
    try {
      await API.post('/api/recipes', formattedRecipe);
      alert('Recipe Published! 🍳');
      navigate('/');
    } catch (err) {
      setError('Failed to publish. Check if backend is running.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '600px', backgroundColor: '#1A1A1B', padding: '40px', borderRadius: '8px', border: '1px solid #343536', boxSizing: 'border-box' }}>
        <h2 style={{ color: '#D7DADC', marginBottom: '30px', textAlign: 'center', fontSize: '28px', fontWeight: '600' }}>Share a Recipe</h2>
        {error && <p style={{ color: '#ed4245', textAlign: 'center' }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input type="text" placeholder="Title" onChange={(e) => setRecipe({...recipe, title: e.target.value})} required style={{ padding: '12px', borderRadius: '4px', border: '1px solid #343536', backgroundColor: '#272729', color: '#D7DADC', outline: 'none' }} />
          <input type="text" placeholder="Description" onChange={(e) => setRecipe({...recipe, description: e.target.value})} required style={{ padding: '12px', borderRadius: '4px', border: '1px solid #343536', backgroundColor: '#272729', color: '#D7DADC', outline: 'none' }} />
          <textarea placeholder="Ingredients (comma separated)" onChange={(e) => setRecipe({...recipe, ingredients: e.target.value})} required style={{ padding: '12px', borderRadius: '4px', border: '1px solid #343536', backgroundColor: '#272729', color: '#D7DADC', outline: 'none', height: '80px' }} />
          <textarea placeholder="Instructions" onChange={(e) => setRecipe({...recipe, instructions: e.target.value})} required style={{ padding: '12px', borderRadius: '4px', border: '1px solid #343536', backgroundColor: '#272729', color: '#D7DADC', outline: 'none', height: '150px' }} />
          <button type="submit" style={{ backgroundColor: '#D7DADC', color: '#030303', border: 'none', padding: '14px', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold' }}>Publish Recipe</button>
        </form>
      </div>
    </div>
  );
}

export default CreateRecipe;
