import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useLang } from '../context/LangContext'
import { useApp } from '../context/AppContext'

export default function Navbar() {
  const { lang, setLang, t } = useLang()
  const { cartCount } = useApp()
  const location = useLocation()

  // Hide navbar on role picker — it has its own minimal header
  if (location.pathname === '/') return null

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/events" className="flex items-center gap-2">
          <span className="text-xl font-black tracking-widest uppercase bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Michelle's
          </span>
          <span className="hidden sm:block text-[10px] font-semibold text-[#ff2d78] tracking-[0.3em] uppercase mt-1">
            Club
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {/* Cart icon */}
          <Link
            to="/cart"
            className="relative p-1"
            data-testid="cart-badge-link"
          >
            <ShoppingCart className="w-5 h-5 text-white/70 hover:text-white transition-colors" />
            {cartCount > 0 && (
              <span
                data-testid="cart-badge"
                className="absolute -top-1.5 -right-1.5 bg-[#ff2d78] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold neon-glow"
              >
                {cartCount}
              </span>
            )}
          </Link>

          {/* Language toggle */}
          <div className="flex items-center rounded-full border border-white/20 overflow-hidden text-sm font-semibold">
            <button
              data-testid="lang-toggle-en"
              onClick={() => setLang('en')}
              className={`px-3 py-1.5 transition-all duration-200 ${
                lang === 'en'
                  ? 'bg-[#ff2d78] text-white shadow-[0_0_10px_rgba(255,45,120,0.6)]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              data-testid="lang-toggle-es"
              onClick={() => setLang('es')}
              className={`px-3 py-1.5 transition-all duration-200 ${
                lang === 'es'
                  ? 'bg-[#ff2d78] text-white shadow-[0_0_10px_rgba(255,45,120,0.6)]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              ES
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
