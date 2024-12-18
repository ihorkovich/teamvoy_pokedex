import Navbar from "../Navbar/Navbar";
import DetailedPokemonCard from "../DetailedPokemonCard/DetailedPokemonCard";
import PokemonBoard from "../PokemonBoard/PokemonBoard";
import { PokemonProvider } from "../../Context/DetailedPokemonContext";
import GoToTop from "../GoToTop/GoToTop";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto flex max-w-[1440px] flex-col px-4 lg:px-12">
        <PokemonProvider>
          <div className="mt-5 flex flex-col gap-5 px-4 md:flex-row-reverse md:justify-between">
            <DetailedPokemonCard />
            <PokemonBoard />
          </div>
        </PokemonProvider>
        <GoToTop />
      </div>
    </>
  );
};

export default MainLayout;
