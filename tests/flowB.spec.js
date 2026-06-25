import { test, expect } from '@playwright/test'

test.describe('Flow B — Check-In → Order → Payment', () => {
  test('Check-In → Menu → Cart → Payment → Success', async ({ page }) => {
    // 1. Navigate to check-in (deep link — staff flow bypasses events)
    await page.goto('/#/checkin')
    await expect(page.getByTestId('checkin-heading')).toBeVisible()

    // 2. Table 4 should be visible and highlighted
    const table4 = page.getByTestId('table-4')
    await expect(table4).toBeVisible()

    // 3. Click table 4 → navigate to menu
    await table4.click()
    await expect(page).toHaveURL(/#\/menu/)

    // 4. Add first two available items
    const addBtns = page.getByTestId('add-item-btn')
    await addBtns.first().click()
    await addBtns.nth(1).click()

    // 5. Cart badge in navbar appears with 2 items
    await expect(page.getByTestId('cart-badge')).toBeVisible()
    await expect(page.getByTestId('cart-badge')).toContainText('2')
    // Also verify floating cart button
    await expect(page.getByTestId('cart-floating-count')).toContainText('2')

    // 6. Navigate to cart via cart-badge-link in navbar
    await page.getByTestId('cart-badge-link').click()
    await expect(page).toHaveURL(/#\/cart/)

    // 7. Proceed to payment
    await page.getByTestId('proceed-to-payment').click()
    await expect(page).toHaveURL(/#\/payment$/)

    // 8. Fill mock card form
    await page.getByTestId('card-number-input').fill('4242424242424242')
    await page.getByTestId('card-name-input').fill('John Smith')
    await page.getByTestId('card-expiry-input').fill('1228')
    await page.getByTestId('card-cvv-input').fill('123')

    // 9. Click Pay Now
    await page.getByTestId('pay-now-btn').click()

    // 10. Reach success page
    await expect(page).toHaveURL(/#\/payment-success/, { timeout: 5000 })
    await expect(page.getByTestId('payment-success')).toBeVisible()
  })
})
