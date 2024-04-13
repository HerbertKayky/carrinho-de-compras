import { BsCartPlus } from "react-icons/bs";

const Home = () => {
  return (
    <div>
      <main className="w-full max-w-7xl px-4 mx-auto">
        <h1 className="font-bold text-2xl mb-4 mt-10 text-center">
          Produtos em alta
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          <section className="w-full">
            <img
              className="2-full rounded-lg max-h-70 mb-2"
              src="https://i.zst.com.br/thumbs/12/b/18/1457943551.jpg"
              alt="Logo do produto"
            />
            <p className="font-medium mt-1 mb-2 text-center">
              Manifesto do partido Comunista
            </p>
            <div className="flex gap-3 items-center justify-center">
              <strong className="text-zinc-700/90">R$18,98</strong>
              <button className="bg-zinc-900 p-1 rounded">
                <BsCartPlus size={20} color="#fff" />
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
