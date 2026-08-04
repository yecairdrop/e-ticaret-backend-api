const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

// Cloudinary şifrelerini .env dosyasından çekip sisteme tanıtıyoruz
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Yüklenen fotoğrafların kurallarını belirliyoruz
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'e-ticaret-urunler', // Cloudinary'de otomatik açılacak klasörün adı
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'], // Sadece resim dosyalarına izin ver
    },
});

// İşlemi yapacak olan 'upload' motorunu dışarı aktarıyoruz
const upload = multer({ storage: storage });

module.exports = upload;