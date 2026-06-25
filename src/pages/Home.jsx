import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Users, Sparkles, ArrowRight } from 'lucide-react'
import { useLang } from '../context/LangContext'

export default function Home() {
  const { t } = useLang()
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] animate-pulse"
          style={{ background: 'rgba(255,45,120,0.18)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] animate-pulse"
          style={{ background: 'rgba(255,215,0,0.1)', animationDelay: '1.2s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[100px] animate-pulse"
          style={{ background: 'rgba(124,58,237,0.12)', animationDelay: '2.4s' }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-20 text-center w-full">
        {/* Event badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8 border border-[#ff2d78]/30"
        >
          <Sparkles className="w-4 h-4 text-[#ff2d78]" />
          <span className="text-xs font-semibold text-[#ff2d78] uppercase tracking-[0.25em]">
            {t('home_event_label')}
          </span>
        </motion.div>

        {/* Club name */}
        <motion.h1
          data-testid="hero-heading"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(4rem,14vw,9rem)] font-black uppercase leading-none tracking-tighter mb-5 bg-gradient-to-b from-white via-white to-white/30 bg-clip-text text-transparent"
        >
          {t('home_club_name')}
        </motion.h1>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="h-px w-36 mx-auto mb-5"
          style={{ background: 'linear-gradient(90deg, transparent, #ffd700, transparent)' }}
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="text-base sm:text-lg text-white/50 font-light tracking-[0.3em] uppercase mb-12"
        >
          {t('home_tagline')}
        </motion.p>

        {/* Event details card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="glass rounded-3xl p-7 mb-10 max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,45,120,0.15)' }}>
                <Calendar className="w-5 h-5 text-[#ff2d78]" />
              </div>
              <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">{t('home_date_label')}</span>
              <span className="text-white font-semibold text-sm text-center">{t('home_event_date')}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,215,0,0.12)' }}>
                <Clock className="w-5 h-5 text-[#ffd700]" />
              </div>
              <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">{t('home_time_label')}</span>
              <span className="text-white font-semibold text-sm">{t('home_event_time')}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,45,120,0.15)' }}>
                <MapPin className="w-5 h-5 text-[#ff2d78]" />
              </div>
              <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">{t('home_venue_label')}</span>
              <span className="text-white font-semibold text-sm text-center">{t('home_event_venue')}</span>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/8 flex flex-wrap justify-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#ffd700]" />
              <span className="text-white/60 text-xs">
                <span className="text-[#ffd700] font-bold">{t('home_capacity')}</span>{' '}
                {t('home_capacity_label')}
              </span>
            </div>
            <span className="text-white/20 hidden sm:block">|</span>
            <span className="text-white/50 text-xs">{t('home_dress_code')}</span>
            <span className="text-white/20 hidden sm:block">|</span>
            <span className="text-white/50 text-xs">{t('home_age')}</span>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            data-testid="book-tickets-btn"
            onClick={() => navigate('/seats')}
            className="group flex items-center justify-center gap-3 bg-[#ff2d78] hover:bg-[#ff2d78]/90 text-white font-bold py-4 px-10 rounded-2xl text-base neon-glow transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_48px_rgba(255,45,120,0.75)]"
          >
            {t('home_cta')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            data-testid="checkin-nav-btn"
            onClick={() => navigate('/checkin')}
            className="flex items-center justify-center gap-2 glass border border-white/20 hover:border-[#ffd700]/50 text-white font-semibold py-4 px-10 rounded-2xl text-base transition-all duration-200 hover:scale-[1.03]"
          >
            {t('home_checkin_cta')}
          </button>
        </motion.div>
      </div>
    </div>
  )
}
