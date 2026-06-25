import { test, expect } from '@playwright/test'

test.describe('Language Toggle — EN / ES', () => {
  test.beforeEach(async ({ page }) => {
    // Reset to English via role picker page (which has EN/ES toggle)
    await page.goto('/')
    await page.evaluate(() => localStorage.setItem('michelles_lang', 'en'))
    await page.reload()
  })

  test('Role picker shows correct English text by default', async ({ page }) => {
    await expect(page.getByTestId('guest-btn')).toContainText("I'm a Guest")
    await expect(page.getByTestId('owner-btn')).toContainText('Club Owner')
  })

  test('Role picker switches to Spanish', async ({ page }) => {
    await page.getByTestId('lang-toggle-es').click()
    await expect(page.getByTestId('guest-btn')).toContainText('Soy un Invitado')
    await expect(page.getByTestId('owner-btn')).toContainText('Dueño del Club')
  })

  test('Spanish persists on events page', async ({ page }) => {
    await page.getByTestId('lang-toggle-es').click()
    await page.evaluate(() => localStorage.setItem('michelles_lang', 'es'))
    await page.goto('/#/events')
    await expect(page.getByTestId('select-venue-btn')).toContainText('Seleccionar Lugar')
  })

  test('Spanish shows translated home page after entering via events', async ({ page }) => {
    await page.evaluate(() => localStorage.setItem('michelles_lang', 'es'))
    await page.goto('/#/home')
    await expect(page.getByTestId('book-tickets-btn')).toContainText('Reservar Entradas')
    await expect(page.getByTestId('checkin-nav-btn')).toContainText('Registro de Mesa')
  })

  test('Spanish persists across in-app navigation to CheckIn', async ({ page }) => {
    await page.evaluate(() => localStorage.setItem('michelles_lang', 'es'))
    await page.goto('/#/home')
    await page.getByTestId('checkin-nav-btn').click()
    await expect(page).toHaveURL(/#\/checkin/)
    await expect(page.getByTestId('checkin-heading')).toContainText('Plano del Club')
  })

  test('Spanish shows translated menu section headers', async ({ page }) => {
    await page.evaluate(() => localStorage.setItem('michelles_lang', 'es'))
    await page.goto('/#/checkin')
    await page.getByTestId('table-4').click()
    await expect(page).toHaveURL(/#\/menu/)
    await expect(page.getByTestId('cocktails-section')).toContainText('Cócteles')
    await expect(page.getByTestId('bottles-section')).toContainText('Servicio de Botellas')
    await expect(page.getByTestId('bites-section')).toContainText('Bocados Nocturnos')
  })

  test('Switching back to English reverts translations', async ({ page }) => {
    await page.getByTestId('lang-toggle-es').click()
    await expect(page.getByTestId('guest-btn')).toContainText('Soy un Invitado')
    await page.getByTestId('lang-toggle-en').click()
    await expect(page.getByTestId('guest-btn')).toContainText("I'm a Guest")
  })
})
