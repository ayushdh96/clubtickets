import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Users, Sparkles, ArrowRight, Music } from 'lucide-react'
import { useLang } from '../context/LangContext'

// Format date for display
function formatDate(date, lang) {
  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', opts)
}

function isToday(date) {
  const today = new Date()
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  )
}

export default function EventsPage() {
  const { t, lang } = useLang()
  const navigate = useNavigate()
  const [date, setDate] = useState(new Date())

  const prevDay = () => {
    const d = new Date(date)
    d.setDate(d.getDate() - 1)
    setDate(d)
  }

  const nextDay = () => {
    const d = new Date(date)
    d.setDate(d.getDate() + 1)
    setDate(d)
  }

  const today = isToday(date)

  return (
    <div className="min-h-screen pt-16 pb-12">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 rounded-full blur-[120px] opacity-20"
          style={{ background: '#ff2d78' }}
        />
        <div
          className="absolute bottom-0 right-0 w-72 h-72 rounded-full blur-[100px] opacity-12"
          style={{ background: '#ffd700' }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-4 relative z-10">
        {/* Date picker bar */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between glass rounded-2xl px-4 py-3 mt-4 mb-6 border border-white/8"
        >
          <button
            onClick={prevDay}
            data-testid="date-prev"
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white/60" />
          </button>

          <div className="text-center flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#ff2d78]" />
            <span
              data-testid="event-date"
              className="text-sm font-semibold text-white capitalize"
            >
              {formatDate(date, lang)}
            </span>
            {today && (
              <span className="text-[10px] font-bold bg-[#ff2d78] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                {t('events_tonight')}
              </span>
            )}
          </div>

          <button
            onClick={nextDay}
            data-testid="date-next"
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white/60" />
          </button>
        </motion.div>

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex items-center gap-3 mb-5"
        >
          <h1 className="text-2xl font-black uppercase tracking-tight">
            {t('events_title')}
          </h1>
          <div
            className="flex-1 h-px"
            style={{ background: 'linear-gradient(90deg,rgba(255,255,255,0.12),transparent)' }}
          />
        </motion.div>

        {/* Michelle's event card — always shown */}
        <motion.div
          data-testid="michelles-event-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-3xl overflow-hidden border border-white/8 hover:border-[#ff2d78]/30 transition-all duration-300 mb-5 group"
          style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.45)' }}
        >
          {/* Card header gradient */}
          <div
            className="relative h-36 flex items-end p-6"
            style={{
              background: 'linear-gradient(135deg, #1a0010 0%, #2d0020 40%, #0f0008 100%)',
            }}
          >
            {/* Neon lines decoration */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-40 group-hover:opacity-60 transition-opacity"
                style={{ background: '#ff2d78', transform: 'translate(30%,-30%)' }}
              />
              <div
                className="absolute bottom-0 left-0 w-40 h-40 rounded-full blur-[60px] opacity-25"
                style={{ background: '#ffd700', transform: 'translate(-30%,30%)' }}
              />
            </div>

            {/* Tonight badge */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-[#ff2d78] text-white px-3 py-1 rounded-full uppercase tracking-[0.2em]">
                <Sparkles className="w-3 h-3" />
                {t('events_tonight')}
              </span>
            </div>

            {/* Music icon */}
            <div className="absolute top-4 right-4">
              <Music className="w-5 h-5 text-white/20" />
            </div>

            {/* Club name in card */}
            <div className="relative z-10">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white leading-none mb-1">
                Michelle's
              </h2>
              <p className="text-white/40 text-xs font-light tracking-[0.25em] uppercase">
                {t('events_genre')}
              </p>
            </div>
          </div>

          {/* Card body */}
          <div className="p-5">
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#ff2d78]" />
                  <span className="text-white/35 text-[10px] uppercase tracking-wider font-semibold">Time</span>
                </div>
                <span className="text-white text-sm font-semibold">10PM – 4AM</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#ffd700]" />
                  <span className="text-white/35 text-[10px] uppercase tracking-wider font-semibold">Venue</span>
                </div>
                <span className="text-white text-sm font-semibold">25 Marquee Ln</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#a78bfa]" />
                  <span className="text-white/35 text-[10px] uppercase tracking-wider font-semibold">Cap.</span>
                </div>
                <span className="text-white text-sm font-semibold">200</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {['21+', 'Upscale', 'LA'].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold text-white/50 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <button
              data-testid="select-venue-btn"
              onClick={() => navigate('/home')}
              className="w-full flex items-center justify-center gap-2 bg-[#ff2d78] hover:bg-[#ff2d78]/90 text-white font-bold py-3.5 rounded-2xl text-sm neon-glow transition-all hover:scale-[1.02] group"
            >
              {t('events_select')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* "Always on the list" note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/20 text-xs"
        >
          {t('events_always_on')}
        </motion.p>
      </div>
    </div>
  )
}
