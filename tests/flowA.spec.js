import { test, expect } from '@playwright/test'

test.describe('Flow A — Ticket Booking', () => {
  test('RolePicker → Events → Home → Seat Selection → Booking Confirmed', async ({ page }) => {
    // 1. Land on role picker
    await page.goto('/')
    await expect(page.getByTestId('guest-btn')).toBeVisible()

    // 2. Owner button is disabled (rendered as a div, not a button)
    await expect(page.getByTestId('owner-btn')).toBeVisible()
    await expect(page.getByTestId('owner-btn')).toHaveClass(/cursor-not-allowed/)

    // 3. Click Guest → events page
    await page.getByTestId('guest-btn').click()
    await expect(page).toHaveURL(/#\/events/)

    // 4. Michelle's event card is visible
    await expect(page.getByTestId('michelles-event-card')).toBeVisible()

    // 5. Date picker shows today's date
    await expect(page.getByTestId('event-date')).toBeVisible()

    // 6. Click "Select Venue" → home page
    await page.getByTestId('select-venue-btn').click()
    await expect(page).toHaveURL(/#\/home/)
    await expect(page.getByTestId('hero-heading')).toBeVisible()
    await expect(page.getByTestId('hero-heading')).toContainText("Michelle's")

    // 7. Click Book Tickets → seats
    await page.getByTestId('book-tickets-btn').click()
    await expect(page).toHaveURL(/#\/seats/)

    // 8. Select 3 available items
    const available = page.locator('[data-seat-status="available"]')
    await available.first().click()
    await available.first().click()
    await available.first().click()

    // 9. Counter shows 3
    await expect(page.getByTestId('seat-count')).toContainText('3')

    // 10. Confirm → booking confirmed
    const confirmBtn = page.getByTestId('confirm-booking-btn')
    await expect(confirmBtn).toBeEnabled()
    await confirmBtn.click()

    await expect(page).toHaveURL(/#\/booking-confirmed/)
    await expect(page.getByTestId('booking-summary')).toBeVisible()
  })
})
