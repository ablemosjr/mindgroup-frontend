import { useEffect, useState } from 'react';
import LinkButton from '../components/LinkButton';
import CardProduct from '../components/CardProduct';
import { Product } from '../types/Product';

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    }

    getProducts();
  }, []);

  return (
    <main className="p-5 max-w-[1000px] mx-auto">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-600">Meus produtos</h1>
        <LinkButton title="Histórico" onClick={() => {}} />
      </header>

      <section className=" mt-10">
        <button type="button"
          className="py-2 px-4 button gradient-color mb-5"
        >Adicionar produto
        </button>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {products.length > 0 ? (
            products.map(prod => (
              <CardProduct key={prod.id} product={prod} />
            ))
          ) : (
            <h1 className="text-xl text-neutral-800 font-medium mt-10">Não foi encontrado nenhum produto.</h1>
          )}
        </div>
      </section>
    </main>
  )
}

export default Dashboard;