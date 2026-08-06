import { useState, useEffect } from 'react';
import api from '../services/api';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        // Gelen verinin kesinlikle bir dizi (array) olduğundan emin oluyoruz, yoksa React çöker (beyaz ekran)
        const actualProducts = response.data.urunler || response.data || [];
        setProducts(Array.isArray(actualProducts) ? actualProducts : []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bu eseri vitrinden kalıcı olarak silmek istediğine emin misin?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setProducts(products.filter(product => (product.id || product._id) !== id));
      alert("Eser başarıyla silindi!");
      
    } catch (err) {
      console.error(err);
      alert("Silme başarısız! Yetkiniz yetersiz olabilir.");
    }
  };

  if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Yükleniyor...</div>;

  return (
    <div style={{ padding: '50px 20px', backgroundColor: '#fafafa', minHeight: 'calc(100vh - 81px)', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontWeight: '300', marginBottom: '30px', color: '#111', fontSize: '2rem', letterSpacing: '-0.5px' }}>Yönetim Paneli</h2>
        
        <div style={{ background: '#fff', padding: '30px', borderRadius: '2px', border: '1px solid #eaeaea', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
          {!Array.isArray(products) || products.length === 0 ? (
            <p>Vitrinde hiç eser yok.</p>
          ) : (
            products.map(product => (
              <div key={product.id || product._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #f9f9f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <img src={product.imageUrl} alt="urun" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '2px', background: '#f2f2f2' }} />
                  <div>
                    <span style={{ fontWeight: '400', fontSize: '15px', color: '#111', display: 'block' }}>{product.title}</span>
                    <span style={{ fontSize: '12px', color: '#888' }}>{product.category}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(product.id || product._id)}
                  style={{ background: 'transparent', color: '#d9534f', border: '1px solid #d9534f', padding: '8px 20px', borderRadius: '2px', cursor: 'pointer', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', transition: 'all 0.3s' }}
                  onMouseOver={(e) => { e.target.style.background = '#d9534f'; e.target.style.color = '#fff'; }}
                  onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#d9534f'; }}
                >
                  SİL
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;