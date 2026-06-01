//画面遷移ルールの定義、URLごとのルーティング
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import Result from './pages/Result.jsx';
import History from './pages/History.jsx';
import Favorite from './pages/Favorite.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx'
function App() {
  //ログイン状態であるかどうか
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleLogout = () => {
    setIsAuthenticated(false);
  }
  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout}/>
      <Routes>
        {/*未ログインでアクセス可能な画面*/ }
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

        {/*ログイン済みならアクセス可能、未ログインの場合はログイン画面に遷移させる*/ }
        <Route path="/home" element={isAuthenticated ? <><Home/><Footer/></> : <Navigate to="/login" />} />
        <Route path="/result" element={isAuthenticated ? <><Result/><Footer/></> : <Navigate to="/login" />} />
        <Route path="/history" element={isAuthenticated ? <><History/><Footer/></> : <Navigate to="/login" />} />
        <Route path="/favorite" element={isAuthenticated ? <><Favorite/><Footer/></> : <Navigate to="/login" />} />

        {/*"/"にアクセスした場合はログイン状況によりログイン画面かホーム画面に遷移する*/ }
        <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"}/>}/>
      </Routes>
    </Router>
  );
}

export default App;