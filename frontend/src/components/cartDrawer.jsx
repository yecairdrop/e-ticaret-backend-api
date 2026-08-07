import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <>
      {/* Arka Plan Karartması (Overlay) */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      {/* Sağdan Açılan Çekmece (Drawer) */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#fafafa] z-[70] shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] flex flex-col font-sans ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Çekmece Başlığı (Header) */}
        <div className="flex items-center justify-between p-8 border-b border-neutral-200 bg-white">
          <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-[#111]">
            Sepetim ({cart.reduce((total, item) => total + item.quantity, 0)})
          </h2>
          <button 
            onClick={onClose}
            className="text-neutral-400 hover:text-black transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Sepet İçeriği (Gövde) */}
        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-neutral-400 gap-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              <p className="text-sm font-light tracking-wide">Sepetiniz şu an boş.</p>
              <button 
                onClick={() => { onClose(); navigate('/products'); }}
                className="mt-4 text-xs uppercase tracking-widest text-[#111] border-b border-[#111] pb-1 hover:text-neutral-500 hover:border-neutral-500 transition-colors"
              >
                Koleksiyonu Keşfet
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item._id || item.id} className="flex gap-6">
                <div className="w-24 h-32 bg-neutral-100 flex-shrink-0">
                  <img 
                    src={item.imageUrl || "https://images.unsplash.com/photo-1618220179428-22790b46a0eb?q=80&w=1000&auto=format&fit=crop"} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1 py-1">
                  <div>
                    <h3 className="text-sm text-[#111] font-light mb-1">{item.title}</h3>
                    <p className="text-sm font-medium text-neutral-500">{item.price} ₺</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    {/* Miktar Kontrolü */}
                    <div className="flex items-center border border-neutral-200 w-24 h-8">
                      <button 
                        onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                        className="flex-1 text-neutral-500 hover:text-black transition-colors"
                      >-</button>
                      <span className="flex-1 text-center text-xs font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                        className="flex-1 text-neutral-500 hover:text-black transition-colors"
                      >+</button>
                    </div>
                    
                    {/* Silme Butonu */}
                    <button 
                      onClick={() => removeFromCart(item._id || item.id)}
                      className="text-[10px] uppercase tracking-wider text-neutral-400 hover:text-red-500 transition-colors"
                    >
                      Kaldır
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Alt Kısım (Özet ve Ödeme Butonu) */}
        {cart.length > 0 && (
          <div className="p-8 bg-white border-t border-neutral-200">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs uppercase tracking-widest text-neutral-500">Ara Toplam</span>
              <span className="text-lg font-light text-[#111]">{cartTotal} ₺</span>
            </div>
            <p className="text-[10px] text-neutral-400 mb-6 text-center">
              Kargo ve vergiler ödeme adımında hesaplanacaktır.
            </p>
            <button 
              onClick={() => { onClose(); navigate('/checkout'); }}
              className="w-full bg-[#111] text-white py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-neutral-800 transition-colors"
            >
              Ödemeye Geç
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;