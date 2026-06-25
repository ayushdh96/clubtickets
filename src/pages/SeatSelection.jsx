import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Crown, Users, Dot } from 'lucide-react'
import { useLang } from '../context/LangContext'
import { useApp } from '../context/AppContext'

// ─── Venue data ───────────────────────────────────────────────────────────────
const VIP_PRICE = 680
const TABLE_PRICE = 220
const SPOT_PRICE = 45
const FLOOR_ROWS = 8
const FLOOR_COLS = 10

const VIP_LEFT = [
  { id: 'vip-l1', num: 'V1' },
  { id: 'vip-l2', num: 'V2' },
  { id: 'vip-l3', num: 'V3' },
  { id: 'vip-l4', num: 'V4' },
]

const VIP_RIGHT = [
  { id: 'vip-r1', num: 'V5' },
  { id: 'vip-r2', num: 'V6' },
  { id: 'vip-r3', num: 'V7' },
  { id: 'vip-r4', num: 'V8' },
]

const REGULAR = Array.from({ length: 8 }, (_, i) => ({
  id: `reg-${i + 1}`,
  num: `T${i + 1}`,
}))

// Pre-occupied
const TAKEN_TABLES = new Set(['vip-l2', 'vip-r3', 'reg-3', 'reg-6'])
const TAKEN_SPOTS = new Set(['0-1', '0-5', '1-3', '1-8', '2-2', '2-6', '3-0', '3-4', '3-9', '4-1', '5-5', '6-3', '7-7'])

// ─── Sub-components ────────────────────────────────────────────────────────────
function VipCard({ table, selected, taken, onClick, t }) {
  return (
    <motion.button
      whileHover={!taken ? { scale: 1.04 } : {}}
      whileTap={!taken ? { scale: 0.97 } : {}}
      onClick={!taken ? onClick : undefined}
      disabled={taken}
      data-seat-status={taken ? 'taken' : selected ? 'selected' : 'available'}
      className={`relative w-full rounded-2xl p-3 text-left transition-all duration-200 ${
        taken
          ? 'opacity-40 cursor-not-allowed'
          : selected
          ? 'cursor-pointer'
          : 'cursor-pointer hover:border-[#ffd700]/50'
      }`}
      style={
        selected
          ? {
              background: 'linear-gradient(135deg, rgba(255,215,0,0.18), rgba(255,215,0,0.06))',
              border: '1px solid rgba(255,215,0,0.7)',
              boxShadow: '0 0 18px rgba(255,215,0,0.45), 0 4px 16px rgba(0,0,0,0.4)',
            }
          : taken
          ? {
              background: 'rgba(220,38,38,0.1)',
              border: '1px solid rgba(220,38,38,0.3)',
            }
          : {
              background: 'rgba(255,215,0,0.05)',
              border: '1px solid rgba(255,215,0,0.2)',
            }
      }
    >
      {taken && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl">
          <span className="text-red-400/70 text-[10px] font-bold tracking-widest uppercase">
            {t('seats_taken')}
          </span>
        </div>
      )}
      <div className={`flex items-center gap-1.5 mb-2 ${taken ? 'opacity-20' : ''}`}>
        <Crown className={`w-3.5 h-3.5 ${selected ? 'text-[#ffd700]' : 'text-[#ffd700]/60'}`} />
        <span className={`text-xs font-black tracking-wider ${selected ? 'text-[#ffd700]' : 'text-[#ffd700]/70'}`}>
          {table.num}
        </span>
      </div>
      <p className={`text-[11px] font-black ${selected ? 'text-white' : 'text-white/50'} ${taken ? 'opacity-20' : ''}`}>
        {t('seats_vip_price')}
        <span className="font-normal text-white/30 ml-0.5">{t('seats_per_booking')}</span>
      </p>
      <p className={`text-[10px] mt-0.5 ${selected ? 'text-white/50' : 'text-white/25'} ${taken ? 'opacity-20' : ''}`}>
        {t('seats_vip_capacity')}
      </p>
    </motion.button>
  )
}

