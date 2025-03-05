# MERN Project Setup Guide

This guide will help you clone and run a MERN (MongoDB, Express, React, Node.js) project locally.

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

## Clone the Repository
```sh
git clone <repository_url>
cd <repository_folder>
```

## Setup Backend
1. Navigate to the backend folder:
    ```sh
    cd backend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Create a `.env` file in the `backend` folder and add the following:
    ```env
    MONGODB_URI=<your_mongodb_connection_string>
    PORT=5000
    ```
4. Start the backend server:
    ```sh
    npm start
    ```

## Setup Frontend
1. Navigate to the frontend folder:
    ```sh
    cd ../frontend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Create a `.env` file in the `frontend` folder and add the following:
    ```env
    VITE_BASE_URL=http://localhost:5000
    ```
4. Start the frontend development server:
    ```sh
    npm run dev
    ```

## Running the Project
Once both the backend and frontend servers are running:
- The backend will be available at `http://localhost:5000`
- The frontend will be available at `http://localhost:5173` (default Vite port)

## Additional Notes
- Make sure MongoDB is running locally or provide a remote MongoDB connection.
- If you encounter port conflicts, update the `.env` files accordingly.
- Use `nodemon` for backend development for automatic restarts on code changes.
  ```sh
  npm install -g nodemon
  nodemon server.js
  ```

Happy Coding! 🚀

