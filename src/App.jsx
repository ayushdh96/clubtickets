import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { LangProvider } from './context/LangContext'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import SeatSelection from './pages/SeatSelection'
import BookingConfirmed from './pages/BookingConfirmed'
import CheckIn from './pages/CheckIn'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import Payment from './pages/Payment'
import PaymentSuccess from './pages/PaymentSuccess'

export default function App() {
  return (
    <LangProvider>
      <AppProvider>
        <HashRouter>
          <div className="min-h-screen bg-[#0a0a0a] text-white">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/seats" element={<SeatSelection />} />
              <Route path="/booking-confirmed" element={<BookingConfirmed />} />
              <Route path="/checkin" element={<CheckIn />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
            </Routes>
          </div>
        </HashRouter>
      </AppProvider>
    </LangProvider>
  )
}
