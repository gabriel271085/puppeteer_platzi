const puppeteer = require('puppeteer')

describe ('First test',()=>{

    it('open and close the browser', async ()=>{
        const browser = await puppeteer.launch({
            headless: "new",
            slowMo: 0,
            devtools: false,
            
            // defaultViewport: {
            //     width: 2100,
            //     height: 1080,
            // },
            // args: [
            //  '--window-size=1920,1080', // tamaño de la ventana
            // ],
        })
        const page = await browser.newPage()
        await page.goto('https://www.google.com')
        await page.waitForTimeout(2000)
        await browser.close()

    })
})