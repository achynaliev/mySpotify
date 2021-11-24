import React from "react";
import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store/store";
import { Provider } from "react-redux";
import AuthContextProvider from "./contexts/AuthContext";

const SpotifyRoutes = () => {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route exact path="/auth" element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </Provider>
  );
};

export default SpotifyRoutes;