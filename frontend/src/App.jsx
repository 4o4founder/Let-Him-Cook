import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CreateRecipe from './pages/CreateRecipe.jsx';
import RecipeDetails from './pages/RecipeDetails.jsx';
import Home from './pages/Home.jsx'; // We will create this next

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
      <div style={{ backgroundColor: '#030303', minHeight: '100vh', color: '#D7DADC', fontFamily: 'sans-serif', margin: 0, padding: 0 }}>
        <nav style={{ 
          height: '56px', padding: '0 40px', backgroundColor: '#1A1A1B', 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '1px solid #343536', position: 'sticky', top: 0, zIndex: 100
        }}>
          <Link to="/" style={{ color: '#D7DADC', textDecoration: 'none', fontWeight: '800', fontSize: '20px' }}>LET HIM COOK</Link>
          
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <button onClick={toggleTheme} style={{ background: '#272729', color: '#D7DADC', border: '1px solid #343536', padding: '6px 15px', borderRadius: '20px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>☀️ Light Mode</button>

            {!user ? (
              <>
                <Link to="/login" style={{ color: '#D7DADC', textDecoration: 'none', fontSize: '14px' }}>Log In</Link>
                <Link to="/register" style={{ color: '#030303', backgroundColor: '#D7DADC', padding: '6px 18px', borderRadius: '20px', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>Sign Up</Link>
              </>
            ) : (
              <>
                <Link to="/create" style={{ color: '#D7DADC', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>+ Create</Link>
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#818384', cursor: 'pointer', fontSize: '12px' }}>Logout ({user.result.username})</button>
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
