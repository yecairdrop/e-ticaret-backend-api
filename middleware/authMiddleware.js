const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // 1. İstek yaparken gönderilen token'ı alıyoruz
    const token = req.header('Authorization');

    // 2. Eğer token yoksa adam giriş yapmamıştır, kapıdan çeviriyoruz
    if (!token) {
        return res.status(401).json({ error: "Erişim reddedildi. Lütfen giriş yapın." });
    }

    try {
        // 3. Postman/Thunder Client'tan "Bearer TOKEN" şeklinde geliyorsa sadece token'ı ayırıyoruz
        const tokenSplit = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;
        
        // 4. Token'ı çözüyoruz (senin .env dosyasındaki şifreyle)
        const verified = jwt.verify(tokenSplit, process.env.JWT_SECRET);
        
        // 5. İçindeki kullanıcı bilgilerini alıp req.user içine koyuyoruz ki admin kontrolü bunu kullanabilsin
        req.user = verified; 
        
        next();
    } catch (error) {
        res.status(400).json({ error: "Geçersiz token." });
    }
};

module.exports = verifyToken;