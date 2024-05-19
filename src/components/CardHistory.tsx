import imageDefault from '../assets/imageDefault.png';

const CardHistory: React.FC = () => {
  return (
    <div className="border p-5 sm:w-auto sm:flex sm:h-[200px] rounded-lg bg-neutral-50">
      <img className="rounded-sm w-full sm:w-auto sm:h-full object-cover" src={imageDefault} alt="Image" />

      <div className="flex flex-col gap-4 pt-4 sm:pt-0 sm:pl-4 sm:justify-between">
        <span className="text-xl font-extrabold text-red-600 uppercase">Saída</span>

        <div className="flex items-end justify-between sm:gap-10">
          <div className="flex flex-col gap-2">
            <p className="font-medium text-neutral-700">Produto X</p>

            <div className="flex flex-col text-neutral-500 font-light">
              <span className="text-nowrap">id: 0</span>
              <span>10/10/2024</span>
              <p>John Doe</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p className="uppercase font-medium text-neutral-700">Saldo</p>
            <span className="font-bold text-xl">40</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CardHistory;