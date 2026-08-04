const Products = () => {
  const sampleProducts = [
    { id: 1, name: 'Minimalist Deri Çanta', price: '3.250 TL', category: 'Aksesuar' },
    { id: 2, name: 'Saf İpek Şal', price: '1.890 TL', category: 'Giyim' },
    { id: 3, name: 'Seramik Kahve Seti', price: '950 TL', category: 'Ev & Yaşam' },
    { id: 4, name: 'Titanyum Çerçeve Gözlük', price: '4.100 TL', category: 'Aksesuar' }
  ];

  return (
    <div style={{ padding: '60px 80px', backgroundColor: '#fafafa', minHeight: 'calc(100vh - 81px)', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      <style>{`
        .product-card { background: #fff; border: 1px solid #f2f2f2; transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); border-radius: 4px; overflow: hidden; }
        .product-card:hover { transform: translateY(-10px); box-shadow: 0 25px 50px rgba(0,0,0,0.04); border-color: #ebebeb; }
        .add-btn { background: transparent; color: #111; border: 1px solid #111; padding: 12px 25px; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; transition: all 0.4s; border-radius: 2px; }
        .add-btn:hover { background: #111; color: #fff; }
        .img-placeholder { background-color: #f9f9f9; height: 320px; transition: transform 0.8s ease; display:flex; align-items:center; justify-content:center; color:#ccc; font-weight:300; letter-spacing: 2px;}
        .product-card:hover .img-placeholder { transform: scale(1.04); }
        .img-wrapper { overflow: hidden; }
      `}</style>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' }}>
        <h2 style={{ color: '#111', fontWeight: '300', fontSize: '2.2rem', margin: 0, letterSpacing: '-0.5px' }}>Yeni Gelenler</h2>
        <span style={{ fontSize: '12px', color: '#888', letterSpacing: '1px', textTransform: 'uppercase' }}>4 Ürün Gösteriliyor</span>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '40px' }}>
        {sampleProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="img-wrapper">
                <div className="img-placeholder">GÖRSEL EKLENECEK</div>
            </div>
            <div style={{ padding: '30px' }}>
                <p style={{ margin: '0 0 10px 0', fontSize: '11px', color: '#999', textTransform: 'uppercase', letterSpacing: '2px' }}>{product.category}</p>
                <h3 style={{ margin: '0 0 25px 0', fontSize: '17px', color: '#222', fontWeight: '400' }}>{product.name}</h3>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '16px', fontWeight: '300', color: '#000' }}>{product.price}</span>
                    <button className="add-btn">İncele</button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;