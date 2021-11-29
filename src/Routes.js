import React from "react";
import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store/store";
import { Provider } from "react-redux";
import AuthContextProvider from "./contexts/AuthContext";
import PlayerContextProvider from "./contexts/PlayerContext";

const SpotifyRoutes = () => {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <PlayerContextProvider>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<MainPage />} />
              <Route exact path="/upload" element={<MainPage />} />
              <Route exact path="/auth" element={<AuthPage />} />
              <Route exact path="/store" element={<MainPage />} />
            </Routes>
          </BrowserRouter>
        </PlayerContextProvider>
      </AuthContextProvider>
    </Provider>
  );
};

export default SpotifyRoutes;
