import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CreateRecipe from './pages/CreateRecipe.jsx';
import RecipeDetails from './pages/RecipeDetails.jsx';


function Home() {
  const [recipes, setRecipes] = import('react').then(r => r.useState([]));
  
  return <div style={{textAlign: 'center', marginTop: '50px'}}>Welcome to the Feed</div>;
}

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));

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
          <Link to="/" style={{ color: '#D7DADC', textDecoration: 'none', fontWeight: '800', fontSize: '20px' }}>
            LET HIM COOK
          </Link>
          
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
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

        <div style={{ maxWidth: '100%', margin: '0 auto' }}>
          <Routes>
             {/* We use the Home logic you already have in your repo */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreateRecipe />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
