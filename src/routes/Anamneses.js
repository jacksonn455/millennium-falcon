import React, { useState } from "react";
import api from "../services/api";
import FirstPage from "../pages/Anamnese/FirstPage";
import SecondPage from "../pages/Anamnese/SecondPage";
import ThirdPage from "../pages/Anamnese/ThirdPage";
import FourthPage from "../pages/Anamnese/FourthPage";
import FifthPage from "../pages/Anamnese/FifthPage";

const Anamneses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({});

  const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);

  const submitForm = async () => {
    console.log("Dados enviados:", formData);
    try {
      const response = await api.post("/pacientes", formData);
      console.log('Formulário enviado com sucesso:', response.data);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <div>
      {currentPage === 1 && <FirstPage nextPage={nextPage} setFormData={setFormData} formData={formData} />}
      {currentPage === 2 && <SecondPage nextPage={nextPage} prevPage={prevPage} setFormData={setFormData} formData={formData} />}
      {currentPage === 3 && (
        <ThirdPage nextPage={nextPage} prevPage={prevPage} setFormData={setFormData} formData={formData} />
      )}
      {currentPage === 4 && (
        <FourthPage nextPage={nextPage} prevPage={prevPage} setFormData={setFormData} formData={formData} />
      )}
      {currentPage === 5 && <FifthPage prevPage={prevPage} submitForm={submitForm} setFormData={setFormData} formData={formData} />}
    </div>
  );
};

export default Anamneses;