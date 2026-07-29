const pool = require('../config/db');

// 1. Ürün Ekleme (Create) - GÜNCELLENDİ
const createProduct = async (req, res) => {
    try {
        const { title, description, price, stock, category } = req.body;
        
        // Cloudinary resmi yükledi ve linki bize 'req.file.path' içinde gönderdi. Onu alıyoruz.
        const image_url = req.file ? req.file.path : null;

        const newProduct = await pool.query(
            'INSERT INTO products (title, description, price, stock, image_url, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, description, price, stock, image_url, category]
        );
        res.status(201).json({ mesaj: "Urun basariyla eklendi!", urun: newProduct.rows[0] });
    } catch (error) {
        console.error(error); // Eğer bir hata çıkarsa terminalde sebebini detaylıca görelim
        res.status(500).json({ mesaj: "Sunucu hatasi!" });
    }
};

// ... (Alt taraftaki getProducts, updateProduct ve deleteProduct kodlarına dokunma, onlar aynı kalsın) ...

// 2. Ürünleri Listeleme (Read)
// 2. Ürünleri Getirme (Filtreleme Özellikli)
const getProducts = async (req, res) => {
    try {
        // URL'nin sonuna eklenen '?category=Spor Giyim' gibi bir filtre var mı diye bakıyoruz
        const { category } = req.query; 
        
        let allProducts;

        if (category) {
            // Eğer kategori belirtilmişse, SADECE o kategoriye ait olanları getir
            allProducts = await pool.query('SELECT * FROM products WHERE category = $1', [category]);
        } else {
            // Kategori belirtilmemişse, depodaki BÜTÜN ürünleri getir
            allProducts = await pool.query('SELECT * FROM products');
        }

        res.status(200).json(allProducts.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mesaj: "Sunucu hatasi, urunler getirilemedi!" });
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