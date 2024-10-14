"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  TextField,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { getToken } from "../../helpers/CookieManager";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface User {
  sub: string;
}

interface ErrorResponse {
  message: string;
}

const ProductListingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [userEmail, setUserEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const productsPerPage = 8;

  const fetchProducts = async () => {
    const token = getToken();
    try {
      const response1 = await axios.get<{ user: User }>(
        "https://intern-task-api.bravo68web.workers.dev/api/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserEmail(response1.data.user.sub);

      const response = await axios.get<Product[]>(
        "https://intern-task-api.bravo68web.workers.dev/api/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setError("Unexpected response format.");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      setError(
        axiosError.response?.data?.message || "Failed to fetch products."
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <Container maxWidth="lg" sx={{ marginTop: "50px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Logged in as {userEmail}
      </Typography>

      <TextField
        label="Search products..."
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: "20px" }}
      />

      {error && <Typography color="error">{error}</Typography>}

      <Grid container spacing={2}>
        {Array.isArray(currentProducts) && currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card
                sx={{
                  height: 300,
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: 140,
                    objectFit: "contain",
                    margin: "auto",
                  }}
                  image={product.thumbnail}
                  alt={product.title}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      backgroundColor: "white",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      boxShadow: 1,
                      marginBottom: "8px",
                    }}
                  >
                    ${product.price.toFixed(2)}
                  </Typography>

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

      <Grid container justifyContent="center" sx={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          sx={{ marginRight: "10px" }}
        >
          Previous
        </Button>
        <Typography variant="body1" sx={{ marginTop: "8px" }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          sx={{ marginLeft: "10px" }}
        >
          Next
        </Button>
      </Grid>
    </Container>
  );
};

export default ProductListingPage;
