const { Pool } = require('pg');
require('dotenv').config(); // Gizli .env kasamızı açıyoruz

// Veritabanı bağlantı havuzunu oluşturuyoruz
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Bulut (Neon) bağlantılarında güvenlik sertifikası sorunu yaşamamak için gerekli
    }
});

// Bağlantıyı test edelim
pool.connect()
    .then(() => console.log('✅ PostgreSQL Veritabanina basariyla baglanildi!'))
    .catch((err) => console.error('❌ Veritabani baglanti hatasi:', err.message));

// Diğer dosyalarda veritabanı işlemleri yapabilmek için dışa aktarıyoruz
module.exports = pool;