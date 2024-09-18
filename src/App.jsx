import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

import Header from './views/layouts/Header';
import Submenu from './views/partials/Submenu';
import Footer from './views/layouts/Footer';
import Loader from './views/partials/Loader'

// Lazy load components
const Home = lazy(() => import('./views/layouts/Home'));
const About = lazy(() => import('./views/layouts/About'));
const Blog = lazy(() => import('./views/layouts/Blog'));
const Contact = lazy(() => import('./views/layouts/Contact'));
const Register = lazy(() => import('./views/layouts/Signup'));
const Login = lazy(() => import('./views/layouts/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const MainEditorPage = lazy(() => import('./blogger/MainEditorPage'));
const PreviewPage = lazy(() => import('./blogger/PreviewPage'));
const PostsList = lazy(() => import('./blogger/PostsList'));
const OAuth = lazy(() => import('./views/partials/OAuth'));

// CSS files for styling
import './App.css';
import './assets/style/style.css';
import './assets/style/media.css';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI on next render
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log the error to an error tracking service (e.g., Sentry)
    console.error("Error caught by Error Boundary:", error, info);
  }

  componentDidUpdate(prevProps) {
    // Reset error boundary when navigating to new content
    if (this.state.hasError && prevProps.children !== this.props.children) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }
    return this.props.children;
  }
}

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
        
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
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
          </Suspense>
        </ErrorBoundary>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
