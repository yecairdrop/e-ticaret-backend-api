const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// 1. Kullanıcı Bilgilerini Getirme (Şifre hariç)
const getUserProfile = async (req, res) => {
    try {
        // Token'dan gelen kullanıcı ID'sini alıyoruz (Başkası erişemez)
        const userId = req.user.id; 
        
        const user = await pool.query(
            'SELECT id, name, email, role, created_at FROM users WHERE id = $1',
            [userId]
        );

        if (user.rows.length === 0) {
            return res.status(404).json({ mesaj: "Kullanıcı bulunamadı!" });
        }

        res.status(200).json(user.rows[0]);
    } catch (error) {
        console.error("Profil getirme hatası:", error.message);
        res.status(500).json({ mesaj: "Sunucu hatası!" });
    }
};

// 2. Kullanıcı Bilgilerini Güncelleme (Ad ve Email)
const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { name, email } = req.body; 

        const updatedUser = await pool.query(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email, role',
            [name, email, userId]
        );

        if (updatedUser.rows.length === 0) {
            return res.status(404).json({ mesaj: "Kullanıcı bulunamadı!" });
        }

        res.status(200).json({ mesaj: "Profil başarıyla güncellendi!", kullanici: updatedUser.rows[0] });
    } catch (error) {
        console.error("Profil güncelleme hatası:", error.message);
        res.status(500).json({ mesaj: "Sunucu hatası!" });
    }
};

// 3. Güvenli Şifre Değiştirme (bcrypt ile)
const updateUserPassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { oldPassword, newPassword } = req.body;

        // Kullanıcıyı veri tabanından mevcut şifresiyle birlikte çek
        const user = await pool.query('SELECT password FROM users WHERE id = $1', [userId]);

        if (user.rows.length === 0) {
            return res.status(404).json({ mesaj: "Kullanıcı bulunamadı!" });
        }

        // Eski şifreyi doğrula
        const validPassword = await bcrypt.compare(oldPassword, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ mesaj: "Mevcut şifreniz hatalı!" });
        }

        // Yeni şifreyi şifrele (hash)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Yeni şifreyi veri tabanına kaydet
        await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId]);

        res.status(200).json({ mesaj: "Şifreniz başarıyla güncellendi!" });
    } catch (error) {
        console.error("Şifre güncelleme hatası:", error.message);
        res.status(500).json({ mesaj: "Sunucu hatası!" });
    }
};

module.exports = { getUserProfile, updateUserProfile, updateUserPassword };