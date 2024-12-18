import logo from "/images/logo.png";

const Navbar = () => {
  return (
    <div className="flex h-20 w-full items-center justify-center">
      <img src={logo} alt="Pokedex" className="h-20" />
    </div>
  );
};

export default Navbar;
