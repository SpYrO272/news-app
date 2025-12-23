import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store } from './app/store';
import Header from './components/Header';
import NewsList from './pages/NewsList';
import PostDetails from './pages/PostDetails';
import type { RootState } from './app/store';
import './App.css';

// We create a separate component to access Redux state
function AppContent() {
  const { theme } = useSelector((state: RootState) => state.theme);
  const { lang } = useSelector((state: RootState) => state.language);

  // Sync theme class to the body for global background color transitions
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div 
      className={`app-container min-vh-100 page-wrapper ${theme}`} 
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<NewsList />} />
            <Route path="/post/:id" element={<PostDetails />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}