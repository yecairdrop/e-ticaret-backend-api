const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ mesaj: "Bu email ile zaten kayit olunmus!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, role',
            [name, email, hashedPassword]
        );

        res.status(201).json({
            mesaj: "Kullanici basariyla olusturuldu!",
            kullanici: newUser.rows[0]
        });

    } catch (error) {
        console.error("Kayit hatasi:", error.message);
        res.status(500).json({ mesaj: "Sunucu hatasi!" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ mesaj: "Boyle bir kullanici bulunamadi!" });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ mesaj: "Hatali sifre!" });
        }

        const token = jwt.sign(
            { id: user.rows[0].id, role: user.rows[0].role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' } 
        );

        res.status(200).json({
            mesaj: "Giris basarili!",
            token: token,
            kullanici: {
                id: user.rows[0].id,
                name: user.rows[0].name,
                email: user.rows[0].email,
                role: user.rows[0].role
            }
        });

    } catch (error) {
        console.error("Giris hatasi:", error.message);
        res.status(500).json({ mesaj: "Sunucu hatasi!" });
    }
};

module.exports = { register, login };