import "./App.css";
import LoginButton from "./components/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AppBar from "./components/AppBar.jsx";
import {Alert} from "@mui/material";
import {useEffect} from "react";
import Cookies from 'js-cookie';

const App = () => {
  const {isAuthenticated} = useAuth0();
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
            <Route path="/" element={<Home />} />
          </Routes>
        ) : (
          <LoginButton />
        )}
      </div>
    </Router>
  );
};

export default App;