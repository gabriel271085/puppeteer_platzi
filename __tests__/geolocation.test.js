const puppeteer = require('puppeteer');

describe('Geolocation', () => {

    let browser;
    let page;

    beforeEach(async () => {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            // slowMo: 300
        });
        page = await browser.newPage();
    });

    afterEach(async () => {
        await page.waitForTimeout(2500);
        await browser.close();
    });

    it('geo change', async () => {

        const context = browser.defaultBrowserContext();

        await context.overridePermissions('https://chercher.tech/practice/geo-location.html', [
            'geolocation'
        ]);

        await page.setGeolocation({ latitude: 90, longitude: 20 });

        await page.goto('https://chercher.tech/practice/geo-location.html');

    });

});
