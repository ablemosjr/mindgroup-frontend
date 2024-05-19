import { useEffect, useState } from 'react';
import LinkButton from '../components/LinkButton';
import CardProduct from '../components/CardProduct';
import Modal from '../components/Modal';
import { Product } from '../types/Product';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { logout } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
    if (selectedProduct) {
      await updateProduct(selectedProduct.id, formData);
    } else {
      const existProduct = products.find(prod => prod.name === formData.name);

      if (existProduct) {
        const newQuantity = existProduct.quantity + formData.quantity;
        await existingProduct(existProduct.id, newQuantity);
      } else {
        await addProduct(formData);
      }
    }

    setSelectedProduct(null);
    setOpenModal(false);
    getProducts();
  }

  const handleDelete = async (id: number) => {
    await deleteProduct(id);

    getProducts();
  }

  const handleEdit = async (product: Product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  }

  const existingProduct = async (id: number, newQuantity: number) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity })
      });

      if (!response.ok) {
        console.log('Erro ao atualizar quantidade do produto.');
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

  const updateProduct = async (id: number, updatedProduct: Omit<Product, 'id'>) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct)
      });

      if (!response.ok) {
        console.log('Erro ao atualizar produto.');
      }

    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
    }
  }

  return (
    <main className="p-5 max-w-[1000px] mx-auto">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-600">Meus produtos</h1>

        <div className="flex gap-2">
          <LinkButton title={"Histórico"} />
          <LinkButton title={"Logout"} onClick={logout} />
        </div>
      </header>

      <section className=" mt-10">
        <button type="button"
          className="py-2 px-4 button gradient-color mb-5"
          onClick={() => {
            setOpenModal(!openModal);
            setSelectedProduct(null);
          }}
        >Adicionar produto
        </button>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {products.length > 0 ? (
            products.map(prod => (
              <CardProduct 
                key={prod.id} 
                product={prod} 
                onDelete={handleDelete} 
                onEdit={handleEdit}
              />
            ))
          ) : (
            <h1 className="text-xl text-neutral-800 font-medium mt-10">Não foi encontrado nenhum produto.</h1>
          )}
        </div>
      </section>

      <Modal
        title={selectedProduct ? 'Editar Produto' : 'Adicionar Produto'} 
        isOpen={openModal} setOpen={setOpenModal}
        onSubmit={handleSubmit} 
        initialData={selectedProduct}
      />
    </main>
  )
}

export default Dashboard;