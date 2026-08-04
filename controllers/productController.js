const pool = require('../config/db');

// 1. Ürün Oluşturma (Cloudinary/Resim URL Destekli)
const createProduct = async (req, res) => {
    try {
        const { title, description, price, stock, category, image_url } = req.body;
        
        // Eğer resim dosyası middleware'den (Cloudinary) geliyorsa req.file.path olarak al
        const finalImageUrl = req.file ? req.file.path : image_url;

        const newProduct = await pool.query(
            'INSERT INTO products (title, description, price, stock, category, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, description, price, stock, category, finalImageUrl]
        );
        res.status(201).json({ mesaj: "Ürün başarıyla eklendi!", urun: newProduct.rows[0] });
    } catch (error) {
        console.error("Ürün ekleme hatası:", error.message);
        res.status(500).json({ mesaj: "Sunucu hatası!" });
    }
};

// 2. Tam Kapsamlı Ürün Listeleme (Arama, Sayfalama, Kategori, Fiyat, Sıralama)
const getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const category = req.query.category || '';
        const minPrice = parseFloat(req.query.minPrice) || 0;
        const maxPrice = parseFloat(req.query.maxPrice) || 999999;
        const sort = req.query.sort || 'newest';

        const offset = (page - 1) * limit;
        const searchQuery = `%${search}%`;

        let queryStr = `SELECT * FROM products WHERE (title ILIKE $1 OR description ILIKE $1) AND price >= $2 AND price <= $3`;
        let queryParams = [searchQuery, minPrice, maxPrice];
        let paramIndex = 4;

        if (category) {
            queryStr += ` AND category = $${paramIndex}`;
            queryParams.push(category);
            paramIndex++;
        }

        if (sort === 'price_asc') {
            queryStr += ` ORDER BY price ASC`;
        } else if (sort === 'price_desc') {
            queryStr += ` ORDER BY price DESC`;
        } else {
            queryStr += ` ORDER BY created_at DESC`;
        }

        queryStr += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
        queryParams.push(limit, offset);

        const products = await pool.query(queryStr, queryParams);

        let countQueryStr = `SELECT COUNT(*) FROM products WHERE (title ILIKE $1 OR description ILIKE $1) AND price >= $2 AND price <= $3`;
        let countParams = [searchQuery, minPrice, maxPrice];
        let countParamIndex = 4;
        
        if (category) {
            countQueryStr += ` AND category = $${countParamIndex}`;
            countParams.push(category);
        }

        const totalProductsQuery = await pool.query(countQueryStr, countParams);
        const totalProducts = parseInt(totalProductsQuery.rows[0].count); 
        const totalPages = Math.ceil(totalProducts / limit);

        res.status(200).json({ 
            mesaj: "Ürünler başarıyla getirildi!", 
            sayfalama: {
                toplamUrun: totalProducts,
                toplamSayfa: totalPages,
                suAnkiSayfa: page
            },
            urunler: products.rows 
        });
    } catch (error) {
        console.error("Ürün getirme hatası:", error.message);
        res.status(500).json({ mesaj: "Sunucu hatası!" });
    }
};

// 3. Ürün Güncelleme
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price, stock, category } = req.body;
        const updated = await pool.query(
            'UPDATE products SET title=$1, description=$2, price=$3, stock=$4, category=$5 WHERE id=$6 RETURNING *',
            [title, description, price, stock, category, id]
        );
        if (updated.rows.length === 0) return res.status(404).json({ mesaj: "Ürün bulunamadı!" });
        res.status(200).json({ mesaj: "Ürün güncellendi!", urun: updated.rows[0] });
    } catch (error) {
        console.error("Ürün güncelleme hatası:", error.message);
        res.status(500).json({ mesaj: "Sunucu hatası!" });
    }
};

// 4. Ürün Silme
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await pool.query('DELETE FROM products WHERE id=$1 RETURNING *', [id]);
        if (deleted.rows.length === 0) return res.status(404).json({ mesaj: "Ürün bulunamadı!" });
        res.status(200).json({ mesaj: "Ürün silindi!" });
    } catch (error) {
        console.error("Ürün silme hatası:", error.message);
        res.status(500).json({ mesaj: "Sunucu hatası!" });
    }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };