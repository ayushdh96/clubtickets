import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowLeft } from 'lucide-react'
import { useLang } from '../context/LangContext'
import { useApp } from '../context/AppContext'

// Deterministic fake QR — static 21×21 matrix
const QR = [
  [1,1,1,1,1,1,1,0,1,0,1,1,0,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,0,1,1,0,1,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,0,0,1,0,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,0,1,1,0,1,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,1,0,0,1,0,1,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,0,1,1,0,1,0,1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0],
  [1,0,1,1,0,0,1,1,0,1,0,0,0,1,0,1,1,0,1,0,1],
  [0,1,0,0,1,1,0,0,1,0,1,1,0,0,1,1,0,0,1,1,0],
  [1,1,0,1,0,1,1,0,0,1,0,1,1,0,0,1,0,1,0,0,1],
  [0,0,1,0,1,0,0,1,1,0,1,0,0,1,1,0,1,0,1,1,0],
  [1,0,0,1,1,0,1,0,0,1,0,1,0,0,1,1,0,1,0,1,1],
  [0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,0,1,0,1,0,0],
  [1,1,1,1,1,1,1,0,0,1,0,0,1,0,1,1,0,1,0,0,1],
  [1,0,0,0,0,0,1,0,1,0,1,0,0,1,0,1,1,0,1,1,0],
  [1,0,1,1,1,0,1,0,0,1,0,1,1,0,1,0,0,1,0,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,0,0,1,0,1,1,0,1,0,0],
  [1,0,1,1,1,0,1,0,0,1,0,1,0,0,1,0,0,1,0,1,1],
  [1,0,0,0,0,0,1,0,1,1,0,0,1,0,0,1,0,0,1,0,0],
  [1,1,1,1,1,1,1,0,0,0,1,1,0,1,1,0,1,1,0,1,1],
]

function FakeQR() {
  return (
    <div className="bg-white p-3 rounded-xl inline-block">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(21, 6px)', gap: '1px' }}>
        {QR.flat().map((cell, i) => (
          <div
            key={i}
            style={{ width: 6, height: 6, background: cell ? '#000' : '#fff' }}
          />
        ))}
      </div>
    </div>
  )
}

function Confetti() {
  const COLORS = ['#ff2d78', '#ffd700', '#7c3aed', '#06b6d4', '#10b981', '#f97316']
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 36 }, (_, i) => (
        <div
          key={i}
          className="absolute top-0 animate-confetti"
          style={{
            left: `${(i * 2.78) % 100}%`,
            width: i % 3 === 0 ? 8 : 6,
            height: i % 3 === 0 ? 8 : 10,
            background: COLORS[i % COLORS.length],
            borderRadius: i % 4 === 0 ? '50%' : '2px',
            animationDelay: `${(i * 0.09) % 2.4}s`,
            animationDuration: `${2.2 + (i % 4) * 0.4}s`,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  )
}

let _cachedRef = null
function getBookingRef() {
  if (!_cachedRef) {
    _cachedRef = 'MCH-' + Math.random().toString(36).slice(2, 10).toUpperCase()
  }
  return _cachedRef
}

export default function BookingConfirmed() {
  const { t } = useLang()
  const { selectedItems, bookingTotal } = useApp()
  const navigate = useNavigate()
  const bookingRef = getBookingRef()

  useEffect(() => {
    if (selectedItems.length === 0) navigate('/events')
  }, [selectedItems, navigate])

  const selectionLabels = selectedItems
    .slice(0, 6)
    .map((i) => i.label)
    .join(', ') + (selectedItems.length > 6 ? ` +${selectedItems.length - 6}` : '')

  return (
    <div className="relative min-h-screen pt-20 flex items-center justify-center px-4 overflow-hidden">
      <Confetti />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(255,45,120,0.12) 0%, transparent 70%)' }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        data-testid="booking-summary"
        className="glass rounded-3xl p-8 max-w-md w-full relative z-10 my-8"
      >
        {/* Check icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.3 }}
          className="flex justify-center mb-6"
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center neon-glow"
            style={{ background: 'rgba(255,45,120,0.15)', border: '2px solid #ff2d78' }}
          >
            <CheckCircle2 className="w-10 h-10 text-[#ff2d78]" />
          </div>
        </motion.div>

        <h1 className="text-3xl font-black text-center mb-1">{t('booking_confirmed_title')}</h1>
        <p className="text-white/45 text-center text-sm mb-8">{t('booking_confirmed_subtitle')}</p>

        {/* Details */}
        <div className="space-y-0 mb-8">
          {[
            { label: t('booking_ref'), value: bookingRef, gold: true },
            { label: t('booking_date_label'), value: t('booking_date_value') },
            { label: t('booking_seats_label'), value: selectionLabels || '—' },
            { label: t('booking_total_label'), value: `$${bookingTotal}`, gold: true },
          ].map(({ label, value, gold }) => (
            <div
              key={label}
              className="flex justify-between items-center py-3.5 border-b border-white/8 last:border-0"
            >
              <span className="text-white/45 text-sm">{label}</span>
              <span className={`font-bold text-sm ${gold ? 'text-[#ffd700]' : 'text-white'}`}>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Fake QR code */}
        <div className="flex flex-col items-center mb-8">
          <FakeQR />
          <p className="text-white/30 text-xs mt-3 text-center">{t('booking_qr_hint')}</p>
        </div>

        <button
          onClick={() => navigate('/events')}
          className="w-full flex items-center justify-center gap-2 glass border border-white/20 hover:border-[#ff2d78]/50 py-4 rounded-2xl font-semibold text-sm transition-all hover:scale-[1.02]"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('booking_back_home')}
        </button>
      </motion.div>
    </div>
  )
}
