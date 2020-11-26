import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import enUs from '../language/enUs';
import zhCn from '../language/zhCn';

import { languageOptions } from '../lib/constants';

export const LanguageContext = React.createContext({});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(languageOptions[0]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      <IntlProvider
        locale={'en'}
        messages={language.value === '中文' ? zhCn : enUs}
      >
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};
