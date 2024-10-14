"use client";

import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import RegisterForm from "../component/RegisterForm";
import LoginForm from "../component/LoginForm";

const IndexPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleRegistrationSuccess = () => {
    setIsLogin(true);
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "50px" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Welcome
      </Typography>

      {!isLogin ? (
        <>
          <RegisterForm onSuccess={handleRegistrationSuccess} />
        </>
      ) : (
        <LoginForm />
      )}
    </Container>
  );
};

export default IndexPage;
