import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import Header from './views/layouts/Header'
import Submenu from './views/partials/Submenu';
import Home from './views/layouts/Home';
import About from './views/layouts/About';
import Blog from './views/layouts/Blog';
import Contact from './views/layouts/Contact'
import Register from './views/layouts/Signup';
import Login from './views/layouts/Login'
import Footer from './views/layouts/Footer';
import Dashboard from './pages/Dashboard';
import MainEditorPage from './pages/Blogger/MainEditorPage';
import PreviewPage from './pages/Blogger/PreviewPage';
import PostsList from './pages/Blogger/PostsList';
import OAuth from './views/partials/OAuth';
 //css file for styling
import './assets/style/style.css' 
import './assets/style/media.css' 
// import dayModeSound from './assets/system-sound/daytoggle.mp3';
// import nightModeSound from './assets/system-sound/nighttoggle.mp3';

const App = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    playModeSound(newTheme);
  };

  const playModeSound = (theme) => {
    const audio = new Audio(theme === 'light' ? dayModeSound : nightModeSound);
    audio.play();
  };

  return (
    <Router>
      <div className="app-container">
        <Header />
        <Submenu isNightMode={theme === 'dark'} onToggle={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blogger" element={<MainEditorPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/postsList" element={<PostsList />} />
          <Route path="/oauth" element={<OAuth />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
