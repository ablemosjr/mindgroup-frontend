import { useEffect, useState } from 'react';
import LinkButton from '../components/LinkButton';
import CardProduct from '../components/CardProduct';
import Modal from '../components/Modal';
import { Product } from '../types/Product';

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/products');
      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  }

  const handleSubmit = async (formData: Omit<Product, 'id'>) => {
    const existProduct = products.find(prod => prod.name === formData.name);

    if (existProduct) {
      const newQuantity = existProduct.quantity + formData.quantity;
      await updateProduct(existProduct.id, newQuantity);
    } else {
      await addProduct(formData);
    }

    getProducts();
  }

  const handleDelete = async (id: number) => {
    await deleteProduct(id);

    getProducts();
  }

  const updateProduct = async (id: number, newQuantity: number) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity })
      });

      if (!response.ok) {
        console.log('Erro ao atualizar quantidade do produto.')
      }

    } catch (error) {
      console.error('Erro ao atualizar quantidade do produto:', error);
    }
  }

  const addProduct = async (newProduct: Omit<Product, 'id'>) => {
    try {
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      
      if (!response.ok) {
        console.error('Erro ao adicionar produto');
      }
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  }

  const deleteProduct = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        console.error('Erro ao excluir produto.');
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  }

  return (
    <main className="p-5 max-w-[1000px] mx-auto">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-600">Meus produtos</h1>
        <LinkButton title={"Histórico"} />
      </header>

      <section className=" mt-10">
        <button type="button"
          className="py-2 px-4 button gradient-color mb-5"
          onClick={() => setOpenModal(!openModal)}
        >Adicionar produto
        </button>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {products.length > 0 ? (
            products.map(prod => (
              <CardProduct key={prod.id} product={prod} onDelete={handleDelete} />
            ))
          ) : (
            <h1 className="text-xl text-neutral-800 font-medium mt-10">Não foi encontrado nenhum produto.</h1>
          )}
        </div>
      </section>

      <Modal
        title={'Adicionar Produto'} 
        isOpen={openModal} setOpen={setOpenModal}
        onCreate={handleSubmit} 
      />
    </main>
  )
}

export default Dashboard;