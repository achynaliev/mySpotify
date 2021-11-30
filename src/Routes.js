import React from "react";
import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store/store";
import { Provider } from "react-redux";
import AuthContextProvider from "./contexts/AuthContext";
import PlayerContextProvider from "./contexts/PlayerContext";
import StoreContextProvider from "./contexts/StoreContext";

const SpotifyRoutes = () => {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <PlayerContextProvider>
          <StoreContextProvider>
            <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<MainPage />} />
                <Route exact path="/upload" element={<MainPage />} />
                <Route exact path="/auth" element={<AuthPage />} />
                <Route exact path="/store/:category" element={<MainPage />} />
                <Route exact path="/cart" element={<MainPage />} />
              </Routes>
            </BrowserRouter>
          </StoreContextProvider>
        </PlayerContextProvider>
      </AuthContextProvider>
    </Provider>
  );
};

export default SpotifyRoutes;
