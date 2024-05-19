import CardHistory from "./CardHistory";

interface HistoryProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const History: React.FC<HistoryProps> = ({ isOpen, setOpen }) => {
  return isOpen ? (
    <section className="fixed top-0 right-0 bottom-0 left-0  bg-neutral-950/70 z-10 p-5 overflow-y-scroll">
      <div className="h-dvh fixed top-0 right-0 bg-slate-50 w-full sm:w-2/3 lg:w-[450px] p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-neutral-600">
            Histórico
          </h2>
          <span 
            onClick={() => setOpen(!isOpen)}
            className="text-neutral-500 text-4xl font-bold hover:text-neutral-700 select-none cursor-pointer"
          >&times;
          </span>
        </div>

        <div className="flex flex-col items-center w-full mt-10">
          <CardHistory />
        </div>
      </div>
    </section>
  ) : null;
}

export default History;