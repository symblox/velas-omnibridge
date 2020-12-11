import React, { useState, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import enUs from '../language/enUs';
import zhCn from '../language/zhCn';

import { languageOptions } from '../lib/constants';

export const LanguageContext = React.createContext({});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(languageOptions[1]); //default en
  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.indexOf('cn') >= 0 || browserLang.indexOf('zh') >= 0) {
      setLanguage(languageOptions[0]);
    } else {
      setLanguage(languageOptions[1]);
    }
  }, [setLanguage]);
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      <IntlProvider
        locale={'en'}
        messages={language.key === 'cn' ? zhCn : enUs}
      >
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};
