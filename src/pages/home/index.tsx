import { useContext, useEffect, useState } from "react";
import { BsCartPlus, BsSearch } from "react-icons/bs";
import { api } from "../../services/api";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export interface ProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
}

const Home = () => {
  const { addItemCart } = useContext(CartContext);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResult, setSearchResult] = useState<ProductProps[]>([]);

  useEffect(() => {
    async function getProducts() {
      const response = await api.get("/products");
      setProducts(response.data);
      setSearchResult(response.data);
    }

    getProducts();
  }, []);

  function handleAddCartItem(product: ProductProps) {
    addItemCart(product);
    toast.success("Produto ao carrinho", {
      style: {
        borderRadius: 10,
        backgroundColor: "#121212",
        color: "#fff",
      },
    });
  }

  const handleSearch = () => {
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResult(filteredProducts);
  };

  return (
    <div>
      <main className="w-full max-w-7xl px-4 mx-auto">
        <h1 className="font-bold text-2xl mb-4 mt-6 text-center">
          Produtos em alta
        </h1>

        <div className="relative ">
          <BsSearch
            className="absolute items-center start-3 top-3"
            color="gray"
          />

          <input
            className="block w-full p-2 ps-8 outline-none text-gray-900 rounded-lg border-2 border-zinc-300 font-medium"
            type="search"
            placeholder="Pesquisar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="text-white absolute end-2 bottom-1.5 font-medium rounded-lg px-3 py-1 bg-blue-700 hover:bg-blue-800 "
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="pt-4 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {searchResult.map((product) => (
            <section key={product.id} className="w-full">
              <Link to={`/product/${product.id}`}>
                <img
                  className="2-full rounded-lg max-h-70 mb-2"
                  src={product.cover}
                  alt={product.title}
                />

                <p className="font-medium mt-1 mb-2 text-center">
                  {product.title}
                </p>
              </Link>
              <div className="flex gap-3 items-center justify-center">
                <strong className="text-zinc-700/90">
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
                <button
                  onClick={() => handleAddCartItem(product)}
                  className="bg-zinc-900 p-1 rounded"
                >
                  <BsCartPlus size={20} color="#fff" />
                </button>
              </div>
            </section>
          ))}
        </div>
        <div className="flex justify-center pt-5">
          {searchResult.length === 0 && (
            <p className="font-medium text-xl text-center text-gray-900">
              Nenhum item encontrado. <br></br>
              Tente pesquisar usando palavras chave
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
