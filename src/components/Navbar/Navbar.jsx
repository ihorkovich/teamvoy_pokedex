import logo from "/images/logo.png";
const Navbar = () => {
  return (
    <div className="h-20 w-full flex justify-center items-center">
      <img src={logo} alt="Pokedex" className="h-20" />
    </div>
  );
};

export default Navbar;
