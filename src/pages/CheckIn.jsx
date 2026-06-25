import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { useLang } from '../context/LangContext'

// Club tables configuration
const TABLES = [
  { id: 1, guests: 0 },
  { id: 2, guests: 3 },
  { id: 3, guests: 0 },
  { id: 4, guests: 4 },  // ← our checked-in table
  { id: 5, guests: 0 },
  { id: 6, guests: 2 },
  { id: 7, guests: 0 },
  { id: 8, guests: 5 },
  { id: 9, guests: 0 },
  { id: 10, guests: 0 },
  { id: 11, guests: 1 },
  { id: 12, guests: 0 },
]

export default function CheckIn() {
  const { t } = useLang()
  const navigate = useNavigate()

  const handleTableClick = (table) => {
    if (table.id === 4) navigate('/menu')
  }

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full blur-[120px] opacity-20"
          style={{ background: '#ff2d78' }}
        />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <h1
            data-testid="checkin-heading"
            className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-2"
          >
            {t('checkin_title')}
          </h1>
          <p className="text-white/40 text-sm">{t('checkin_subtitle')}</p>
        </motion.div>

        {/* Floor plan container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-6 sm:p-8"
        >
          {/* DJ Booth */}
          <div className="flex justify-center mb-2">
            <div
              className="rounded-2xl px-14 py-3 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(99,102,241,0.2))', border: '1px solid rgba(124,58,237,0.4)' }}
            >
              <p className="text-purple-300 text-xs font-bold tracking-[0.25em]">{t('checkin_dj')}</p>
            </div>
          </div>

          {/* Dance floor */}
          <div className="flex justify-center mb-6">
            <div
              className="rounded-2xl px-20 py-4 text-center w-full max-w-xs"
              style={{ background: 'rgba(255,215,0,0.05)', border: '1px solid rgba(255,215,0,0.15)' }}
            >
              <p className="text-[#ffd700]/50 text-[10px] font-bold tracking-[0.3em]">{t('checkin_dance')}</p>
            </div>
          </div>

          {/* Tables grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-6">
            {TABLES.map((table) => {
              const isOurTable = table.id === 4
              const isOccupied = table.guests > 0

              return (
                <motion.button
                  key={table.id}
                  data-testid={`table-${table.id}`}
                  whileHover={{ scale: isOurTable ? 1.06 : 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleTableClick(table)}
                  disabled={!isOurTable}
                  className={`relative rounded-2xl p-4 text-center transition-all ${
                    isOurTable
                      ? 'table-glow cursor-pointer'
                      : isOccupied
                      ? 'cursor-default'
                      : 'opacity-50 cursor-default'
                  }`}
                  style={
                    isOurTable
                      ? { background: 'linear-gradient(135deg, rgba(255,45,120,0.25), rgba(255,45,120,0.1))', border: '1px solid rgba(255,45,120,0.5)' }
                      : isOccupied
                      ? { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }
                      : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }
                  }
                >
                  {/* Your table badge */}
                  {isOurTable && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#ff2d78] text-white text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                      {t('checkin_your_table')}
                    </div>
                  )}

                  <p className={`text-xs font-semibold mb-1 ${isOurTable ? 'text-[#ff2d78]' : 'text-white/40'}`}>
                    {t('checkin_table')} {table.id}
                  </p>

                  {isOccupied ? (
                    <div className="flex items-center justify-center gap-1">
                      <Users className={`w-3 h-3 ${isOurTable ? 'text-[#ff2d78]' : 'text-white/50'}`} />
                      <span className={`text-xs font-bold ${isOurTable ? 'text-white' : 'text-white/60'}`}>
                        {table.guests}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[10px] text-white/20">{t('checkin_available')}</span>
                  )}

                  {isOurTable && (
                    <p className="text-[9px] text-[#ff2d78]/70 mt-1 font-medium">{t('checkin_tap')}</p>
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Bar section */}
          <div className="flex justify-end">
            <div
              className="rounded-xl px-8 py-3 text-center"
              style={{ background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.2)' }}
            >
              <p className="text-[#ffd700]/60 text-[10px] font-bold tracking-[0.25em]">{t('checkin_bar')}</p>
            </div>
          </div>
        </motion.div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-5">
          {[
            { label: t('checkin_your_table'), color: 'bg-[#ff2d78]' },
            { label: t('checkin_occupied'), color: 'bg-white/20' },
            { label: t('checkin_available'), color: 'bg-white/6' },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-sm ${color}`} />
              <span className="text-xs text-white/40">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
