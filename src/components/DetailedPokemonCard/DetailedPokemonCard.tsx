import React, { useContext } from "react";
import { PokemonContext } from "../../Context/DetailedPokemonContext";
import unknown from "/images/unknown.png";

type PokemonStat = {
  stat: {
    name: string;
  };
  base_stat: number;
};

const DetailedPokemonCard = () => {
  const { selectedPokemon }: any = useContext(PokemonContext);

  return (
    <>
      {selectedPokemon ? (
        <div className="mx-auto flex flex-col items-center rounded-lg bg-blue-300 p-4 md:mt-0 md:h-full">
          <img
            src={
              selectedPokemon.sprites?.other["official-artwork"].front_default
            }
            alt={selectedPokemon.name}
            className="h-72 w-72 object-contain"
          />
          <div className="flex w-full items-center justify-between px-2 text-center text-2xl font-bold">
            <p>
              {selectedPokemon.name &&
                selectedPokemon.name
                  .substr(0, 1)
                  .toUpperCase()
                  .concat(selectedPokemon.name.substr(1))}
            </p>
            <p className="text-gray-500">{`#${String(
              selectedPokemon.id,
            ).padStart(4, "0")}`}</p>
          </div>
          <table className="w-full overflow-hidden rounded-lg text-center">
            <thead>
              <tr className="bg-blue-100 font-medium">
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">
                  {selectedPokemon.types &&
                    selectedPokemon.types[0].type.name
                      .substr(0, 1)
                      .toUpperCase()
                      .concat(selectedPokemon.types[0].type.name.substr(1))}
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {selectedPokemon.stats &&
                selectedPokemon.stats.map((stat: PokemonStat) => (
                  <tr
                    key={stat.stat.name}
                    className="odd:bg-blue-200 even:bg-blue-100"
                  >
                    <td className="w-8/12 px-4 py-2 text-center">
                      {stat.stat.name &&
                        stat.stat.name
                          .substr(0, 1)
                          .toUpperCase()
                          .concat(stat.stat.name.substr(1))}
                    </td>
                    <td className="w-4/12 px-4 py-2 text-center">
                      {stat.base_stat}
                    </td>
                  </tr>
                ))}
              <tr className="bg-blue-200">
                <td className="px-4 py-2">Weight</td>
                <td className="px-4 py-2">{selectedPokemon.weight}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mx-auto flex flex-col items-center rounded-lg bg-blue-300 p-4 md:mt-0 md:h-full">
          <img
            src={unknown}
            alt="Unknown pokemon"
            className="h-72 w-72 object-contain"
          />
          <div className="flex w-full items-center justify-between px-2 text-center text-2xl font-bold">
            <p className="mx-auto">Choose a pokemon</p>
          </div>
          <table className="w-full overflow-hidden rounded-lg text-center">
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
