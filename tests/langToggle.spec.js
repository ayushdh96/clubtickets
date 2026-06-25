import { test, expect } from '@playwright/test'

test.describe('Language Toggle — EN / ES', () => {
  test.beforeEach(async ({ page }) => {
    // Reset to English before each test
    await page.goto('/')
    await page.evaluate(() => localStorage.setItem('michelles_lang', 'en'))
    await page.reload()
  })

  test('Default language is English', async ({ page }) => {
    await expect(page.getByTestId('book-tickets-btn')).toContainText('Book Your Tickets')
    await expect(page.getByTestId('checkin-nav-btn')).toContainText('Table Check-In')
  })

  test('Switching to Spanish translates the Home page', async ({ page }) => {
    await page.getByTestId('lang-toggle-es').click()
    await expect(page.getByTestId('book-tickets-btn')).toContainText('Reservar Entradas')
    await expect(page.getByTestId('checkin-nav-btn')).toContainText('Registro de Mesa')
  })

  test('Spanish persists across in-app navigation to CheckIn', async ({ page }) => {
    await page.getByTestId('lang-toggle-es').click()
    await page.getByTestId('checkin-nav-btn').click()
    await expect(page).toHaveURL('/checkin')
    await expect(page.getByTestId('checkin-heading')).toContainText('Plano del Club')
  })

  test('Spanish shows translated menu section headers', async ({ page }) => {
    await page.getByTestId('lang-toggle-es').click()
    // Navigate to checkin then menu
    await page.goto('/checkin')
    await page.getByTestId('table-4').click()
    await expect(page).toHaveURL('/menu')
    await expect(page.getByTestId('cocktails-section')).toContainText('Cócteles')
    await expect(page.getByTestId('bottles-section')).toContainText('Servicio de Botellas')
    await expect(page.getByTestId('bites-section')).toContainText('Bocados Nocturnos')
  })

  test('Switching back to English reverts translations', async ({ page }) => {
    await page.getByTestId('lang-toggle-es').click()
    await expect(page.getByTestId('book-tickets-btn')).toContainText('Reservar Entradas')

    await page.getByTestId('lang-toggle-en').click()
    await expect(page.getByTestId('book-tickets-btn')).toContainText('Book Your Tickets')
  })
})
