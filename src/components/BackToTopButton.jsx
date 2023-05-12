import { useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import "./BackToTopButton.css";
import AOS from "aos";
import "aos/dist/aos.css";

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setShowButton(window.scrollY > 150 ? true : false);
    });
  });

  function scrollUp() {
    window.scrollTo({ top: 0 });
  }

  return (
    <>
      {showButton && (
        <button className="backToTopBtn" onClick={scrollUp} data-aos="fade-up">
          <AiOutlineArrowUp color="white" size={30} />
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
