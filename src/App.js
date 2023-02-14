import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Register from "./pages/Register/Register";

const App = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
