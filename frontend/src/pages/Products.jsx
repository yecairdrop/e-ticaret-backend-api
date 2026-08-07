import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; 
import ProductCard from '../components/ProductCard'; 

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        const actualProducts = response.data.urunler || response.data || [];
        
        // KANKA BURAYA DİKKAT: Backendden gelen veriyi konsola yazdırıyoruz ki resmin asıl adını görelim
        console.log("Backend'den gelen ürün datası:", actualProducts);
        
        setProducts(actualProducts);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Koleksiyon yüklenirken sistemsel bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-81px)] bg-[#fafafa] flex items-center justify-center font-sans">
        <h3 className="text-neutral-500 font-light tracking-[2px]">Koleksiyon Yükleniyor...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-81px)] bg-[#fafafa] flex items-center justify-center font-sans">
        <h3 className="text-red-500 font-light tracking-wide">{error}</h3>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-81px)] bg-[#fafafa] px-8 py-16 md:px-20 font-sans">
      
      <div className="flex justify-between items-end mb-12 border-b border-neutral-200 pb-4">
        <h2 className="text-[#111] font-light text-3xl md:text-4xl m-0 tracking-tight">
          Özel Koleksiyon
        </h2>
        <span className="text-xs text-neutral-500 tracking-widest uppercase font-medium">
          {Array.isArray(products) ? products.length : 0} Eser Gösteriliyor
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
        {Array.isArray(products) && products.map(product => (
          <div 
            key={product.id || product._id} 
            onClick={() => navigate(`/product/${product.id || product._id}`)}
            className="block cursor-pointer"
          >
            <ProductCard 
              title={product.title}
              category={product.category}
              price={product.price}
              // Backend'deki olası resim isimlerini buraya yedekli olarak girdik
              imageUrl={product.imageUrl || product.image || product.resim || product.image_url}
            />
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Products;