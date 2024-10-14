"use client"; // Specifies this is a Client Component

import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Button, TextField } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { getToken } from '../../helpers/CookieManager'; // Adjust the import path if needed

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface User {
  sub: string; // The field that contains the email
}

interface ErrorResponse {
  message: string;
}

const ProductListingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [userEmail, setUserEmail] = useState<string>(''); // New state for user email
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>(''); // New state for search query
  const productsPerPage = 8; // 8 products per page

  // Fetch products and user info from the API
  const fetchProducts = async () => {
    const token = getToken(); // Retrieve the stored token
    try {
      // Fetch user details (including email stored in `sub`)
      const response1 = await axios.get<{ user: User }>('https://intern-task-api.bravo68web.workers.dev/api/me', {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the JWT token in the request header
        },
      });

      // Set the user's email from `sub`
      setUserEmail(response1.data.user.sub);

      // Fetch products
      const response = await axios.get<Product[]>('https://intern-task-api.bravo68web.workers.dev/api/products', {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the JWT token in the request header
        },
      });

      // Check if response.data is an array
      if (Array.isArray(response.data)) {
        setProducts(response.data); // Set the product data if it's an array
      } else {
        setError('Unexpected response format.');
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>; 
      setError(axiosError.response?.data?.message || 'Failed to fetch products.');
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []);

  // Filter the products based on the search query
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the products for the current page (after filtering)
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page handler
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <Container maxWidth="lg" sx={{ marginTop: '50px' }}>
      {/* <Typography variant="h4" align="center" gutterBottom>
        Product Listing
      </Typography> */}

      {/* Display the user's email below the header */}
      <Typography variant="h4" align="center" gutterBottom>
        Logged in as {userEmail} {/* Show the user's email */}
      </Typography>

      {/* Search bar */}
      <TextField
        label="Search products..."
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
        sx={{ marginBottom: '20px' }} // Add space below the search bar
      />

      {error && <Typography color="error">{error}</Typography>}

      <Grid container spacing={2}>
        {/* Safeguard products.map */}
        {Array.isArray(currentProducts) && currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card sx={{ height: 300, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <CardMedia
                  component="img"
                  sx={{ 
                    height: 140,  // Fixed height for image
                    objectFit: 'contain', // Images can vary but remain within their cards
                    margin: 'auto' // Center the image
                  }}
                  image={product.thumbnail}
                  alt={product.title}
                />
                <CardContent 
                  sx={{ 
                    flexGrow: 1, 
                    display: 'flex', 
                    flexDirection: 'column', // Stack price and title vertically
                    alignItems: 'center', // Center both price and title horizontally
                    justifyContent: 'center', // Center vertically
                    textAlign: 'center' // Center text
                  }}
                >
                  {/* Price above the title */}
                  <Typography
                    variant="body1"
                    sx={{
                      backgroundColor: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      boxShadow: 1, // Optional: add a shadow for better visibility
                      marginBottom: '8px' // Add space between price and title
                    }}
                  >
                    ${product.price.toFixed(2)} {/* Format the price */}
                  </Typography>

                  {/* Product title */}
                  <Typography variant="h6" component="div">
                    {product.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" align="center">
            No products available.
          </Typography>
        )}
      </Grid>

      {/* Pagination Controls */}
      <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
        <Button 
          variant="contained" 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          sx={{ marginRight: '10px' }}
        >
          Previous
        </Button>
        <Typography variant="body1" sx={{ marginTop: '8px' }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          sx={{ marginLeft: '10px' }}
        >
          Next
        </Button>
      </Grid>
    </Container>
  );
};

export default ProductListingPage;
