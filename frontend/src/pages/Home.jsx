import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button'; // Lüks butonumuzu sahaya çağırıyoruz

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[calc(100vh-81px)] flex flex-col justify-center items-center bg-[#fafafa] font-sans text-center px-5">
      
      <h1 className="text-4xl md:text-5xl font-light text-zinc-900 tracking-tight mb-6">
        Zamansız Zarafet,<br/>Evinizin Başköşesinde.
      </h1>
      
      <p className="text-lg text-zinc-500 font-light tracking-wide max-w-2xl mb-10 leading-relaxed">
        Lustro özel koleksiyonu ile yaşam alanlarınıza değer katacak, özenle seçilmiş lüks ev dekorasyon ürünlerini keşfedin.
      </p>

      {/* Shadcn'in premium butonu */}
      <Button 
        onClick={() => navigate('/products')}
        variant="default"
        className="bg-zinc-900 text-white hover:bg-zinc-800 px-10 py-6 text-xs tracking-[0.2em] uppercase rounded-sm transition-all duration-300"
      >
        Koleksiyonu Keşfet
      </Button>
      
    </div>
  );
};

export default Home;