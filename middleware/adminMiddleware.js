const pool = require('../config/db'); // Veritabanı bağlantımızı içeri aldık

const verifyAdmin = async (req, res, next) => {
    try {
        // req.user, kullanıcının giriş yaptığını doğrulayan (auth) dosyadan geliyor.
        // Biz burada o kullanıcının ID'sini alıp veritabanından rolüne bakacağız.
        const userId = req.user.id; 

        // Veritabanından bu kullanıcının rolünü getir
        const result = await pool.query('SELECT role FROM users WHERE id = $1', [userId]);

        // Eğer kullanıcı veritabanında yoksa hata ver
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Kullanıcı bulunamadı." });
        }

        const userRole = result.rows[0].role;

        // Rolü 'admin' DEĞİLSE hata fırlat ve işlemi durdur
        if (userRole !== 'admin') {
            return res.status(403).json({ error: "Erişim engellendi. Bu işlemi sadece yöneticiler (admin) yapabilir!" });
        }

        // Eğer adminse, sorun yok, bir sonraki işleme (ürün eklemeye vs.) geçebilirsin diyoruz.
        next();

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Sunucu hatası, admin kontrolü yapılamadı." });
    }
};

module.exports = verifyAdmin;