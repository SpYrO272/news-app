import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/themeSlice';
import { toggleLanguage } from '../features/languageSlice';
import type { RootState } from '../app/store';
import './Header.css';

export default function Header() {
  const dispatch = useDispatch();
  const { lang } = useSelector((state: RootState) => state.language);
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <header className={`main-header border-bottom ${theme === 'dark' ? 'bg-dark text-light border-secondary' : 'bg-white text-dark'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container py-4 d-flex justify-content-between align-items-center">
        
  
        <h1 className="logo-text m-0">NEWS<span className="fw-light">VERSE</span></h1>
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn-control theme-toggle"
            onClick={() => dispatch(toggleTheme())}
            title="Toggle Theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <button 
            onClick={() => dispatch(toggleLanguage())} 
            className="btn-toggle-lang"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
          
        </div>
      </div>
    </header>
  );
}