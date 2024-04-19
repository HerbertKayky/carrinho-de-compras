import { useContext, useEffect, useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { api } from "../../services/api";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Search from "../../components/search";

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
  const [searchResult, setSearchResult] = useState<ProductProps[]>([]);

  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    // Retorna o valor do localStorage se estiver definido, caso contrário, retorna false
    return savedMode !== null ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

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

  const handleSearch = (searchTerm: string) => {
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResult(filteredProducts);
  };

  const toogleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode && "dark"}`}>
      <div className="dark:bg-slate-900">
        <main className="w-full max-w-7xl px-4 mx-auto">
          <h1 className="dark:text-white font-bold text-2xl mb-4 pt-5 text-center">
            Produtos em alta
          </h1>

          <Search onSearch={handleSearch} />

          <div className="pt-4 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {searchResult.map((product) => (
              <section key={product.id} className="w-full">
                <Link to={`/product/${product.id}`}>
                  <img
                    className="2-full rounded-lg max-h-70 mb-2"
                    src={product.cover}
                    alt={product.title}
                  />

                  <p className="dark:text-white font-medium mt-1 mb-2 text-center">
                    {product.title}
                  </p>
                </Link>
                <div className="flex gap-3 items-center justify-center">
                  <strong className="dark:text-gray-100 text-zinc-700/90">
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </strong>
                  <button
                    onClick={() => handleAddCartItem(product)}
                    className="dark:bg-gray-700 bg-zinc-900 p-1 rounded"
                  >
                    <BsCartPlus size={20} color="#fff" />
                  </button>
                </div>
              </section>
            ))}
            <button
              onClick={toogleDarkMode}
              className="absolute w-10 h-10 bottom-16 right-16 bg-neutral-900 dark:bg-white rounded-full text-white dark:text-black font-semibold"
            >
              {darkMode ? "LGH" : "DRK"}
            </button>
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
    </div>
  );
};

export default Home;
