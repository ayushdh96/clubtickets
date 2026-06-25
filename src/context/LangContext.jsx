import React, { createContext, useContext, useState } from 'react'
import translations from '../i18n/translations'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('michelles_lang') || 'en'
    } catch {
      return 'en'
    }
  })

  const handleSetLang = (newLang) => {
    setLang(newLang)
    try {
      localStorage.setItem('michelles_lang', newLang)
    } catch {}
  }

  const t = (key) => translations[lang][key] ?? translations['en'][key] ?? key

  return (
    <LangContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
