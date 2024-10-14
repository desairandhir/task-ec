export const setToken = (token: string) => {
    localStorage.setItem('jwtToken', token); // Store token in localStorage
  };
  
  export const getToken = () => {
    return localStorage.getItem('jwtToken'); // Retrieve token from localStorage
  };
  