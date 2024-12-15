const typeColors = {
  grass: "#7BBF6A",
  poison: "#9B57A5",
  fire: "#F27D54",
  water: "#5C8CBF",
  bug: "#A6C24E",
  normal: "#A8A878",
  flying: "#A3B9E8",
  electric: "#F4C535",
  ground: "#C7A44D",
  fighting: "#D05A48",
  psychic: "#F59BB1",
  rock: "#C4A55C",
  ice: "#A0D6D2",
  ghost: "#8D6A8B",
  dragon: "#6D59A3",
  dark: "#6A4C47",
  steel: "#A8B2B8",
  fairy: "#F1A7C8",
};

const PokemonCard = ({ id, img, name, type }) => {
  return (
    <div className="rounded-2xl duration-300 hover:shadow-xl hover:cursor-pointer">
      <img src={img} alt={name} className="bg-gray-200 rounded-t-[inherit]" />
      <div className="p-2 flex flex-col justify-left border-l border-r border-b rounded-b-2xl border-gray-200">
        <p className="text-gray-500 font-flexo text-sm">{`#${String(
          id
        ).padStart(4, "0")}`}</p>
        <h2 className="font-flexo font-bold">
          {name.substr(0, 1).toUpperCase().concat(name.substr(1))}
        </h2>
        <p className="flex gap-2 mt-1">
          {type &&
            type.map((typeObj) => {
              return (
                <span
                  key={typeObj.type.name}
                  className={`px-3 py-[1px] border rounded-lg text-white`}
                  style={{ backgroundColor: typeColors[typeObj.type.name] }}
                >
                  {typeObj.type.name
                    .substr(0, 1)
                    .toUpperCase()
                    .concat(typeObj.type.name.substr(1))}
                </span>
              );
            })}
        </p>
      </div>
    </div>
  );
};

export default PokemonCard;
