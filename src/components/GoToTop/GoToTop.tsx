import React, { useState, useEffect } from "react";
import arrow_up from "/images/arrow_up.svg";

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

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
      <div className="fixed bottom-10 right-10">
        <img
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          src={arrow_up}
          alt="Arrow up"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-300 p-2 duration-300 hover:cursor-pointer hover:bg-blue-500"
        />
      </div>
    )
  );
};

export default GoToTop;
