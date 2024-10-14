This is a simple React app that implements user authentication with a registration and login flow. The application uses Material-UI for the UI components and Axios to communicate with a backend API.

Features:
-User Registration
-User Login
-Protected Routes for Logged-in Users
-JWT-based authentication with token management
-Searchable Product Listing Page


Tech Stack
-Frontend: React, TypeScript, Material-UI (MUI)
-State Management: React's useState and useEffect hooks
-API Requests: Axios for handling HTTP requests
-Authentication: JWT (JSON Web Token)
-Routing: Next.js Router

Usage:

Registration:
-When you first open the app, you will be presented with the registration form. Enter your email and password to create a new account.
-Upon successful registration, the login form will automatically appear.

Login:
-Once registered, you can log in using the same credentials.
-On successful login, the app will redirect you to the product listing page.

Product Listing:
-After logging in, you will see a list of products.
-You can search for products by typing in the search bar.
-Pagination is implemented to browse through the products.
