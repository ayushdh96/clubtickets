import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, CreditCard } from 'lucide-react'
import { useLang } from '../context/LangContext'
import { useApp } from '../context/AppContext'

function formatCardNum(value) {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length >= 3) return `${digits.slice(0, 2)} / ${digits.slice(2)}`
  if (digits.length === 2) return `${digits} / `
  return digits
}

export default function Payment() {
  const { t } = useLang()
  const { cartTotal, tableNumber } = useApp()
  const navigate = useNavigate()

  const [cardNum, setCardNum] = useState('')
  const [cardName, setCardName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [processing, setProcessing] = useState(false)

  const handlePay = () => {
    setProcessing(true)
    setTimeout(() => navigate('/payment-success'), 1800)
  }

  const displayNum = cardNum || '•••• •••• •••• ••••'
  const displayName = cardName || 'YOUR NAME'
  const displayExpiry = expiry || 'MM/YY'

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full blur-[140px] opacity-15"
          style={{ background: '#ff2d78' }}
        />
      </div>

      <div className="max-w-md mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8"
        >
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-1">
            {t('payment_title')}
          </h1>
          <p className="text-white/40 text-sm">
            {t('payment_subtitle')} —{' '}
            <span className="text-[#ff2d78] font-semibold">
              {t('payment_table')} {tableNumber}
            </span>
          </p>
        </motion.div>

        {/* Credit card visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="relative h-52 rounded-3xl overflow-hidden mb-8 select-none"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* Holographic overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{ background: 'linear-gradient(135deg, rgba(255,45,120,0.3), transparent 50%, rgba(255,215,0,0.2))' }}
          />
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10" style={{ background: '#7c3aed' }} />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10" style={{ background: '#06b6d4' }} />

          {/* Chip */}
          <div className="absolute top-8 left-7">
            <div
              className="w-10 h-7 rounded-md grid grid-cols-2 gap-0.5 p-1"
              style={{ background: 'linear-gradient(135deg, #ffd700, #d4a800)' }}
            >
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="rounded-sm" style={{ background: 'rgba(0,0,0,0.25)' }} />
              ))}
            </div>
          </div>

          {/* Network mark */}
          <div className="absolute top-7 right-7 flex">
            <div className="w-8 h-8 rounded-full opacity-80" style={{ background: '#ef4444', marginRight: '-10px' }} />
            <div className="w-8 h-8 rounded-full opacity-80" style={{ background: '#fbbf24' }} />
          </div>

          {/* Card number */}
          <div className="absolute bottom-16 left-7 right-7">
            <p className="text-white font-mono text-lg tracking-[0.18em] text-shadow">
              {displayNum}
            </p>
          </div>

          {/* Name & expiry */}
          <div className="absolute bottom-6 left-7 right-7 flex justify-between items-end">
            <p className="text-white/75 text-xs font-light tracking-widest uppercase">
              {displayName}
            </p>
            <p className="text-white/75 text-xs font-light tracking-wider">{displayExpiry}</p>
          </div>

          {/* Michelle's watermark */}
          <div className="absolute right-7 top-1/2 -translate-y-1/2">
            <p className="font-black italic text-white/8 text-5xl">M</p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass rounded-3xl p-6 mb-5"
        >
          <div className="space-y-4">
            {/* Card number */}
            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                {t('payment_card_number')}
              </label>
              <input
                data-testid="card-number-input"
                type="text"
                value={cardNum}
                onChange={(e) => setCardNum(formatCardNum(e.target.value))}
                placeholder={t('payment_card_placeholder')}
                className="w-full bg-white/6 border border-white/12 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm font-mono focus:outline-none focus:border-[#ff2d78]/60 transition-colors"
              />
            </div>

            {/* Cardholder */}
            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                {t('payment_cardholder')}
              </label>
              <input
                data-testid="card-name-input"
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value.toUpperCase().slice(0, 26))}
                placeholder={t('payment_name_placeholder')}
                className="w-full bg-white/6 border border-white/12 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#ff2d78]/60 transition-colors"
              />
            </div>

            {/* Expiry + CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                  {t('payment_expiry')}
                </label>
                <input
                  data-testid="card-expiry-input"
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  placeholder={t('payment_expiry_placeholder')}
                  className="w-full bg-white/6 border border-white/12 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm font-mono focus:outline-none focus:border-[#ff2d78]/60 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                  {t('payment_cvv')}
                </label>
                <input
                  data-testid="card-cvv-input"
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder={t('payment_cvv_placeholder')}
                  className="w-full bg-white/6 border border-white/12 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm font-mono focus:outline-none focus:border-[#ff2d78]/60 transition-colors"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Alt pay buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mb-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs">{t('payment_or')}</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[t('payment_apple'), t('payment_google')].map((label) => (
              <button
                key={label}
                className="glass border border-white/15 hover:border-white/30 py-3 rounded-xl text-white/70 hover:text-white text-sm font-semibold transition-all"
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Pay now */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            data-testid="pay-now-btn"
            onClick={handlePay}
            disabled={processing}
            className="w-full relative bg-[#ff2d78] hover:bg-[#ff2d78]/90 disabled:opacity-70 text-white font-black py-4 rounded-2xl neon-glow transition-all hover:scale-[1.02] text-sm overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {processing ? (
                <motion.span
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2"
                >
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeDashoffset="15" />
                  </svg>
                  {t('payment_processing')}
                </motion.span>
              ) : (
                <motion.span
                  key="pay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  {t('payment_pay_now')} — ${cartTotal > 0 ? cartTotal.toFixed(2) : '0.00'}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <div className="flex items-center justify-center gap-1.5 mt-3">
            <Lock className="w-3 h-3 text-white/25" />
            <p className="text-white/25 text-[10px] font-medium tracking-wide">{t('payment_secure')}</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
