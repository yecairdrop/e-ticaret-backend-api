import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation(); // Hangi sayfada olduğumuzu anlamak için

  // Aktif sayfaya göre menü yazılarının rengini ayarlayan ufak bir fonksiyon
  const getLinkStyle = (path) => {
    const isActive = location.pathname === path;
    return `text-xs font-medium tracking-[0.15em] uppercase transition-all duration-300 ${
      isActive ? 'text-black' : 'text-neutral-400 hover:text-black'
    }`;
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-neutral-100 transition-all duration-300 font-sans">
      <div className="max-w-7xl mx-auto px-8 md:px-20 h-20 flex items-center justify-between">
        
        {/* Sol Taraf: Logo */}
        <Link 
          to="/" 
          className="text-2xl font-light tracking-[0.25em] text-[#111] hover:opacity-60 transition-opacity"
        >
          LUSTRO
        </Link>

        {/* Sağ Taraf: Linkler */}
        <div className="hidden md:flex items-center gap-10">
          <Link to="/" className={getLinkStyle('/')}>
            Anasayfa
          </Link>
          <Link to="/products" className={getLinkStyle('/products')}>
            Koleksiyon
          </Link>
          <Link to="/login" className={getLinkStyle('/login')}>
            Giriş
          </Link>
        </div>
        
        {/* Mobilde görünmesi için ufak bir hamburger menü ikonu (şimdilik görsel) */}
        <div className="md:hidden flex items-center">
          <button className="text-neutral-500 hover:text-black focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;