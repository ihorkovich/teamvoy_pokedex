import { useState, useEffect } from "react";
import arrow_up from "/images/arrow_up.svg";

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    isVisible && (
      <div className="fixed right-10 bottom-10">
        <img
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          src={arrow_up}
          alt="Arrow up"
          className="w-12 h-12 bg-blue-300 flex justify-center items-center rounded-full p-2 hover:bg-blue-500 hover:cursor-pointer duration-300"
        />
      </div>
    )
  );
};

export default GoToTop;
