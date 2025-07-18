import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import FirstPage from "../pages/Anamnese/FirstPage";
import SecondPage from "../pages/Anamnese/SecondPage";
import ThirdPage from "../pages/Anamnese/ThirdPage";
import FourthPage from "../pages/Anamnese/FourthPage";
import FifthPage from "../pages/Anamnese/FifthPage";

const Anamneses = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({});

  const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);

  const submitForm = async () => {
    try {
      const response = await api.post("/pacientes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if (response.status === 200 || response.status === 201) {
        alert("Anamnese enviada com sucesso!");
        navigate("/");
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao enviar anamnese. Tente novamente.");
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