import imageDefault from '../assets/imageDefault.png';
import { Product } from '../types/Product';
import LinkButton from './LinkButton';

interface CardProductProps {
  product: Product;
  onDelete: (id: number) => void;
  onEdit: (product: Product) => void;
}

const CardProduct: React.FC<CardProductProps> = ({ product, onDelete, onEdit }) => {
  const imageSrc = typeof product.image === 'string' && product.image ? product.image : imageDefault;

  return (
    <div className="flex flex-col p-5 bg-neutral-50 border outline-neutral-600 rounded-lg min-[475px]:flex-row min-[475px]:h-[150px]">
      <img className="rounded-sm min-[475px]:h-full" src={imageSrc} alt={`Imagem de ${product.name}`} />
      <div className="flex flex-col justify-between min-[475px]:ml-4 w-full">
        <div className="text-neutral-700 my-4 min-[475px]:my-0">
          <h2 className="uppercase font-medium ">{product.name}</h2>
          <p className="font-light">{product.description}</p>
          <div className="my-1">
            <span className="text-neutral-700 font-medium">R$ {product.price}</span>
            <span className="ml-4">Quantidade: {product.quantity}</span>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <span className="font-light text-neutral-500">id: {product.id}</span>

          <div>
            <LinkButton title="Editar" onClick={() => onEdit(product)} />
            <LinkButton title="Excluir" onClick={() => onDelete(product.id)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardProduct;