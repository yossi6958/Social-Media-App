import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage/HomePage";
import LoginPage from "./scenes/loginPage/LoginPage";
import ProfilePage from "./scenes/profilePage/ProfilePage";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { setLogout } from "./state";

function App() {
  const dispatch = useDispatch();

  const mode = useSelector((state) => state.mode);
  // const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  // if (prefersDarkMode) {
  //   dispatch(setMode({ mode: "dark" }));
  // }
  // else {
  //   dispatch(setMode({ mode: "light" }));
  // }

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth =
    useSelector((state) => state.tokenExpiration) > new Date().toISOString();
  if (!isAuth) dispatch(setLogout());

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={isAuth ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/login" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
