import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useLang } from '../context/LangContext'
import { useApp } from '../context/AppContext'

export default function Cart() {
  const { t } = useLang()
  const { cart, addToCart, removeFromCart, cartSubtotal, cartTotal, tableNumber } = useApp()
  const navigate = useNavigate()

  const serviceCharge = Math.round((cartTotal - cartSubtotal) * 100) / 100

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8"
        >
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-1">
            {t('cart_title')}
          </h1>
          <p className="text-white/40 text-sm">
            {t('cart_for_table')}{' '}
            <span className="text-[#ff2d78] font-bold">{tableNumber}</span>
          </p>
        </motion.div>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <ShoppingBag className="w-16 h-16 text-white/15 mx-auto mb-4" />
            <p className="text-white/50 font-semibold text-lg mb-2">{t('cart_empty')}</p>
            <p className="text-white/30 text-sm mb-8">{t('cart_empty_sub')}</p>
            <button
              onClick={() => navigate('/menu')}
              className="glass border border-white/20 hover:border-[#ff2d78]/50 py-3 px-8 rounded-2xl font-semibold text-sm transition-all hover:scale-[1.02]"
            >
              {t('cart_back')}
            </button>
          </motion.div>
        ) : (
          <>
            {/* Cart items */}
            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass rounded-2xl p-4 flex items-center gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-white">{item.name}</p>
                    <p className="text-white/40 text-xs mt-0.5">${item.price} each</p>
                  </div>

                  {/* Qty controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-7 h-7 rounded-lg bg-white/8 hover:bg-white/16 flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-3 h-3 text-white/60" />
                    </button>
                    <span className="text-white font-bold text-sm w-6 text-center">{item.qty}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-7 h-7 rounded-lg bg-[#ff2d78]/20 hover:bg-[#ff2d78]/35 border border-[#ff2d78]/40 flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-3 h-3 text-[#ff2d78]" />
                    </button>
                  </div>

                  <span className="text-[#ffd700] font-black text-sm w-14 text-right">
                    ${item.price * item.qty}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Totals */}
            <div className="glass rounded-2xl p-5 mb-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-white/50">{t('cart_subtotal')}</span>
                <span className="text-white font-semibold">${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">{t('cart_service')}</span>
                <span className="text-white font-semibold">${serviceCharge.toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-between">
                <span className="font-black text-base">{t('cart_total')}</span>
                <span
                  data-testid="cart-total"
                  className="text-[#ffd700] font-black text-xl"
                >
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                data-testid="proceed-to-payment"
                onClick={() => navigate('/payment')}
                className="w-full bg-[#ff2d78] hover:bg-[#ff2d78]/90 text-white font-bold py-4 rounded-2xl neon-glow transition-all hover:scale-[1.02] text-sm"
              >
                {t('cart_proceed')} — ${cartTotal.toFixed(2)}
              </button>
              <button
                onClick={() => navigate('/menu')}
                className="w-full flex items-center justify-center gap-2 glass border border-white/15 hover:border-white/30 py-3 rounded-2xl font-semibold text-sm transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('cart_back')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
