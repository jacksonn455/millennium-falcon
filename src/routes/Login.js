import React, { useState } from "react";
import styled from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(90deg, rgb(244, 71, 149) 35%, #faaccc 165%);
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background-color: white;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #a8235e;
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d23c6e;
  }
`;

const Title = styled.h2`
  color: #a8235e;
  margin-bottom: 20px;
`;

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleLogin) {
      handleLogin({ email, password });
    } else {
      console.error("handleLogin não foi passado como prop.");
    }
  };

  return (
    <LoginContainer>
      <FormContainer>
        <Title>Login</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <Button type="submit">Login</Button>
        </form>
      </FormContainer>
    </LoginContainer>
  );
};

export default Login;