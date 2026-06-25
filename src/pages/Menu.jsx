import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, ShoppingBag } from 'lucide-react'
import { useLang } from '../context/LangContext'
import { useApp } from '../context/AppContext'

const MENU_DATA = {
  cocktails: [
    { id: 'c1', name: 'Neon Sunset', price: 18, desc: 'Tequila, passion fruit, lime, chili rim', color: '#ff2d78' },
    { id: 'c2', name: 'Midnight Mule', price: 16, desc: 'Vodka, ginger beer, blackberry, fresh mint', color: '#7c3aed' },
    { id: 'c3', name: 'Gold Rush', price: 20, desc: 'Bourbon, honey syrup, lemon, edible gold', color: '#ffd700' },
    { id: 'c4', name: 'La Rosa', price: 17, desc: 'Gin, rose water, elderflower, pink grapefruit', color: '#ec4899' },
    { id: 'c5', name: 'Velvet Storm', price: 19, desc: 'Dark rum, espresso, falernum, whipped cream', color: '#6366f1' },
  ],
  bottles: [
    { id: 'b1', name: 'Grey Goose', price: 280, desc: 'Premium vodka — standard mixers & ice tower', color: '#06b6d4' },
    { id: 'b2', name: 'Don Julio 1942', price: 380, desc: 'Añejo tequila — sparkler & champagne toast', color: '#ffd700' },
    { id: 'b3', name: 'Dom Pérignon', price: 420, desc: 'Vintage champagne — sparkler presentation', color: '#f1f5f9' },
    { id: 'b4', name: 'Hennessy VS', price: 320, desc: 'Cognac — premium garnish & mixers', color: '#f97316' },
  ],
  bites: [
    { id: 'f1', name: 'Truffle Fries', price: 18, desc: 'Black truffle oil, aged parmesan, fresh herbs', color: '#84cc16' },
    { id: 'f2', name: 'Wagyu Sliders', price: 28, desc: 'A5 wagyu beef, truffle aioli, brioche bun', color: '#ef4444' },
    { id: 'f3', name: 'Sashimi Platter', price: 45, desc: 'Bluefin tuna, salmon, yellowtail, pickled ginger', color: '#ff2d78' },
    { id: 'f4', name: 'Lobster Tacos', price: 38, desc: 'Maine lobster, chipotle crema, mango slaw', color: '#f97316' },
  ],
}

function MenuSection({ sectionKey, titleKey, items }) {
  const { t } = useLang()
  const { cart, addToCart } = useApp()

  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-5">
        <h2
          data-testid={`${sectionKey}-section`}
          className="text-xl font-black uppercase tracking-widest text-white"
        >
          {t(titleKey)}
        </h2>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.12), transparent)' }} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => {
          const inCart = cart.find((c) => c.id === item.id)
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-5 flex gap-4 items-start group hover:border-white/20 transition-colors"
            >
              {/* Color dot accent */}
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
                style={{ background: `${item.color}20`, border: `1px solid ${item.color}40` }}
              >
                <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-sm text-white">{item.name}</p>
                    <p className="text-white/40 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                  <span className="text-[#ffd700] font-black text-sm flex-shrink-0">${item.price}</span>
                </div>

                <button
                  data-testid="add-item-btn"
                  onClick={() => addToCart(item)}
                  className={`mt-3 flex items-center gap-1.5 text-xs font-bold py-1.5 px-3 rounded-xl transition-all ${
                    inCart
                      ? 'bg-[#ff2d78]/20 text-[#ff2d78] border border-[#ff2d78]/40'
                      : 'bg-white/8 text-white/70 border border-white/10 hover:bg-[#ff2d78]/20 hover:text-[#ff2d78] hover:border-[#ff2d78]/40'
                  }`}
                >
                  <Plus className="w-3 h-3" />
                  {inCart ? `${t('menu_add')} (${inCart.qty})` : t('menu_add')}
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default function Menu() {
  const { t } = useLang()
  const { cartCount, tableNumber } = useApp()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen pt-20 pb-28 px-4">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 right-0 w-64 h-64 rounded-full blur-[100px] opacity-15"
          style={{ background: '#ff2d78' }}
        />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8"
        >
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-1">
            {t('menu_title')}
          </h1>
          <p className="text-white/40 text-sm">
            {t('menu_ordering_for')}{' '}
            <span className="text-[#ff2d78] font-bold">
              {t('menu_table')} {tableNumber}
            </span>
          </p>
        </motion.div>

        <MenuSection sectionKey="cocktails" titleKey="menu_cocktails" items={MENU_DATA.cocktails} />
        <MenuSection sectionKey="bottles" titleKey="menu_bottles" items={MENU_DATA.bottles} />
        <MenuSection sectionKey="bites" titleKey="menu_bites" items={MENU_DATA.bites} />
      </div>

      {/* Floating cart button */}
      {cartCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center gap-3 bg-[#ff2d78] text-white font-bold py-4 px-8 rounded-2xl neon-glow hover:scale-105 transition-all shadow-2xl"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>{t('menu_view_cart')}</span>
            <span
              data-testid="cart-floating-count"
              className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full"
            >
              {cartCount} {t('menu_items')}
            </span>
          </button>
        </motion.div>
      )}
    </div>
  )
}
