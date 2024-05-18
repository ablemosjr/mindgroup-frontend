import imageDefault from '../assets/imageDefault.png';
import LinkButton from './LinkButton';

const CardProduct: React.FC = () => {
  return (
    <div className="flex flex-col p-5 bg-neutral-50 border outline-neutral-600 rounded-lg min-[475px]:flex-row min-[475px]:h-[150px]">
      <img className="rounded-sm min-[475px]:h-full" src={imageDefault} alt="Imagem não carregada" />
      <div className="flex flex-col justify-between min-[475px]:ml-4 w-full">
        <div className="text-neutral-700 my-4 min-[475px]:my-0">
          <h2 className="uppercase font-medium ">Nome Default</h2>
          <p className="font-light">Descrição Default</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <span className="font-light text-neutral-500">id: 0D</span>

          <div>
          <LinkButton title="Editar" />
          <LinkButton title="Excluir" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardProduct;