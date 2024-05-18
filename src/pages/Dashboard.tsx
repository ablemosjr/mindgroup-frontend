import LinkButton from '../components/LinkButton';
import CardProduct from '../components/CardProduct';

const Dashboard = () => {
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
          <CardProduct />
        </div>
      </section>
    </main>
  )
}

export default Dashboard;