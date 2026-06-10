//画面遷移ルールの定義、URLごとのルーティング
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import Result from './pages/Result.jsx';
import History from './pages/History.jsx';
import Favorite from './pages/Favorite.jsx';
import GachaExecute from './pages/GachaExecute.jsx'
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx'
import RestaurantDetail from './pages/RestaurantDetail.jsx';
import Profile from './pages/Profile.jsx'
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact.jsx";
import Welcome from './pages/Welcome.jsx';

//追加
import { useEffect } from "react";
import { themes } from "./themes";

function App() {
  //ログイン状態であるかどうか
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //追加↓
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "pink"
  );

  useEffect(() => {
    const currentTheme = themes[theme];

    document.documentElement.style.setProperty(
      "--header-color",
      currentTheme.header
    );

    document.documentElement.style.setProperty(
      "--footer-color",
      currentTheme.footer
    );

    document.documentElement.style.setProperty(
      "--button-bg",
      currentTheme.buttonBg
    );

    document.documentElement.style.setProperty(
      "--button-text",
      currentTheme.buttonText
    );

    document.documentElement.style.setProperty(
      "--auth-button-bg",
      currentTheme.authButtonBg
    );

    document.documentElement.style.setProperty(
      "--auth-button-text",
      currentTheme.authButtonText
    );

    document.documentElement.style.setProperty(
      "--gacha-button-bg",
      currentTheme.gachaButtonBg
    );

    document.documentElement.style.setProperty(
      "--gacha-button-text",
      currentTheme.gachaButtonText
    );

    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = () => {
    setIsAuthenticated(false);
  }
  const handleLogin = () => {
    setIsAuthenticated(true);
  }
  return (
    <Router>
      {location.pathname !== "/" &&
        <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      }
      <Routes>
        <Route path="/" element={<Welcome />} />
        {/*未ログインでアクセス可能な画面*/}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/*ログイン済みならアクセス可能、未ログインの場合はログイン画面に遷移させる*/}
        <Route path="/home" element={isAuthenticated ? <><Home /><Footer /></> : <Navigate to="/login" />} />
        <Route path="/result" element={isAuthenticated ? <><Result /><Footer /></> : <Navigate to="/login" />} />
        <Route path="/history" element={isAuthenticated ? <><History /><Footer /></> : <Navigate to="/login" />} />
        <Route path="/favorite" element={isAuthenticated ? <><Favorite /><Footer /></> : <Navigate to="/login" />} />
        <Route path="/gachaexecute" element={isAuthenticated ? <><GachaExecute /></> : <Navigate to="/login" />} />
        <Route path="/restaurantdetail" element={isAuthenticated ? <><RestaurantDetail /><Footer /></> : <Navigate to="/login" />} />
        {/* <Route path="/profile" element={isAuthenticated ? <><Profile /><Footer /></> : <Navigate to="/login" />} /> */}
        <Route
          path="/profile"
          element={
            isAuthenticated
              ? <><Profile setTheme={setTheme} /><Footer /></>
              : <Navigate to="/login" />
          }
        />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={isAuthenticated ? <><Contact /><Footer /></> : <Navigate to="/login" />} />
        {/*"/"にアクセスした場合はログイン状況によりログイン画面かホーム画面に遷移する*/}
        {/* <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} /> */}
      </Routes>
    </Router>
  );
}

export default App;