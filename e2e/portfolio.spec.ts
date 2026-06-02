import { test, expect } from '@playwright/test'

test.describe('Portfolio - Page Load', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Apoorva/)
  })

  test('hero section is visible with correct content', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Apoorva Chandrashekar')).toBeVisible()
    await expect(page.getByText('Full Stack Developer')).toBeVisible()
    await expect(page.getByText('Available for new opportunities')).toBeVisible()
  })
})

test.describe('Portfolio - Navigation', () => {
  test('navbar links scroll to correct sections', async ({ page }) => {
    await page.goto('/')

    // Click About nav link
    await page.getByRole('button', { name: 'About' }).first().click()
    await expect(page.locator('#about')).toBeInViewport()

    // Click Skills nav link
    await page.getByRole('button', { name: 'Skills' }).first().click()
    await expect(page.locator('#skills')).toBeInViewport()

    // Click Experience nav link
    await page.getByRole('button', { name: 'Experience' }).first().click()
    await expect(page.locator('#experience')).toBeInViewport()
  })

  test('resume link opens in new tab', async ({ page }) => {
    await page.goto('/')
    const resumeLink = page.getByRole('link', { name: 'Resume' })
    await expect(resumeLink).toHaveAttribute('target', '_blank')
    await expect(resumeLink).toHaveAttribute('href', '/resume.pdf')
  })
})

test.describe('Portfolio - Skills Section', () => {
  test('skill badges are clickable and open external links', async ({ page }) => {
    await page.goto('/')
    await page.locator('#skills').scrollIntoViewIfNeeded()

    // Find a skill link (React)
    const reactLink = page.getByTitle('REACT — visit official site')
    await expect(reactLink).toHaveAttribute('href', 'https://react.dev')
    await expect(reactLink).toHaveAttribute('target', '_blank')
  })

  test('specialization badges are not clickable', async ({ page }) => {
    await page.goto('/')
    await page.locator('#skills').scrollIntoViewIfNeeded()

    const badge = page.getByText('DISTRIBUTED SYSTEMS')
    await expect(badge).toBeVisible()
    // Should be a span, not a link
    const tagName = await badge.evaluate((el) => el.closest('a')?.tagName)
    expect(tagName).toBeUndefined()
  })
})

test.describe('Portfolio - Experience Section', () => {
  test('shows all companies', async ({ page }) => {
    await page.goto('/')
    await page.locator('#experience').scrollIntoViewIfNeeded()

    await expect(page.getByText('Prathama SRL')).toBeVisible()
    await expect(page.getByText('Sinch')).toBeVisible()
    await expect(page.getByText('DXC Technology')).toBeVisible()
  })
})

test.describe('Portfolio - Contact Form', () => {
  test('form renders with all fields', async ({ page }) => {
    await page.goto('/')
    await page.locator('#contact').scrollIntoViewIfNeeded()

    await expect(page.getByLabel(/Your Name/i)).toBeVisible()
    await expect(page.getByLabel(/Your Email/i)).toBeVisible()
    await expect(page.getByLabel(/Subject/i)).toBeVisible()
    await expect(page.getByLabel(/Message/i)).toBeVisible()
  })

  test('submit button is disabled when form is empty', async ({ page }) => {
    await page.goto('/')
    await page.locator('#contact').scrollIntoViewIfNeeded()

    const button = page.getByRole('button', { name: 'Open in Email Client' })
    await expect(button).toBeDisabled()
  })

  test('submit button enables after filling form', async ({ page }) => {
    await page.goto('/')
    await page.locator('#contact').scrollIntoViewIfNeeded()

    await page.getByLabel(/Your Name/i).fill('Jane')
    await page.getByLabel(/Your Email/i).fill('jane@test.com')
    await page.getByLabel(/Message/i).fill('Hello!')

    const button = page.getByRole('button', { name: 'Open in Email Client' })
    await expect(button).toBeEnabled()
  })
})

test.describe('Portfolio - Chatbot', () => {
  test('FAB button is visible', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByLabel('Open AI chat assistant')).toBeVisible()
  })

  test('opens chat dialog on click', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('Open AI chat assistant').click()

    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page.getByText('Portfolio AI')).toBeVisible()
    await expect(page.getByText(/Ask me anything/)).toBeVisible()
  })

  test('shows suggested questions', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('Open AI chat assistant').click()

    await expect(page.getByText("What's your tech stack?")).toBeVisible()
    await expect(page.getByText('Tell me about your projects')).toBeVisible()
  })

  test('closes chat on close button', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('Open AI chat assistant').click()
    await expect(page.getByRole('dialog')).toBeVisible()

    await page.getByLabel('Close chat').click()
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })

  test('can type a message', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('Open AI chat assistant').click()

    const input = page.getByLabel('Chat message input')
    await input.fill('Hello')
    await expect(input).toHaveValue('Hello')

    // Send button should be enabled
    await expect(page.getByLabel('Send message')).toBeEnabled()
  })
})

test.describe('Portfolio - Certifications', () => {
  test('section is visible', async ({ page }) => {
    await page.goto('/')
    await page.locator('#certifications').scrollIntoViewIfNeeded()

    await expect(page.getByText('Certifications')).toBeVisible()
  })

  test('certification cards open in new tab', async ({ page }) => {
    await page.goto('/')
    await page.locator('#certifications').scrollIntoViewIfNeeded()

    const firstCert = page.locator('#certifications a').first()
    await expect(firstCert).toHaveAttribute('target', '_blank')
  })
})
