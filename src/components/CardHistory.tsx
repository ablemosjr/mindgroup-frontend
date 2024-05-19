import imageDefault from '../assets/imageDefault.png';
import { ProductLog } from '../types/ProductLog';

interface CardHistoryProps {
  log: ProductLog;
}

const CardHistory: React.FC<CardHistoryProps> = ({ log }) => {
  const imageSrc = log.product.image || imageDefault;
  const typeColor = log.type.toLowerCase() === 'saída' ? 'text-red-600' : 'text-green-600';
  const typeIO = log.type.toLowerCase() === 'saída' ? 'Saiu:' : 'Entrou:';

  return (
    <div className="border p-5 sm:w-full sm:flex sm:h-[200px] rounded-lg bg-neutral-50">
      <img className="rounded-sm w-full sm:w-[150px] sm:h-full object-cover" src={imageSrc} alt={`Imagem de ${log.product.name}`} />

      <div className="flex flex-col gap-4 pt-4 sm:pt-0 sm:pl-4 sm:justify-between w-full">
        <span className={`text-xl font-extrabold uppercase ${typeColor}`}>{log.type}</span>
        <p className="font-medium text-neutral-700">{log.product.name}</p>

        <div className="flex items-end justify-between sm:gap-10">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col text-neutral-500 font-light">
              <span className="text-nowrap">id: {log.id}</span>
              <span>{new Date(log.createdAt).toLocaleDateString()}</span>
              <p>{log.user.name}</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p className="font-medium text-neutral-700">{typeIO}</p>
            <span className="font-bold text-xl">{log.quantity}</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CardHistory;