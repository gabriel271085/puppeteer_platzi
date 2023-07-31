const puppeteer = require('puppeteer')

describe('devices emulation', () => {

    let browser
    let page

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            // slowMo: 300
        })
        page = await browser.newPage()
        await page.goto('https://platzi.com', { waitUntil: 'networkidle0' })
    }, 10000)

    afterAll(async () => {
        await page.waitForTimeout(1500)
        await browser.close()
    })

    it('devices emulation manually', async () => {
        await page.emulate({
            name: 'My device',
            viewport: {
                width: 375,
                height: 667,
                deviceScaleFactor: 2,
                isMobile: true,
                hasTouch: true,
                isLandscape: false
            },
            userAgent:
                'Mozilla/5.0 (Linux; Android 10; SAMSUNG SM-J600G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/10.1 Chrome/71.0.3578.99 Mobile Safari/537.36',
        })
    })

    it('desktop emulation', async () => {
        await page.setViewport({
            width: 1280,
            height: 800,
        })
    }, 30000)

    it('tablet emulation in landscape mode', async () => {
        const tablet = puppeteer.devices['iPad Pro 11 landscape']
        await page.emulate(tablet)
    }, 30000)

    it('cellphone emulation', async () => {
        const iphone = puppeteer.devices['iPhone 12']
        await page.emulate(iphone)
    }, 30000)
})
