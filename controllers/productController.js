const pool = require('../config/db');

// 1. Ürün Ekleme (Create)
const createProduct = async (req, res) => {
    try {
        const { title, description, price, stock, image_url, category } = req.body;
        const newProduct = await pool.query(
            'INSERT INTO products (title, description, price, stock, image_url, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, description, price, stock, image_url, category]
        );
        res.status(201).json({ mesaj: "Urun basariyla eklendi!", urun: newProduct.rows[0] });
    } catch (error) {
        res.status(500).json({ mesaj: "Sunucu hatasi!" });
    }
};

// 2. Ürünleri Listeleme (Read)
const getProducts = async (req, res) => {
    try {
        const allProducts = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
        res.status(200).json({ mesaj: "Urunler getirildi!", urunler: allProducts.rows });
    } catch (error) {
        res.status(500).json({ mesaj: "Sunucu hatasi!" });
    }
};

// 3. Ürün Güncelleme (Update)
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params; // Güncellenecek ürünün ID'sini URL'den alıyoruz
        const { title, description, price, stock, image_url, category } = req.body;
        
        const updatedProduct = await pool.query(
            'UPDATE products SET title = $1, description = $2, price = $3, stock = $4, image_url = $5, category = $6 WHERE id = $7 RETURNING *',
            [title, description, price, stock, image_url, category, id]
        );

        if (updatedProduct.rows.length === 0) return res.status(404).json({ mesaj: "Urun bulunamadi!" });
        res.status(200).json({ mesaj: "Urun basariyla guncellendi!", urun: updatedProduct.rows[0] });
    } catch (error) {
        res.status(500).json({ mesaj: "Sunucu hatasi!" });
    }
};

// 4. Ürün Silme (Delete)
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
        
        if (deletedProduct.rows.length === 0) return res.status(404).json({ mesaj: "Urun bulunamadi!" });
        res.status(200).json({ mesaj: "Urun basariyla silindi!" });
    } catch (error) {
        res.status(500).json({ mesaj: "Sunucu hatasi!" });
    }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };