import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext'; // 1. Sepet beynini import ettik

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 2. Context'ten sepete ekleme fonksiyonunu çektik
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data.urun || response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Eser detayları yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-81px)] bg-[#fafafa] flex items-center justify-center font-sans">
        <h3 className="text-neutral-500 font-light tracking-[2px]">Eser Yükleniyor...</h3>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[calc(100vh-81px)] bg-[#fafafa] flex flex-col items-center justify-center font-sans gap-6">
        <h3 className="text-red-500 font-light tracking-wide">{error || 'Eser bulunamadı.'}</h3>
        <button 
          onClick={() => navigate('/products')} 
          className="text-xs uppercase tracking-widest text-[#111] border-b border-[#111] pb-1 hover:text-neutral-500 hover:border-neutral-500 transition-colors"
        >
          Koleksiyona Dön
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-81px)] bg-[#fafafa] font-sans pb-24">
      <div className="max-w-7xl mx-auto px-8 md:px-20 pt-12 md:pt-16">
        
        <button 
          onClick={() => navigate('/products')}
          className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-[#111] transition-colors mb-12"
        >
          <svg className="w-4 h-4 transform group-hover:-translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Koleksiyona Dön
        </button>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          <div className="w-full lg:w-1/2 flex-shrink-0">
            <div className="aspect-[4/5] bg-neutral-100 rounded-sm overflow-hidden">
              <img 
                src={product.imageUrl || "https://images.unsplash.com/photo-1618220179428-22790b46a0eb?q=80&w=1000&auto=format&fit=crop"} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            
            <span className="text-xs tracking-[0.2em] text-neutral-400 uppercase font-medium mb-4 block">
              {product.category || "Özel Koleksiyon"}
            </span>
            
            <h1 className="text-4xl md:text-5xl font-light text-[#111] tracking-tight mb-6 leading-tight">
              {product.title}
            </h1>
            
            <p className="text-2xl font-light text-neutral-800 mb-10">
              {product.price ? `${product.price} ₺` : "Fiyat Belirlenmedi"}
            </p>
            
            <div className="w-12 h-[1px] bg-neutral-300 mb-10"></div>
            
            <div className="mb-14">
              <h3 className="text-xs font-medium tracking-[0.15em] text-[#111] uppercase mb-5 block">
                Eser Hakkında
              </h3>
              <p className="text-neutral-500 leading-relaxed font-light text-sm md:text-base text-justify">
                {product.description || "Bu eşsiz parça, yaşam alanlarınıza zamansız bir zarafet katmak için özenle tasarlanmıştır. Minimalist detayları ve usta işçiliği ile evinize değer katar. Lustro atölyelerinde sınırlı sayıda üretilmiştir."}
              </p>
            </div>
            
            {/* 3. Butona onClick özelliğini verdik ve fonksiyonu bağladık */}
            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-[#111] text-white py-5 px-8 text-xs tracking-[0.2em] uppercase font-medium hover:bg-neutral-800 transition-colors duration-300"
            >
              Sepete Ekle
            </button>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;