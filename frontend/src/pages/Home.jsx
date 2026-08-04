const Home = () => {
  return (
    <div style={{ 
        backgroundColor: '#fafafa', color: '#111', minHeight: 'calc(100vh - 81px)', 
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Inter', 'Segoe UI', sans-serif", padding: '40px 20px'
    }}>
      <div style={{ 
          maxWidth: '800px', textAlign: 'center', animation: 'fadeIn 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}>
          <style>{`
            @keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
            .btn-premium { background-color: #111; color: #fff; padding: 18px 50px; border: none; font-size: 12px; letter-spacing: 2px; textTransform: 'uppercase'; cursor: pointer; transition: all 0.4s ease; border-radius: 2px; }
            .btn-premium:hover { background-color: #444; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.08); }
          `}</style>
          
          <h1 style={{ fontSize: '4.5rem', fontWeight: '200', letterSpacing: '-1.5px', marginBottom: '20px', color: '#000' }}>
            Zarif. Sade. Kusursuz.
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#777', marginBottom: '50px', lineHeight: '1.8', fontWeight: '300', maxWidth: '550px', margin: '0 auto 50px auto' }}>
            Lustro ile e-ticarette yeni bir standart. İnce düşünülmüş detaylar, yormayan renkler ve eşsiz bir alışveriş deneyimi.
          </p>
          <button className="btn-premium">
            Koleksiyonu Keşfet
          </button>
      </div>
    </div>
  );
};

export default Home;