import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [selectedSeats, setSelectedSeats] = useState([])
  const [cart, setCart] = useState([])
  const tableNumber = 4

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

  return (
    <AppContext.Provider
      value={{
        selectedSeats,
        setSelectedSeats,
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
