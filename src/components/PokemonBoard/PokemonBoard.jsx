import { useState, useEffect, useContext, useCallback, memo } from "react";
import { PokemonContext } from "../../Context/DetailedPokemonContext";
import PokemonCard from "../PokemonCard/PokemonCard";

const MemoizedPokemonCard = memo(({ pokemon, onClick }) => {
  return (
    <div onClick={onClick}>
      <PokemonCard
        id={pokemon.id}
        img={pokemon.sprites.other["official-artwork"].front_default}
        name={pokemon.name}
        type={pokemon.types}
      />
    </div>
  );
});

MemoizedPokemonCard.displayName = "MemoizedPokemonCard";

const PokemonBoard = () => {
  const { setSelectedPokemon } = useContext(PokemonContext);

  const [pokemonCards, setPokemonCards] = useState([]); // дисплей всіх карток
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1); // за раз вивантажуться 12, при кліку лоад мор додаються ще 12(наступна сторінка)
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(""); //повідолення текст
  const [currentlyChoosedPokemon, setCurrentlyChoosedPokemon] = useState(null);
  const [messageColor, setMessageColor] = useState(null);
  const [selectedType, setSelectedType] = useState("all");

  const [alreadyFetchedPokemonTypes, setAlreadyFetchedPokemonTypes] = useState(
    []
  );

  useEffect(() => {
    const fetchPokemonCards = async () => {
      setIsLoading(true);
      try {
        const pokemonData = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 12}&limit=12`
        );
        const data = await pokemonData.json();
        const results = data.results;

        const pokemonPromises = results.map((result) =>
          fetch(result.url).then((res) => res.json())
        );

        const pokemonDataDetails = await Promise.all(pokemonPromises);

        setPokemonCards((prevPokemons) => [
          ...prevPokemons,
          ...pokemonDataDetails,
        ]);

        // Збираємо всі типи, додаємо тільки унікальні
        const newTypes = pokemonDataDetails
          .map((pok) => pok.types.map((el) => el.type.name))
          .flat();

        setAlreadyFetchedPokemonTypes((prev) => {
          const allTypes = new Set([...prev, ...newTypes]);
          return Array.from(allTypes);
        });
      } catch (error) {
        console.log(error); //майже модальне вікно для ивведення помилки, щоб користувач розумів
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonCards();
  }, [page]);

  console.log(pokemonCards);

  // Фільтр покемоніз за типом
  useEffect(() => {
    if (selectedType === "all") {
      setFilteredPokemons(pokemonCards);
    } else {
      const filtered = pokemonCards.filter((pokemon) =>
        pokemon.types.some((type) => type.type.name === selectedType)
      );
      setFilteredPokemons(filtered);
    }
  }, [selectedType, pokemonCards]);

  //вивантажуєм наступну пачку покемонів
  const loadMorePokemonsHandle = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  //вибираємо покемонів. Якшо вже вибрали то другий раз не вивраєм
  const chosePokemonHandle = (pokemon) => {
    if (currentlyChoosedPokemon === pokemon.id) {
      setMessageColor("bg-red-500");
      setMessage(
        `You have already selected ${pokemon.name
          .substr(0, 1)
          .toUpperCase()
          .concat(pokemon.name.substr(1))}!`
      );
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    } else {
      setCurrentlyChoosedPokemon(pokemon.id); // Оновлюємо стан тільки якщо покемон змінений
      setSelectedPokemon(pokemon.id); // Тут теж можемо уникнути оновлення, якщо він не змінений
      setMessageColor("bg-blue-500");
      setMessage(
        `You selected ${pokemon.name
          .substr(0, 1)
          .toUpperCase()
          .concat(pokemon.name.substr(1))}!`
      );
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  // фільтрування
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <div className="overflow-y-auto mx-auto">
      <div className="relative my-4 font-flexo">
        <label
          htmlFor="type-filter"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Filter by Type:
        </label>
        <select
          id="type-filter"
          value={selectedType}
          onChange={handleTypeChange}
          className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="all">All</option>
          {alreadyFetchedPokemonTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[680px]">
        {filteredPokemons.map((pokemon) => (
          <MemoizedPokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => chosePokemonHandle(pokemon)}
          />
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center my-5">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-400 border-solid"></div>
          <p className="ml-3">Loading...</p>
        </div>
      ) : (
        <button
          className="my-5 w-full rounded-xl md:text-2xl h-14 bg-blue-400 text-white cursor-pointer font-flexo"
          onClick={loadMorePokemonsHandle}
        >
          Load more
        </button>
      )}

      {showMessage && (
        <div
          className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 ${messageColor} text-white px-4 py-2 rounded-lg`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default PokemonBoard;
