import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api'; 

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsError(false);
    setMessage('');
    try {
      await API.post('/api/auth/register', { username, email, password });
      setIsError(false);
      setMessage("Account created! Redirecting to login...");
      setTimeout(() => navigate('/login'), 2000); 
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#1A1A1B', padding: '30px', borderRadius: '4px', border: '1px solid #343536' }}>
        <h2 style={{ color: '#D7DADC', marginBottom: '20px', textAlign: 'center', fontWeight: '500' }}>Sign Up</h2>
        {message && <p style={{ color: isError ? '#ed4245' : '#4bb543', textAlign: 'center', fontSize: '14px', marginBottom: '15px' }}>{message}</p>}
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#818384', fontSize: '14px' }}>Username</label>
            <input type="text" placeholder="u/chefname" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: '100%', padding: '12px', backgroundColor: '#272729', border: '1px solid #343536', borderRadius: '4px', color: '#D7DADC', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#818384', fontSize: '14px' }}>Email</label>
            <input type="email" placeholder="chef@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '12px', backgroundColor: '#272729', border: '1px solid #343536', borderRadius: '4px', color: '#D7DADC', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#818384', fontSize: '14px' }}>Password</label>
            <input type="password" placeholder="Min 6 chars" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '12px', backgroundColor: '#272729', border: '1px solid #343536', borderRadius: '4px', color: '#D7DADC', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#D7DADC', color: '#1A1A1B', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>Create Account</button>
        </form>
        <p style={{ color: '#818384', fontSize: '12px', textAlign: 'center', marginTop: '20px' }}>
          Already a chef? <span style={{ color: '#4f94d4', cursor: 'pointer' }} onClick={() => navigate('/login')}>Log In</span>
        </p>
      </div>
    </div>
  );
}

export default Register;
