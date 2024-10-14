// "use client"; // Specifies this is a Client Component

// import React, { useState } from "react";
// import { Container, Typography, Link } from "@mui/material";
// import RegisterForm from "../component/RegisterForm"; // Ensure this path is correct
// import LoginForm from "../component/LoginForm"; // Ensure this path is correct

// const IndexPage: React.FC = () => {
//   const [isLogin, setIsLogin] = useState(false); // State to track which form to display

//   const handleRegistrationSuccess = () => {
//     setIsLogin(true); // Set to true to show the login form
//   };

//   return (
//     <Container maxWidth="sm" sx={{ marginTop: "50px" }}>
//       <Typography variant="h3" align="center" gutterBottom>
//         Welcome
//       </Typography>

//       {/* Conditionally render forms based on state */}
//       {!isLogin ? (
//         <>
//           {/* Render RegisterForm */}
//           <RegisterForm onSuccess={handleRegistrationSuccess} />
//           <Typography align="center" sx={{ marginTop: "20px" }}>
//             Already have an account?
//             <Link
//               href="#"
//               onClick={() => setIsLogin(true)}
//               variant="body1"
//               sx={{ marginLeft: "5px" }}
//             >
//               Login here
//             </Link>
//           </Typography>
//         </>
//       ) : (
//         <LoginForm />
//       )}
//     </Container>
//   );
// };

// export default IndexPage;


"use client"; // Specifies this is a Client Component

import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import RegisterForm from "../component/RegisterForm"; // Ensure this path is correct
import LoginForm from "../component/LoginForm"; // Ensure this path is correct

const IndexPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false); // State to track which form to display

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
