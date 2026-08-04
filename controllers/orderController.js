const pool = require('../config/db');

// 1. Sipariş Oluşturma ve Stok Düşme İşlemi
const createOrder = async (req, res) => {
    try {
        const { user_id } = req.body;

        // Adım 1: Kullanıcının sepetini ve ürün fiyatlarını getir
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

        // Adım 2: Toplam fiyatı hesapla
        let total_price = 0;
        cart.rows.forEach(item => {
            total_price += item.quantity * item.price;
        });

        // Adım 3: Siparişi 'orders' tablosuna ana kayıt olarak ekle
        const newOrder = await pool.query(
            'INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING *',
            [user_id, total_price]
        );
        const orderId = newOrder.rows[0].id;

        // Adım 4: Sepetteki her ürün için sipariş detayı oluştur ve STOK DÜŞ
        for (let item of cart.rows) {
            // Sipariş satırını ekle
            await pool.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
                [orderId, item.product_id, item.quantity, item.price]
            );

            // Satılan miktar kadar stoktan düş (YENİ EKLENEN KRİTİK KISIM)
            await pool.query(
                'UPDATE products SET stock = stock - $1 WHERE id = $2',
                [item.quantity, item.product_id]
            );
        }

        // Adım 5: İşlem bitti, sepeti boşalt
        await pool.query('DELETE FROM cart_items WHERE user_id = $1', [user_id]);

        res.status(201).json({ mesaj: "Siparis basariyla olusturuldu!", siparis: newOrder.rows[0] });
    } catch (error) {
        console.error("Siparis olusturma hatasi:", error);
        res.status(500).json({ mesaj: "Sunucu hatasi!" });
    }
};

// 2. Kullanıcının Sipariş Geçmişini Getirme
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

// ... (Burada daha önce yazdığımız createOrder ve getUserOrders fonksiyonları duruyor) ...

// 3. BÜTÜN Siparişleri Getirme (SADECE ADMİN) - 11. GÜN GÖREVİ
const getAllOrders = async (req, res) => {
    try {
        const orders = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
        res.status(200).json({ mesaj: "Tüm siparişler getirildi!", siparisler: orders.rows });
    } catch (error) {
        console.error("Tüm siparişleri getirme hatası:", error.message);
        res.status(500).json({ mesaj: "Sunucu hatası!" });
    }
};

// 4. Sipariş Durumunu Güncelleme (SADECE ADMİN) - 11. GÜN GÖREVİ
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params; // Güncellenecek siparişin id'si
        const { status } = req.body; // Yeni durum (örn: 'Kargoya Verildi')

        const updatedOrder = await pool.query(
            'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );

        if (updatedOrder.rows.length === 0) {
            return res.status(404).json({ mesaj: "Sipariş bulunamadı!" });
        }

        res.status(200).json({ mesaj: "Sipariş durumu güncellendi!", siparis: updatedOrder.rows[0] });
    } catch (error) {
        console.error("Sipariş durumu güncelleme hatası:", error.message);
        res.status(500).json({ mesaj: "Sunucu hatası!" });
    }
};

// Modülleri dışarı aktarırken yeni eklediklerimizi de eklemeyi UNUTMA!
module.exports = { createOrder, getUserOrders, getAllOrders, updateOrderStatus };