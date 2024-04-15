import { useState } from "react";
import { BsSearch } from "react-icons/bs";

interface SearchProps {
  onSearch: (term: string) => void;
}

const Search = ({ onSearch }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="relative ">
      <BsSearch className="absolute items-center start-3 top-3" color="gray" />
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
  );
};

export default Search;
