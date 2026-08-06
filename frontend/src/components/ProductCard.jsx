

const ProductCard = ({ title, category, price, imageUrl }) => {
  return (
    <div className="group cursor-pointer flex flex-col gap-4">
      {/* Resim Alanı: Galeri konsepti, üzerine gelince hafifçe büyür ve netleşir */}
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 rounded-sm">
        <img 
          src={imageUrl || "https://images.unsplash.com/photo-1618220179428-22790b46a0eb?q=80&w=800&auto=format&fit=crop"} 
          alt={title}
          className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Üzerine gelince beliren ince siyah çerçeve efekti */}
        <div className="absolute inset-0 border border-black/0 transition-colors duration-500 group-hover:border-black/10"></div>
      </div>

      {/* Yazı ve Fiyat Alanı: Minimalist, temiz, küçük puntolar */}
      <div className="flex flex-col items-center text-center gap-1">
        <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium">
          {category || "Koleksiyon"}
        </span>
        <h3 className="text-sm font-medium text-neutral-900 tracking-wide mt-1">
          {title || "Lustro Özel Eser"}
        </h3>
        <p className="text-sm text-neutral-600 mt-2">
          {price ? `${price} ₺` : "Fiyat Belirlenmedi"}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;