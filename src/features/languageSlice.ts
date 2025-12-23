import { createSlice } from '@reduxjs/toolkit';

interface LanguageState {
  lang: 'en' | 'ar';
}

const savedLang = (localStorage.getItem('lang') as 'en' | 'ar') || 'en';

document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';

const initialState: LanguageState = {
  lang: savedLang,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    toggleLanguage(state) {
      state.lang = state.lang === 'en' ? 'ar' : 'en';
      localStorage.setItem('lang', state.lang);
      
      document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
    },
  },
});

export const { toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;