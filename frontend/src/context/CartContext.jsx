/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from 'react';

// ... kodun geri kalanı tamamen aynı kalacak


// Sepetimiz için bir Context (Merkezi Depo) oluşturuyoruz
const CartContext = createContext();

// Diğer sayfalarda sepeti kolayca çağırmak için özel bir hook yazıyoruz
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Sepet state'i: Sayfa yenilendiğinde sepet sıfırlanmasın diye localStorage'dan okuyoruz
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('lustro_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sepette her değişiklik olduğunda (ürün ekleme/çıkarma) localStorage'ı güncelliyoruz
  useEffect(() => {
    localStorage.setItem('lustro_cart', JSON.stringify(cart));
  }, [cart]);

  // Sepete Ürün Ekleme
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Ürün zaten sepette var mı kontrol et
      const existingProduct = prevCart.find(
        (item) => item._id === product._id || item.id === product.id
      );

      if (existingProduct) {
        // Varsa sadece miktarını 1 artır
        return prevCart.map((item) =>
          (item._id === product._id || item.id === product.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Yoksa ürünü sepete ekle ve miktarını 1 yap
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Sepetten Ürün Çıkarma
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId && item.id !== productId));
  };

  // Ürün Miktarını Güncelleme (+ / - butonları için)
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return; // Miktar 1'in altına düşemez
    setCart((prevCart) =>
      prevCart.map((item) =>
        (item._id === productId || item.id === productId)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Sepeti Komple Temizleme (Ödeme sonrası için)
  const clearCart = () => setCart([]);

  // Ara Toplam Hesaplama (Fiyat * Miktar)
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider 
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};