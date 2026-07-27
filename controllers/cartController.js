const pool = require('../config/db');

const addToCart = async (req, res) => {
    try {
        const { user_id, product_id, quantity } = req.body;
        const newItem = await pool.query(
            'INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
            [user_id, product_id, quantity || 1]
        );
        res.status(201).json({ mesaj: "Urun sepete eklendi!", item: newItem.rows[0] });
    } catch (error) {
        res.status(500).json({ mesaj: "Sunucu hatasi!" });
    }
};

const getCart = async (req, res) => {
    try {
        const { user_id } = req.params;
        const cartItems = await pool.query(
            `SELECT c.id, p.title, p.price, c.quantity 
             FROM cart_items c 
             JOIN products p ON c.product_id = p.id 
             WHERE c.user_id = $1`,
            [user_id]
        );
        res.status(200).json({ mesaj: "Sepet getirildi!", sepet: cartItems.rows });
    } catch (error) {
        res.status(500).json({ mesaj: "Sunucu hatasi!" });
    }
};

const updateCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const updatedItem = await pool.query(
            'UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *',
            [quantity, id]
        );
        if (updatedItem.rows.length === 0) return res.status(404).json({ mesaj: "Sepette urun bulunamadi!" });
        res.status(200).json({ mesaj: "Sepet guncellendi!", item: updatedItem.rows[0] });
    } catch (error) {
        res.status(500).json({ mesaj: "Sunucu hatasi!" });
    }
};

const removeCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await pool.query('DELETE FROM cart_items WHERE id = $1 RETURNING *', [id]);
        if (deletedItem.rows.length === 0) return res.status(404).json({ mesaj: "Sepette urun bulunamadi!" });
        res.status(200).json({ mesaj: "Urun sepetten cikarildi!" });
    } catch (error) {
        res.status(500).json({ mesaj: "Sunucu hatasi!" });
    }
};

module.exports = { addToCart, getCart, updateCartItem, removeCartItem };