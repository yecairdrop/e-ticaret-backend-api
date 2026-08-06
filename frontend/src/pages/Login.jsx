import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      
      // Postman'de kopyaladığımız o token'ı kodla alıp tarayıcının hafızasına atıyoruz
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.kullanici));
      
      // Giriş başarılıysa hiç kontrol etmeden direkt admin paneline yolla
      navigate('/admin');
      
    } catch (err) {
      console.error(err);
      setError('Giriş yapılamadı. E-posta veya şifre hatalı.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 81px)', backgroundColor: '#fafafa', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ background: '#fff', padding: '50px', borderRadius: '2px', boxShadow: '0 20px 40px rgba(0,0,0,0.03)', width: '100%', maxWidth: '400px', border: '1px solid #eaeaea' }}>
        <h2 style={{ textAlign: 'center', fontWeight: '300', marginBottom: '30px', fontSize: '1.8rem', color: '#111', letterSpacing: '-0.5px' }}>Yönetici Girişi</h2>
        
        {error && <div style={{ color: '#d9534f', fontSize: '13px', marginBottom: '20px', textAlign: 'center', background: '#fdf0f0', padding: '10px', borderRadius: '2px' }}>{error}</div>}
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input 
            type="email" 
            placeholder="E-posta Adresi" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '2px', fontSize: '14px', outline: 'none', transition: 'border 0.3s' }}
            onFocus={(e) => e.target.style.borderColor = '#111'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
            required 
          />
          <input 
            type="password" 
            placeholder="Şifre" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '2px', fontSize: '14px', outline: 'none', transition: 'border 0.3s' }}
            onFocus={(e) => e.target.style.borderColor = '#111'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
            required 
          />
          <button 
            type="submit"
            style={{ background: '#111', color: '#fff', padding: '16px', border: 'none', cursor: 'pointer', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', transition: 'background 0.3s', marginTop: '10px' }}
            onMouseOver={(e) => e.target.style.background = '#333'}
            onMouseOut={(e) => e.target.style.background = '#111'}
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;