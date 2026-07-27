const pool = require('../config/db');

// Kullanıcı Bilgilerini Güncelleme
const updateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body; 

        const updatedUser = await pool.query(
            'UPDATE users SET email = $1 WHERE id = $2 RETURNING id, email, created_at',
            [email, id]
        );

        if (updatedUser.rows.length === 0) {
            return res.status(404).json({ mesaj: "Kullanici bulunamadi!" });
        }

        res.status(200).json({ mesaj: "Profil basariyla guncellendi!", kullanici: updatedUser.rows[0] });
    } catch (error) {
        console.error("Profil guncelleme hatasi:", error.message);
        res.status(500).json({ mesaj: "Sunucu hatasi!" });
    }
};

module.exports = { updateUserProfile };