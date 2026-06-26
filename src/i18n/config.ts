export type LangCode = 'hi' | 'en' | 'bn' | 'te' | 'mr' | 'ta' | 'gu' | 'kn' | 'ml' | 'or' | 'pa' | 'ur' | 'as';

export interface LanguageConfig {
  code: LangCode;
  name: string;        // English name
  nativeName: string;  // Name in native script
  dir: 'ltr' | 'rtl';
  fontFamily?: string;
}

export const languages: LanguageConfig[] = [
  { code: 'hi', name: 'Hindi',      nativeName: 'हिन्दी',       dir: 'ltr' },
  { code: 'en', name: 'English',    nativeName: 'English',     dir: 'ltr' },
  { code: 'bn', name: 'Bengali',    nativeName: 'বাংলা',        dir: 'ltr' },
  { code: 'te', name: 'Telugu',     nativeName: 'తెలుగు',       dir: 'ltr' },
  { code: 'mr', name: 'Marathi',    nativeName: 'मराठी',        dir: 'ltr' },
  { code: 'ta', name: 'Tamil',      nativeName: 'தமிழ்',       dir: 'ltr' },
  { code: 'gu', name: 'Gujarati',   nativeName: 'ગુજરાતી',      dir: 'ltr' },
  { code: 'kn', name: 'Kannada',    nativeName: 'ಕನ್ನಡ',        dir: 'ltr' },
  { code: 'ml', name: 'Malayalam',  nativeName: 'മലയാളം',     dir: 'ltr' },
  { code: 'or', name: 'Odia',       nativeName: 'ଓଡ଼ିଆ',        dir: 'ltr' },
  { code: 'pa', name: 'Punjabi',    nativeName: 'ਪੰਜਾਬੀ',      dir: 'ltr' },
  { code: 'ur', name: 'Urdu',       nativeName: 'اردو',         dir: 'rtl' },
  { code: 'as', name: 'Assamese',   nativeName: 'অসমীয়া',      dir: 'ltr' },
];

export const defaultLang: LangCode = 'en';

export const fontMap: Record<string, string> = {
  hi: "'Noto Sans Devanagari', sans-serif",
  mr: "'Noto Sans Devanagari', sans-serif",
  bn: "'Noto Sans Bengali', sans-serif",
  as: "'Noto Sans Bengali', sans-serif",
  ta: "'Noto Sans Tamil', sans-serif",
  te: "'Noto Sans Telugu', sans-serif",
  gu: "'Noto Sans Gujarati', sans-serif",
  kn: "'Noto Sans Kannada', sans-serif",
  ml: "'Noto Sans Malayalam', sans-serif",
  or: "'Noto Sans Oriya', sans-serif",
  pa: "'Noto Sans Gurmukhi', sans-serif",
  ur: "'Noto Nastaliq Urdu', sans-serif",
};
