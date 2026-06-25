import { test, expect } from '@playwright/test'

test.describe('Flow A — Ticket Booking', () => {
  test('Home → Seat Selection → Booking Confirmed', async ({ page }) => {
    // 1. Land on home page
    await page.goto('/')
    await expect(page.getByTestId('hero-heading')).toBeVisible()
    await expect(page.getByTestId('hero-heading')).toContainText("Michelle's")

    // 2. Book Tickets button visible and has correct text
    const bookBtn = page.getByTestId('book-tickets-btn')
    await expect(bookBtn).toBeVisible()
    await expect(bookBtn).toContainText('Book')

    // 3. Click → navigate to /seats
    await bookBtn.click()
    await expect(page).toHaveURL('/seats')

    // 4. Select 3 available seats
    const available = page.locator('[data-seat-status="available"]')
    await available.first().click()
    await available.first().click()
    await available.first().click()

    // 5. Counter shows 3
    await expect(page.getByTestId('seat-count')).toContainText('3')

    // 6. Confirm button is enabled and clickable
    const confirmBtn = page.getByTestId('confirm-booking-btn')
    await expect(confirmBtn).toBeEnabled()
    await confirmBtn.click()

    // 7. Booking confirmed page
    await expect(page).toHaveURL('/booking-confirmed')
    await expect(page.getByTestId('booking-summary')).toBeVisible()
  })
})
