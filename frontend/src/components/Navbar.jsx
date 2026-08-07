import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const location = useLocation(); // Hangi sayfada olduğumuzu anlamak için
  
  // Sepet Çekmecesi State'leri
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();
  
  // Sepetteki toplam ürün sayısını bulmak için
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Aktif sayfaya göre menü yazılarının rengini ayarlayan ufak bir fonksiyon
  const getLinkStyle = (path) => {
    const isActive = location.pathname === path;
    return `text-xs font-medium tracking-[0.15em] uppercase transition-all duration-300 ${
      isActive ? 'text-black' : 'text-neutral-400 hover:text-black'
    }`;
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-neutral-100 transition-all duration-300 font-sans">
        <div className="max-w-7xl mx-auto px-8 md:px-20 h-20 flex items-center justify-between">
          
          {/* Sol Taraf: Logo */}
          <Link 
            to="/" 
            className="text-2xl font-light tracking-[0.25em] text-[#111] hover:opacity-60 transition-opacity"
          >
            LUSTRO
          </Link>

          {/* Sağ Taraf: Masaüstü Linkler ve Sepet */}
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
            
            {/* Masaüstü Sepet Butonu */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-neutral-400 hover:text-black transition-colors relative flex items-center"
            >
              <span className="text-xs font-medium tracking-[0.15em] uppercase">Sepet</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-[#111] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
          
          {/* Mobil Görünüm: Hamburger Menü ve Sepet İkonu */}
          <div className="md:hidden flex items-center gap-5">
            {/* Mobil Sepet Butonu */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-neutral-500 hover:text-black relative"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#111] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Hamburger İkonu */}
            <button className="text-neutral-500 hover:text-black focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

        </div>
      </nav>

      {/* Sepet Çekmecesi - Navigasyonun dışında ama aynı kapsayıcı içinde render edilir */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;