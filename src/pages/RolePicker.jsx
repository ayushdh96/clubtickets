import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, Lock, Sparkles } from 'lucide-react'
import { useLang } from '../context/LangContext'

export default function RolePicker() {
  const { t, lang, setLang } = useLang()
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Animated ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-[480px] h-[480px] rounded-full blur-[150px] animate-pulse"
          style={{ background: 'rgba(255,45,120,0.16)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/3 w-[360px] h-[360px] rounded-full blur-[130px] animate-pulse"
          style={{ background: 'rgba(255,215,0,0.10)', animationDelay: '1.5s' }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Lang toggle — top right */}
      <div className="absolute top-5 right-5 z-20 flex items-center rounded-full border border-white/20 overflow-hidden text-sm font-semibold">
        <button
          data-testid="lang-toggle-en"
          onClick={() => setLang('en')}
          className={`px-3 py-1.5 transition-all duration-200 ${
            lang === 'en'
              ? 'bg-[#ff2d78] text-white'
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
              ? 'bg-[#ff2d78] text-white'
              : 'text-white/50 hover:text-white'
          }`}
        >
          ES
        </button>
      </div>

      <div className="relative z-10 w-full max-w-lg text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-7 border border-[#ff2d78]/30"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#ff2d78]" />
          <span className="text-xs font-semibold text-[#ff2d78] uppercase tracking-[0.25em]">
            Michelle's Club
          </span>
        </motion.div>

        {/* Wordmark */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(3.5rem,12vw,7rem)] font-black uppercase leading-none tracking-tighter mb-4 bg-gradient-to-b from-white via-white to-white/30 bg-clip-text text-transparent"
        >
          Michelle's
        </motion.h1>

        {/* Gold rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-px w-28 mx-auto mb-5"
          style={{ background: 'linear-gradient(90deg, transparent, #ffd700, transparent)' }}
        />

        {/* Title */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="text-white/50 text-base font-light tracking-[0.2em] uppercase mb-10"
        >
          {t('role_title')}
        </motion.p>

        {/* Role cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* Guest */}
          <motion.button
            data-testid="guest-btn"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/events')}
            className="group flex flex-col items-center gap-4 glass rounded-3xl p-7 border border-white/10 hover:border-[#ff2d78]/50 transition-all duration-200 neon-glow"
            style={{ boxShadow: '0 0 32px rgba(255,45,120,0.2), 0 4px 24px rgba(0,0,0,0.4)' }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
              style={{ background: 'rgba(255,45,120,0.18)', border: '1px solid rgba(255,45,120,0.4)' }}
            >
              <Users className="w-7 h-7 text-[#ff2d78]" />
            </div>
            <div>
              <p className="font-black text-white text-base mb-1">{t('role_guest')}</p>
              <p className="text-white/35 text-xs leading-snug">{t('role_guest_sub')}</p>
            </div>
            <span className="text-xs font-bold text-[#ff2d78] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
              Enter →
            </span>
          </motion.button>

          {/* Owner — disabled */}
          <motion.div
            data-testid="owner-btn"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4 glass rounded-3xl p-7 border border-white/6 opacity-40 cursor-not-allowed"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <Lock className="w-7 h-7 text-white/40" />
            </div>
            <div>
              <p className="font-black text-white/60 text-base mb-1">{t('role_owner')}</p>
              <p className="text-white/25 text-xs leading-snug">{t('role_owner_sub')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
