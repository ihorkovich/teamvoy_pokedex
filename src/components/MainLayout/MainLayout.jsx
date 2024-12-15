import Navbar from "../Navbar/Navbar";
import DetailedPokemonCard from "../DetailedPokemonCard/DetailedPokemonCard";
import PokemonBoard from "../PokemonBoard/PokemonBoard";
import { PokemonProvider } from "../../Context/DetailedPokemonContext";
import GoToTop from "../goToTop/goToTop";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="container max-w-[1440px] px-4 lg:px-12 flex flex-col mx-auto">
        <PokemonProvider>
          <div className="flex mt-5 flex-col md:justify-between gap-5 md:flex-row-reverse px-4">
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
