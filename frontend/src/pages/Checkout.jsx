import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  // Kargo ücreti (Örnek: 500 TL altı siparişlerde 50 TL kargo, üstü bedava)
  const shippingCost = cartTotal > 500 ? 0 : 50;
  const finalTotal = cartTotal + shippingCost;

  const handleCheckout = (e) => {
    e.preventDefault();
    // Burada normalde backend'e (Stripe, Iyzico vb.) istek atılır.
    // Biz şimdilik başarılı sayıp sepeti temizliyoruz.
    setIsSuccess(true);
    clearCart();
    
    // 3 saniye sonra anasayfaya yönlendir
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="min-h-[calc(100vh-81px)] bg-[#fafafa] flex flex-col items-center justify-center font-sans gap-6">
        <h3 className="text-neutral-500 font-light tracking-[2px]">Sepetinizde ürün bulunmuyor.</h3>
        <button 
          onClick={() => navigate('/products')} 
          className="text-xs uppercase tracking-widest text-[#111] border-b border-[#111] pb-1 hover:text-neutral-500 hover:border-neutral-500 transition-colors"
        >
          Koleksiyonu Keşfet
        </button>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-[calc(100vh-81px)] bg-[#fafafa] flex flex-col items-center justify-center font-sans gap-6">
        <div className="w-16 h-16 bg-[#111] rounded-full flex items-center justify-center text-white mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-light text-[#111] tracking-wide">Siparişiniz Alındı</h2>
        <p className="text-neutral-500 font-light">Lustro'yu tercih ettiğiniz için teşekkür ederiz. Anasayfaya yönlendiriliyorsunuz...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-81px)] bg-[#fafafa] font-sans py-16 px-8 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Sol Taraf: Teslimat ve Ödeme Formu */}
        <div className="w-full lg:w-3/5">
          <h2 className="text-xl font-light text-[#111] tracking-wide mb-8">Teslimat Bilgileri</h2>
          
          <form onSubmit={handleCheckout} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-neutral-500 font-medium">Ad</label>
                <input required type="text" className="border border-neutral-200 bg-transparent p-3 focus:outline-none focus:border-[#111] transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-neutral-500 font-medium">Soyad</label>
                <input required type="text" className="border border-neutral-200 bg-transparent p-3 focus:outline-none focus:border-[#111] transition-colors" />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-neutral-500 font-medium">E-Posta</label>
              <input required type="email" className="border border-neutral-200 bg-transparent p-3 focus:outline-none focus:border-[#111] transition-colors" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-neutral-500 font-medium">Açık Adres</label>
              <textarea required rows="3" className="border border-neutral-200 bg-transparent p-3 focus:outline-none focus:border-[#111] transition-colors resize-none"></textarea>
            </div>

            <h2 className="text-xl font-light text-[#111] tracking-wide mb-8 mt-12">Ödeme Bilgileri</h2>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-neutral-500 font-medium">Kart Üzerindeki İsim</label>
              <input required type="text" className="border border-neutral-200 bg-transparent p-3 focus:outline-none focus:border-[#111] transition-colors" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-neutral-500 font-medium">Kart Numarası</label>
              <input required type="text" placeholder="0000 0000 0000 0000" className="border border-neutral-200 bg-transparent p-3 focus:outline-none focus:border-[#111] transition-colors" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-neutral-500 font-medium">Son Kullanma (AA/YY)</label>
                <input required type="text" placeholder="MM/YY" className="border border-neutral-200 bg-transparent p-3 focus:outline-none focus:border-[#111] transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-neutral-500 font-medium">CVC</label>
                <input required type="text" placeholder="123" className="border border-neutral-200 bg-transparent p-3 focus:outline-none focus:border-[#111] transition-colors" />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#111] text-white py-5 mt-8 text-xs tracking-[0.2em] uppercase font-medium hover:bg-neutral-800 transition-colors"
            >
              Siparişi Tamamla
            </button>
          </form>
        </div>

        {/* Sağ Taraf: Sipariş Özeti */}
        <div className="w-full lg:w-2/5">
          <div className="bg-white border border-neutral-200 p-8 sticky top-28">
            <h2 className="text-xl font-light text-[#111] tracking-wide mb-8">Sipariş Özeti</h2>
            
            <div className="flex flex-col gap-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={item.id || item._id} className="flex gap-4">
                  <div className="w-16 h-20 bg-neutral-100 flex-shrink-0">
                    <img 
                      src={item.image_url || item.imageUrl || "https://images.unsplash.com/photo-1618220179428-22790b46a0eb?q=80&w=1000&auto=format&fit=crop"} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center flex-1">
                    <h3 className="text-sm text-[#111] font-light">{item.title}</h3>
                    <p className="text-xs text-neutral-400 mt-1">Adet: {item.quantity}</p>
                    <p className="text-sm font-medium text-neutral-500 mt-2">{item.price} ₺</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-200 pt-6 space-y-4">
              <div className="flex justify-between items-center text-sm font-light text-neutral-500">
                <span>Ara Toplam</span>
                <span>{cartTotal} ₺</span>
              </div>
              <div className="flex justify-between items-center text-sm font-light text-neutral-500">
                <span>Kargo</span>
                <span>{shippingCost === 0 ? 'Ücretsiz' : `${shippingCost} ₺`}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-normal text-[#111] pt-4 border-t border-neutral-100">
                <span>Toplam</span>
                <span>{finalTotal} ₺</span>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;