import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'
import { useApp } from '../context/AppContext'

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
const COLS = 20
const SEAT_PRICE = 45

// Deterministic taken seats (~30 out of 200)
const TAKEN = new Set([
  2, 5, 8, 15, 19, 23, 27, 31, 35,
  38, 42, 46, 50, 54, 62, 66, 70,
  74, 78, 82, 90, 94, 98, 102, 109,
  116, 131, 148, 162, 177,
])

export default function SeatSelection() {
  const { t } = useLang()
  const { selectedSeats, setSelectedSeats } = useApp()
  const navigate = useNavigate()

  const toggleSeat = (id) => {
    if (TAKEN.has(id)) return
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const handleConfirm = () => {
    if (selectedSeats.length === 0) return
    navigate('/booking-confirmed')
  }

  const total = selectedSeats.length * SEAT_PRICE

  return (
    <div className="min-h-screen pt-20 pb-36">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-30"
          style={{ background: '#ff2d78' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-2">
            {t('seats_title')}
          </h1>
          <p className="text-white/40 text-sm">{t('seats_subtitle')}</p>
        </motion.div>

        {/* Legend */}
        <div className="flex items-center justify-center flex-wrap gap-4 mb-6">
          {[
            { label: t('seats_available'), cls: 'bg-white/8 border-white/20' },
            { label: t('seats_taken'), cls: 'bg-red-900/50 border-red-700/40' },
            { label: t('seats_selected'), cls: 'bg-[#ff2d78] border-[#ff2d78]' },
          ].map(({ label, cls }) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-sm border ${cls}`} />
              <span className="text-xs text-white/50">{label}</span>
            </div>
          ))}
        </div>

        {/* Stage */}
        <div className="flex justify-center mb-4">
          <div
            className="glass border rounded-xl px-14 py-2 text-[#ffd700] text-xs font-bold tracking-[0.2em]"
            style={{ borderColor: 'rgba(255,215,0,0.3)' }}
          >
            {t('seats_stage')}
          </div>
        </div>

        {/* Seat grid */}
        <div className="overflow-x-auto pb-4">
          <div className="min-w-max mx-auto px-2">
            {ROWS.map((row, rowIdx) => (
              <div key={row} className="flex items-center gap-1 mb-1">
                <span className="text-white/25 text-xs w-5 text-right mr-1 flex-shrink-0">{row}</span>
                {Array.from({ length: COLS }, (_, colIdx) => {
                  const id = rowIdx * COLS + colIdx + 1
                  const isTaken = TAKEN.has(id)
                  const isSelected = selectedSeats.includes(id)
                  return (
                    <motion.button
                      key={id}
                      whileTap={!isTaken ? { scale: 0.8 } : {}}
                      onClick={() => toggleSeat(id)}
                      disabled={isTaken}
                      data-seat-status={isTaken ? 'taken' : isSelected ? 'selected' : 'available'}
                      className={`w-6 h-6 rounded-sm text-[9px] font-bold transition-all border flex items-center justify-center ${
                        isTaken
                          ? 'bg-red-900/40 border-red-700/30 cursor-not-allowed'
                          : isSelected
                          ? 'bg-[#ff2d78] border-[#ff2d78] shadow-[0_0_6px_rgba(255,45,120,0.8)] text-white'
                          : 'bg-white/5 border-white/10 hover:bg-white/15 hover:border-white/30 cursor-pointer'
                      }`}
                    >
                      {isSelected ? '✓' : null}
                    </motion.button>
                  )
                })}
                <span className="text-white/25 text-xs w-5 ml-1 flex-shrink-0">{row}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky booking bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 glass border-t border-white/10 px-5 py-4 z-40"
      >
        <div className="max-w-lg mx-auto flex items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-white/40 text-sm">{t('seats_count')}:</span>
              <span
                data-testid="seat-count"
                className="text-white font-black text-xl"
              >
                {selectedSeats.length}
              </span>
            </div>
            <p className="text-[#ffd700] font-bold text-lg">
              {t('seats_total')}: ${total}
            </p>
            <p className="text-white/30 text-xs">{t('seats_price_per')}</p>
          </div>
          <button
            data-testid="confirm-booking-btn"
            onClick={handleConfirm}
            disabled={selectedSeats.length === 0}
            className={`flex-shrink-0 font-bold py-3.5 px-8 rounded-2xl text-sm transition-all duration-200 ${
              selectedSeats.length > 0
                ? 'bg-[#ff2d78] text-white neon-glow hover:scale-105'
                : 'bg-white/8 text-white/25 cursor-not-allowed'
            }`}
          >
            {t('seats_confirm')}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
