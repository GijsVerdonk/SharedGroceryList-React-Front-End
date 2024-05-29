import "./App.css";
import LoginButton from "./components/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AppBar from "./components/AppBar.jsx";
import {Alert} from "@mui/material";
import List from "./components/List.jsx";
import Item from "./components/Item.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";

const App = () => {
  const {isAuthenticated, isLoading} = useAuth0();

  if (isLoading) {
      return (

          <div>
              <AppBar/>
              <CircularProgress sx={{ m: 2 }}/>
          </div>
      )
  }

  return (
    <Router>
      <div>
        <AppBar />
          {!isAuthenticated && (
              <Alert severity="info">
                  Log in om toegang te krijgen tot alle functionaliteit.
              </Alert>
          )}
        {isAuthenticated ? (
          <Routes>
            <Route path="*" element={<Home />} />
              <Route path="/list/:id" element={<List/>} />
              <Route path="/item/:id" element={<Item/>} />
          </Routes>
        ) : (
          <LoginButton />
        )}
      </div>
    </Router>
  );
};

export default App;