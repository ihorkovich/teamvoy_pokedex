import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  memo,
} from "react";
import { PokemonContext } from "../../Context/DetailedPokemonContext";
import PokemonCard from "../PokemonCard/PokemonCard";

type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

type Pokemon = {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: { type: { name: string } }[];
  stats: PokemonStat;
};

type FetchPokemonResult = {
  name: string;
  url: string;
};

type FetchPokemonTypesResult = {
  name: string[];
};

type MemoizedPokemonCardProps = {
  pokemon: Pokemon;
  onClick: () => void;
};

type PokemonContextType = {
  setSelectedPokemon: (pokemon: Pokemon) => void;
};

const MemoizedPokemonCard: React.FC<MemoizedPokemonCardProps> = memo(
  ({ pokemon, onClick }) => {
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
  },
);

MemoizedPokemonCard.displayName = "MemoizedPokemonCard";

const PokemonBoard = () => {
  const { setSelectedPokemon } = useContext(
    PokemonContext,
  ) as PokemonContextType;

  const [pokemonCards, setPokemonCards] = useState<Pokemon[]>([]); // дисплей всіх карток
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1); // за раз вивантажуться 12, при кліку лоад мор додаються ще 12(наступна сторінка)
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(""); //повідолення текст
  const [currentlyChoosedPokemon, setCurrentlyChoosedPokemon] = useState<
    number | null
  >(null);
  const [messageColor, setMessageColor] = useState<string>("bg-blue-500");
  const [selectedType, setSelectedType] = useState<string>("all");

  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchPokemonCards = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 12}&limit=12`,
        );
        const data: { results: FetchPokemonResult[] } = await response.json();

        const pokemonPromise = data.results.map((result) =>
          fetch(result.url).then((res) => res.json()),
        );

        const pokemonDataDetails = await Promise.all(pokemonPromise);

        setPokemonCards((prevPokemons) => [
          ...prevPokemons,
          ...pokemonDataDetails,
        ]);
      } catch (error) {
        console.log(error); //майже модальне вікно для ивведення помилки, щоб користувач розумів
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonCards();
  }, [page]);

  useEffect(() => {
    const fetchPokemonTypes = async () => {
      try {
        fetch("https://pokeapi.co/api/v2/type")
          .then((data) => data.json())
          .then((res) =>
            setPokemonTypes(
              res.results.map((type: FetchPokemonTypesResult) => type.name),
            ),
          );
      } catch (error) {
        console.log(error);
      }
    };
    fetchPokemonTypes();
  }, []);

  // Фільтр покемоніз за типом FIXME:
  useEffect(() => {
    if (selectedType === "all") {
      setFilteredPokemons(pokemonCards);
    } else {
      const filtered = pokemonCards.filter((pokemon) =>
        pokemon.types.some((type) => type.type.name === selectedType),
      );
      setFilteredPokemons(filtered);
    }
  }, [selectedType, pokemonCards]);

  //вивантажуєм наступну пачку покемонів
  const loadMorePokemonsHandle = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  //Вибираємо покемонів. Якшо вже вибрали то другий раз не вибираємо
  const chosePokemonHandle = (pokemon: Pokemon): void => {
    if (currentlyChoosedPokemon === pokemon.id) {
      setMessageColor("bg-red-500");
      setMessage(
        `You have already selected ${pokemon.name
          .substr(0, 1)
          .toUpperCase()
          .concat(pokemon.name.substr(1))}!`,
      );
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    } else {
      setCurrentlyChoosedPokemon(pokemon.id); // Оновлюємо стан тільки якщо покемон змінений
      setSelectedPokemon(pokemon); // передаєм покемона, який вже зафетчено
      setMessageColor("bg-blue-500");
      setMessage(
        `You selected ${pokemon.name
          .substr(0, 1)
          .toUpperCase()
          .concat(pokemon.name.substr(1))}!`,
      );
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  // фільтрування
  const handleTypeChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedType(event.target.value);
  };

  return (
    <div className="mx-auto">
      <div className="relative my-4 w-full font-flexo">
        <label
          htmlFor="type-filter"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Filter by Type:
        </label>
        <select
          id="type-filter"
          value={selectedType}
          onChange={handleTypeChange}
          className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 sm:text-sm"
        >
          <option value="all">All</option>
          {pokemonTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {pokemonCards.length != 0 && filteredPokemons.length == 0 && (
        <div className="flex h-20 w-full items-center justify-center rounded-xl bg-red-500 px-10 text-center font-flexo text-xl font-bold text-white">
          No Pokémon of this type found
        </div>
      )}
      <div className="grid max-w-[680px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPokemons.map((pokemon) => (
          <MemoizedPokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => chosePokemonHandle(pokemon)}
          />
        ))}
      </div>
      {isLoading ? (
        <div className="my-5 flex items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-400"></div>
          <p className="ml-3">Loading...</p>
        </div>
      ) : (
        <button
          className="my-5 h-14 w-full cursor-pointer rounded-xl bg-blue-400 px-10 font-flexo text-white md:text-2xl"
          onClick={loadMorePokemonsHandle}
        >
          Load more
        </button>
      )}
      {showMessage && (
        <div
          className={`fixed bottom-5 left-1/2 -translate-x-1/2 transform ${messageColor} rounded-lg px-4 py-2 text-center text-white`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default PokemonBoard;
