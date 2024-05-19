import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { useAuth } from "../context/AuthContext";

interface ModalProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  title: string;
  onSubmit: (formData: Omit<Product, 'id'>) => void;
  initialData?: Product | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, setOpen, title, onSubmit, initialData }) => {
  const { user } = useAuth();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description || '');
      setImage(initialData.image || '');
      setPrice(initialData.price);
      setQuantity(initialData.quantity);
    } else {
      setName('');
      setDescription('');
      setImage('');
      setPrice(0);
      setQuantity(0);
    }
  },[initialData]);

  const handleSave = async (ev: React.FormEvent) => {
    ev.preventDefault();

    if (user) {
      const formData = {
        name,
        description,
        image,
        price,
        quantity,
        userId: user.id
      }
  
      onSubmit(formData);
      setOpen(false);
    }
  }

  return isOpen ? (
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-neutral-950/70 p-5">
      <div className="fixed top-1/2 left-1/2 bg-slate-50 w-2/3 lg:w-[500px] p-5 -translate-x-1/2 -translate-y-1/2 rounded-md">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-neutral-700">{title}</h2>
          <span 
            onClick={() => setOpen(!isOpen)}
            className="text-neutral-500 text-4xl font-bold hover:text-neutral-700 select-none cursor-pointer"
          >&times;
          </span>
        </div>

        <form onSubmit={handleSave}>
          <div className="flex flex-col my-5 gap-2">
            <div className="flex flex-col">
              <label htmlFor="name" 
                className="font-outfit text-sm text-neutral-600 mb-1"
              >Nome:
              </label>
              <input id="name"
                type="text"
                name="name"
                className="p-3 border rounded-md outline-neutral-600 bg-neutral-50"
                minLength={3}
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description"
                className="font-outfit text-sm text-neutral-600 mb-1"
              >Descrição:
              </label>
              <input id="description"
                type="text"
                name="description"
                className="p-3 border rounded-md outline-neutral-600 bg-neutral-50"
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="image"
                className="font-outfit text-sm text-neutral-600 mb-1"
              >Imagem URL:
              </label>
              <input id="image"
                type="url"
                name="image"
                className="p-3 border rounded-md outline-neutral-600 bg-neutral-50"
                value={image}
                onChange={(ev) => setImage(ev.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="price"
                className="font-outfit text-sm text-neutral-600 mb-1"
              >Preço:
              </label>
              <input id="price"
                type="number"
                name="price"
                className="p-3 border rounded-md outline-neutral-600 bg-neutral-50"
                value={price}
                onChange={(ev) => setPrice(parseFloat(ev.target.value))}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="quantity"
                className="font-outfit text-sm text-neutral-600 mb-1"
              >Quantidade:
              </label>
              <input id="quantity"
                type="number"
                name="quantity"
                className="p-3 border rounded-md outline-neutral-600 bg-neutral-50"
                value={quantity}
                onChange={(ev) => setQuantity(parseInt(ev.target.value))}
                required
              />
            </div>
          </div>

          <button type="submit"
            className="py-2 px-4 w-[40%] button gradient-color mb-5"
          >Salvar
          </button>
        </form>
      </div>
    </div>
  ) : null;
}

export default Modal;