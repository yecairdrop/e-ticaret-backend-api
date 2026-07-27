const pool = require('../config/db');

// Sipariş Oluşturma
const createOrder = async (req, res) => {
    try {
        const { user_id } = req.body;

        const cart = await pool.query(
            `SELECT c.product_id, c.quantity, p.price 
             FROM cart_items c 
             JOIN products p ON c.product_id = p.id 
             WHERE c.user_id = $1`,
            [user_id]
        );

        if (cart.rows.length === 0) {
            return res.status(400).json({ mesaj: "Sepetiniz bos, siparis verilemez!" });
        }

        let total_price = 0;
        cart.rows.forEach(item => {
            total_price += item.quantity * item.price;
        });

        const newOrder = await pool.query(
            'INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING *',
            [user_id, total_price]
        );
        const orderId = newOrder.rows[0].id;

        for (let item of cart.rows) {
            await pool.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
                [orderId, item.product_id, item.quantity, item.price]
            );
        }

        await pool.query('DELETE FROM cart_items WHERE user_id = $1', [user_id]);

        res.status(201).json({ mesaj: "Siparis basariyla olusturuldu!", siparis: newOrder.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mesaj: "Sunucu hatasi!" });
    }
};

// Kullanıcının Sipariş Geçmişini Getirme (YENİ EKLENDİ)
const getUserOrders = async (req, res) => {
    try {
        const { user_id } = req.params;
        const orders = await pool.query(
            'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
            [user_id]
        );
        
        if (orders.rows.length === 0) {
            return res.status(404).json({ mesaj: "Henuz bir siparisiniz bulunmamaktadir." });
        }
        
        res.status(200).json({ mesaj: "Siparis gecmisi getirildi!", siparisler: orders.rows });
    } catch (error) {
        console.error("Siparis gecmisi hatasi:", error.message);
        res.status(500).json({ mesaj: "Sunucu hatasi!" });
    }
};

module.exports = { createOrder, getUserOrders };