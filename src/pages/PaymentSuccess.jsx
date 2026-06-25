import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowLeft } from 'lucide-react'
import { useLang } from '../context/LangContext'
import { useApp } from '../context/AppContext'

const COLORS = ['#ff2d78', '#ffd700', '#7c3aed', '#06b6d4', '#10b981', '#f97316', '#ec4899']

function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 48 }, (_, i) => (
        <div
          key={i}
          className="absolute top-0 animate-confetti"
          style={{
            left: `${(i * 2.08) % 100}%`,
            width: i % 5 === 0 ? 10 : i % 3 === 0 ? 7 : 5,
            height: i % 5 === 0 ? 10 : i % 4 === 0 ? 12 : 8,
            background: COLORS[i % COLORS.length],
            borderRadius: i % 3 === 0 ? '50%' : i % 5 === 0 ? '3px' : '1px',
            animationDelay: `${(i * 0.055) % 2.5}s`,
            animationDuration: `${2.0 + (i % 5) * 0.35}s`,
            opacity: 0.9,
          }}
        />
      ))}
    </div>
  )
}

let _orderId = null
function getOrderId() {
  if (!_orderId) _orderId = 'ORD-' + Math.random().toString(36).slice(2, 10).toUpperCase()
  return _orderId
}

export default function PaymentSuccess() {
  const { t } = useLang()
  const { cartTotal, tableNumber, clearCart } = useApp()
  const navigate = useNavigate()
  const clearedRef = useRef(false)
  const orderId = getOrderId()
  const displayTotal = cartTotal > 0 ? cartTotal.toFixed(2) : '—'

  useEffect(() => {
    if (!clearedRef.current) {
      clearedRef.current = true
      // Small delay so the total renders before clearing
      setTimeout(() => clearCart(), 300)
    }
  }, [clearCart])

  return (
    <div
      data-testid="payment-success"
      className="relative min-h-screen pt-20 flex items-center justify-center px-4 overflow-hidden"
    >
      <Confetti />

      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(255,45,120,0.14) 0%, transparent 65%)' }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="glass rounded-3xl p-8 max-w-sm w-full text-center relative z-10 my-10"
      >
        {/* Ring pulse animation */}
        <div className="relative flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [1.5, 1], opacity: [0.3, 0] }}
            transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
            className="absolute w-24 h-24 rounded-full"
            style={{ background: 'rgba(255,45,120,0.3)' }}
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.25 }}
            className="w-20 h-20 rounded-full flex items-center justify-center neon-glow"
            style={{ background: 'rgba(255,45,120,0.18)', border: '2px solid #ff2d78' }}
          >
            <CheckCircle2 className="w-10 h-10 text-[#ff2d78]" />
          </motion.div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-black mb-1"
        >
          {t('success_title')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="text-white/45 text-sm mb-8"
        >
          {t('success_subtitle')}
        </motion.p>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="space-y-0 mb-8"
        >
          {[
            { label: `${t('success_order_for')} ${t('success_table')}`, value: tableNumber, gold: false },
            { label: t('success_order_id'), value: orderId, mono: true },
            { label: t('success_amount'), value: `$${displayTotal}`, gold: true },
            { label: t('success_eta'), value: t('success_eta_value') },
          ].map(({ label, value, gold, mono }) => (
            <div
              key={label}
              className="flex justify-between items-center py-3 border-b border-white/8 last:border-0"
            >
              <span className="text-white/40 text-sm">{label}</span>
              <span
                className={`font-bold text-sm ${
                  gold ? 'text-[#ffd700]' : mono ? 'font-mono text-white/80' : 'text-white'
                }`}
              >
                {value}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-white/40 text-sm mb-6"
        >
          {t('success_cheers')}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          onClick={() => navigate('/events')}
          className="w-full flex items-center justify-center gap-2 glass border border-white/18 hover:border-[#ff2d78]/45 py-4 rounded-2xl font-semibold text-sm transition-all hover:scale-[1.02]"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('success_back')}
        </motion.button>
      </motion.div>
    </div>
  )
}
