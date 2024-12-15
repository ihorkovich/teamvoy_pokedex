import { useContext, useEffect, useState } from "react";
import { PokemonContext } from "../../Context/DetailedPokemonContext";
import unknown from "/images/unknown.png";

const DetailedPokemonCard = () => {
  const [pokemon, setPokemon] = useState({});
  const { selectedPokemon } = useContext(PokemonContext);

  useEffect(() => {
    const fetchDetailedPokemonData = async () => {
      try {
        const pokemonId = selectedPokemon;
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedPokemon) {
      fetchDetailedPokemonData();
    }
  }, [selectedPokemon]);

  return (
    <>
      {selectedPokemon ? (
        <div
          className="rounded-lg flex flex-col items-center
           mx-auto
          md:h-full 
          bg-blue-300 md:mt-0 p-4
        "
        >
          <img
            src={pokemon.sprites?.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-72 h-72 object-contain"
          />
          <div className="font-bold text-2xl w-full px-2 flex justify-between items-center text-center">
            <p>
              {pokemon.name &&
                pokemon.name
                  .substr(0, 1)
                  .toUpperCase()
                  .concat(pokemon.name.substr(1))}
            </p>
            <p className="text-gray-500">{`#${String(pokemon.id).padStart(
              4,
              "0"
            )}`}</p>
          </div>
          <table className="text-center w-full rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-100 font-medium">
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">
                  {pokemon.types &&
                    pokemon.types[0].type.name
                      .substr(0, 1)
                      .toUpperCase()
                      .concat(pokemon.types[0].type.name.substr(1))}
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {pokemon.stats &&
                pokemon.stats.map((stat) => (
                  <tr
                    key={stat.stat.name}
                    className="odd:bg-blue-200 even:bg-blue-100"
                  >
                    <td className="px-4 py-2 text-center w-8/12">
                      {stat.stat.name &&
                        stat.stat.name
                          .substr(0, 1)
                          .toUpperCase()
                          .concat(stat.stat.name.substr(1))}
                    </td>
                    <td className="px-4 py-2 text-center w-4/12">
                      {stat.base_stat}
                    </td>
                  </tr>
                ))}
              <tr className="bg-blue-200">
                <td className="px-4 py-2">Weight</td>
                <td className="px-4 py-2">{pokemon.weight}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div
          className="rounded-lg flex flex-col items-center
           mx-auto
          md:h-full 
          bg-blue-300 md:mt-0 p-4
        "
        >
          <img
            src={unknown}
            alt="Unknown pokemon"
            className="w-72 h-72 object-contain"
          />
          <div className="font-bold text-2xl w-full px-2 flex justify-between items-center text-center">
            <p className="mx-auto">Choose a pokemon</p>
          </div>
          <table className="text-center w-full rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-100 font-medium">
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">No data</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="bg-blue-200">
                <td className="px-4 py-2">Hp</td>
                <td className="px-4 py-2">No data</td>
              </tr>
              <tr className="bg-blue-100">
                <td className="px-4 py-2">Attack</td>
                <td className="px-4 py-2">No data</td>
              </tr>
              <tr className="bg-blue-200">
                <td className="px-4 py-2">Defense</td>
                <td className="px-4 py-2">No data</td>
              </tr>
              <tr className="bg-blue-100">
                <td className="px-4 py-2">Special-attack</td>
                <td className="px-4 py-2">No data</td>
              </tr>
              <tr className="bg-blue-200">
                <td className="px-4 py-2">Special-defense</td>
                <td className="px-4 py-2">No data</td>
              </tr>
              <tr className="bg-blue-100">
                <td className="px-4 py-2">Speed</td>
                <td className="px-4 py-2">No data</td>
              </tr>
              <tr className="bg-blue-200">
                <td className="px-4 py-2">Weight</td>
                <td className="px-4 py-2">No data</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default DetailedPokemonCard;
