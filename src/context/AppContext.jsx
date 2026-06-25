import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // selectedItems: [{id, type, label, price}]
  const [selectedItems, setSelectedItems] = useState([])
  const [cart, setCart] = useState([])
  const tableNumber = 4

  const toggleItem = (item) => {
    setSelectedItems((prev) => {
      const exists = prev.find((i) => i.id === item.id)
      if (exists) return prev.filter((i) => i.id !== item.id)
      return [...prev, item]
    })
  }

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const removeFromCart = (itemId) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId)
      if (existing && existing.qty > 1) {
        return prev.map((i) => i.id === itemId ? { ...i, qty: i.qty - 1 } : i)
      }
      return prev.filter((i) => i.id !== itemId)
    })
  }

  const clearCart = () => setCart([])

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)
  const cartSubtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
  const cartTotal = Math.round(cartSubtotal * 1.15 * 100) / 100
  const bookingTotal = selectedItems.reduce((s, i) => s + i.price, 0)

  return (
    <AppContext.Provider
      value={{
        selectedItems,
        setSelectedItems,
        toggleItem,
        bookingTotal,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        cartTotal,
        tableNumber,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
