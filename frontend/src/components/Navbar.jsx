import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
    <style>{`
      .nav-link { color: #777; text-decoration: none; transition: color 0.4s ease; font-weight: 400; }
      .nav-link:hover { color: #000; }
    `}</style>
    <nav style={{ 
        display: 'flex', justifyContent: 'space-between', padding: '25px 60px', 
        backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0,0,0,0.03)', position: 'sticky', top: 0, zIndex: 100,
        alignItems: 'center', fontFamily: "'Inter', 'Segoe UI', sans-serif"
    }}>
      <div style={{ fontSize: '22px', fontWeight: '300', letterSpacing: '5px' }}>
        <Link to="/" style={{ color: '#000', textDecoration: 'none' }}>LUSTRO</Link>
      </div>
      
      <div style={{ display: 'flex', gap: '40px', fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
        <Link to="/" className="nav-link">Anasayfa</Link>
        <Link to="/products" className="nav-link">Koleksiyon</Link>
        <Link to="/login" className="nav-link">Giriş</Link>
      </div>
    </nav>
    </>
  );
};

export default Navbar;