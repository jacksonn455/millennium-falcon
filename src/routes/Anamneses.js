import React, { useState } from "react";
import FirstPage from "../pages/Anamnese/FirstPage";
import SecondPage from "../pages/Anamnese/SecondPage";
import ThirdPage from "../pages/Anamnese/ThirdPage";
import FourthPage from "../pages/Anamnese/FourthPage";
import FifthPage from "../pages/Anamnese/FifthPage";

const Anamneses = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);

  return (
    <div>
      {currentPage === 1 && <FirstPage nextPage={nextPage} />}
      {currentPage === 2 && <SecondPage nextPage={nextPage} prevPage={prevPage} />}
      {currentPage === 3 && <ThirdPage nextPage={nextPage} prevPage={prevPage} />}
      {currentPage === 4 && <FourthPage nextPage={nextPage} prevPage={prevPage} />}
      {currentPage === 5 && <FifthPage prevPage={prevPage} />}
    </div>
  );
};

export default Anamneses;