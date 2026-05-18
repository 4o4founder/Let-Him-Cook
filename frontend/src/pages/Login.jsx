import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api'; 

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await API.post('/api/auth/login', formData);
      localStorage.setItem('profile', JSON.stringify(response.data));
      alert('Login Successful!');
      window.location.href = '/'; 
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#1A1A1B', padding: '30px', borderRadius: '4px', border: '1px solid #343536' }}>
        <h2 style={{ color: '#D7DADC', marginBottom: '20px', textAlign: 'center', fontWeight: '500' }}>Log In</h2>
        {error && <p style={{ color: '#ed4245', textAlign: 'center', fontSize: '14px' }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#818384', fontSize: '14px' }}>Email</label>
            <input type="email" name="email" onChange={handleChange} required style={{ width: '100%', padding: '12px', backgroundColor: '#272729', border: '1px solid #343536', borderRadius: '4px', color: '#D7DADC', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#818384', fontSize: '14px' }}>Password</label>
            <input type="password" name="password" onChange={handleChange} required style={{ width: '100%', padding: '12px', backgroundColor: '#272729', border: '1px solid #343536', borderRadius: '4px', color: '#D7DADC', outline: 'none' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#D7DADC', color: '#1A1A1B', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>Log In</button>
        </form>
        <p style={{ color: '#818384', fontSize: '12px', textAlign: 'center', marginTop: '20px' }}>
          New to Let Him Cook? <span style={{ color: '#4f94d4', cursor: 'pointer' }} onClick={() => navigate('/register')}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
