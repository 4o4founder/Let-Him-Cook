import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateRecipe from './pages/CreateRecipe';
import Home from './pages/Home';

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));

  const handleLogout = () => { 
    localStorage.clear(); 
    window.location.href = '/'; 
  };

  return (
    <Router>
      {/* FIX 1: Main Container.
         Changed: Removed margin, changed width to 100%, and minHeight to 100vh.
         This makes the background color cover the entire screen from edge-to-edge.
      */}
      <div style={{ 
        backgroundColor: '#030303', 
        minHeight: '100vh', 
        color: '#D7DADC', 
        fontFamily: 'sans-serif', 
        margin: 0, 
        padding: 0 
      }}>
        
        {/* FIX 2: Navigation Bar.
           Changed: Changed width to 100% and set padding for side indents.
           This makes the dark nav bar span the entire top of the screen.
        */}
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

        {/* FIX 3: Content Column.
           Changed: Added a wrapper <div> with a maxWidth to keep the feed centered.
           This ensures the recipes don't stretch too wide on large monitors.
        */}
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreateRecipe />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