function TableCard({ table, selected, taken, onClick, t }) {
  return (
    <motion.button
      whileHover={!taken ? { scale: 1.04 } : {}}
      whileTap={!taken ? { scale: 0.97 } : {}}
      onClick={!taken ? onClick : undefined}
      disabled={taken}
      data-seat-status={taken ? 'taken' : selected ? 'selected' : 'available'}
      className={`relative rounded-2xl p-3 text-left transition-all duration-200 ${
        taken ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
      }`}
      style={
        selected
          ? {
              background: 'linear-gradient(135deg, rgba(255,45,120,0.22), rgba(255,45,120,0.07))',
              border: '1px solid rgba(255,45,120,0.7)',
              boxShadow: '0 0 16px rgba(255,45,120,0.5), 0 4px 14px rgba(0,0,0,0.4)',
            }
          : taken
          ? {
              background: 'rgba(220,38,38,0.1)',
              border: '1px solid rgba(220,38,38,0.3)',
            }
          : {
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
            }
      }
    >
      {taken && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl">
          <span className="text-red-400/70 text-[10px] font-bold tracking-widest uppercase">
            {t('seats_taken')}
          </span>
        </div>
      )}
      <div className={`flex items-center gap-1.5 mb-1.5 ${taken ? 'opacity-20' : ''}`}>
        <Users className={`w-3 h-3 ${selected ? 'text-[#ff2d78]' : 'text-white/40'}`} />
        <span className={`text-xs font-black ${selected ? 'text-[#ff2d78]' : 'text-white/60'}`}>
          {table.num}
        </span>
      </div>
      <p className={`text-[11px] font-black ${selected ? 'text-white' : 'text-white/50'} ${taken ? 'opacity-20' : ''}`}>
        {t('seats_table_price')}
        <span className="font-normal text-white/30 ml-0.5">{t('seats_per_booking')}</span>
      </p>
      <p className={`text-[10px] mt-0.5 ${selected ? 'text-white/40' : 'text-white/20'} ${taken ? 'opacity-20' : ''}`}>
        {t('seats_table_capacity')}
      </p>
    </motion.button>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function SeatSelection() {
  const { t } = useLang()
  const { selectedItems, toggleItem, bookingTotal } = useApp()
  const navigate = useNavigate()

  const isSelected = (id) => selectedItems.some((i) => i.id === id)

  const handleVip = (table) =>
    toggleItem({ id: table.id, type: 'vip', label: table.num, price: VIP_PRICE })

  const handleTable = (table) =>
    toggleItem({ id: table.id, type: 'table', label: table.num, price: TABLE_PRICE })

  const handleSpot = (r, c) => {
    const id = `spot-${r}-${c}`
    const col = String.fromCharCode(65 + c)
    toggleItem({ id, type: 'standing', label: `F${r + 1}${col}`, price: SPOT_PRICE })
  }

  return (
    <div className="min-h-screen pt-20 pb-36">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[130px] opacity-20" style={{ background: '#ffd700' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[110px] opacity-15" style={{ background: '#ff2d78' }} />
      </div>

      <div className="max-w-5xl mx-auto px-3 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-2">{t('seats_title')}</h1>
          <p className="text-white/40 text-sm">{t('seats_subtitle')}</p>
        </motion.div>

        {/* Pricing legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 mb-6"
        >
          {[
            { icon: <Crown className="w-3.5 h-3.5" />, label: t('seats_vip_section'), price: t('seats_vip_price'), color: '#ffd700' },
            { icon: <Users className="w-3.5 h-3.5" />, label: t('seats_table_section'), price: t('seats_table_price'), color: '#ff2d78' },
            { icon: <Dot className="w-3.5 h-3.5" />, label: t('seats_standing_capacity'), price: t('seats_standing_price'), color: '#a78bfa' },
          ].map(({ icon, label, price, color }) => (
            <div
              key={label}
              className="flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs border border-white/8"
            >
              <span style={{ color }}>{icon}</span>
              <span className="text-white/60">{label}</span>
              <span className="font-bold" style={{ color }}>{price}</span>
            </div>
          ))}
        </motion.div>

        {/* ── VENUE WRAPPER ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-3 sm:p-5 border border-white/8"
        >
          {/* Stage */}
          <div className="flex justify-center mb-3">
            <div
              className="rounded-xl px-16 py-2.5 text-center w-full max-w-sm"
              style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.25),rgba(99,102,241,0.15))', border: '1px solid rgba(124,58,237,0.4)' }}
            >
              <p className="text-purple-300 text-xs font-bold tracking-[0.3em]">{t('seats_stage')}</p>
            </div>
          </div>

          {/* ── 3-column: VIP-Left | Dance Floor | VIP-Right ─── */}
          <div className="grid grid-cols-[minmax(80px,110px)_1fr_minmax(80px,110px)] gap-2 sm:gap-3 mb-3">
            {/* VIP Left */}
            <div className="space-y-2">
              <p className="text-[#ffd700]/60 text-[10px] font-bold tracking-[0.22em] uppercase text-center mb-2">
                {t('seats_vip_section')}
              </p>
              {VIP_LEFT.map((table) => (
                <VipCard
                  key={table.id}
                  table={table}
                  selected={isSelected(table.id)}
                  taken={TAKEN_TABLES.has(table.id)}
                  onClick={() => handleVip(table)}
                  t={t}
                />
              ))}
            </div>

            {/* Dance floor grid */}
            <div className="flex flex-col items-center">
              <p className="text-white/25 text-[10px] font-bold tracking-[0.25em] uppercase mb-3">
                {t('seats_floor_label')}
              </p>
              <div className="w-full flex flex-col gap-1 items-center">
                {Array.from({ length: FLOOR_ROWS }, (_, r) => (
                  <div key={r} className="flex gap-1 justify-center">
                    {Array.from({ length: FLOOR_COLS }, (_, c) => {
                      const spotId = `spot-${r}-${c}`
                      const taken = TAKEN_SPOTS.has(`${r}-${c}`)
                      const selected = isSelected(spotId)
                      return (
                        <motion.button
                          key={spotId}
                          whileTap={!taken ? { scale: 0.7 } : {}}
                          onClick={!taken ? () => handleSpot(r, c) : undefined}
                          disabled={taken}
                          data-seat-status={taken ? 'taken' : selected ? 'selected' : 'available'}
                          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-all duration-150 border flex-shrink-0 ${
                            taken
                              ? 'bg-red-900/40 border-red-700/30 cursor-not-allowed'
                              : selected
                              ? 'bg-[#a78bfa] border-[#a78bfa] shadow-[0_0_8px_rgba(167,139,250,0.8)]'
                              : 'bg-white/6 border-white/12 hover:bg-white/18 hover:border-white/30 cursor-pointer'
                          }`}
                        />
                      )
                    })}
                  </div>
                ))}
              </div>
              <p className="text-white/15 text-[9px] mt-2 tracking-widest">{t('seats_standing_price')} {t('seats_per_spot')}</p>
            </div>

            {/* VIP Right */}
            <div className="space-y-2">
              <p className="text-[#ffd700]/60 text-[10px] font-bold tracking-[0.22em] uppercase text-center mb-2">
                {t('seats_vip_section')}
              </p>
              {VIP_RIGHT.map((table) => (
                <VipCard
                  key={table.id}
                  table={table}
                  selected={isSelected(table.id)}
                  taken={TAKEN_TABLES.has(table.id)}
                  onClick={() => handleVip(table)}
                  t={t}
                />
              ))}
            </div>
          </div>

          {/* ── Regular tables row ─── */}
          <div
            className="rounded-2xl p-3 sm:p-4 mb-2"
            style={{ background: 'rgba(255,45,120,0.03)', border: '1px solid rgba(255,45,120,0.1)' }}
          >
            <p className="text-[#ff2d78]/50 text-[10px] font-bold tracking-[0.25em] uppercase text-center mb-3">
              {t('seats_table_section')}
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {REGULAR.map((table) => (
                <TableCard
                  key={table.id}
                  table={table}
                  selected={isSelected(table.id)}
                  taken={TAKEN_TABLES.has(table.id)}
                  onClick={() => handleTable(table)}
                  t={t}
                />
              ))}
            </div>
          </div>

          {/* Bar */}
          <div className="flex justify-end">
            <div
              className="rounded-xl px-10 py-2 text-center"
              style={{ background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.18)' }}
            >
              <p className="text-[#ffd700]/50 text-[10px] font-bold tracking-[0.25em]">{t('seats_bar_label')}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Sticky booking bar ───────────────────────────────────── */}
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
              <span data-testid="seat-count" className="text-white font-black text-xl">
                {selectedItems.length}
              </span>
            </div>
            <p className="text-[#ffd700] font-bold text-lg">
              {t('seats_total')}: ${bookingTotal}
            </p>
          </div>
          <button
            data-testid="confirm-booking-btn"
            onClick={() => selectedItems.length > 0 && navigate('/booking-confirmed')}
            disabled={selectedItems.length === 0}
            className={`flex-shrink-0 font-bold py-3.5 px-8 rounded-2xl text-sm transition-all duration-200 ${
              selectedItems.length > 0
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
