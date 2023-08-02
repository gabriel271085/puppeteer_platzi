const puppeteer = require('puppeteer')

describe('screenshots', () => {

    let browser
    let page

    beforeEach(async () => {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            // slowMo: 300
        })
        page = await (await browser.createIncognitoBrowserContext()).newPage();
        await page.goto('https://google.com', { waitUntil: 'networkidle0' })
    }, 10000)

    afterAll(async () => {
        await page.waitForTimeout(1500)
        await browser.close()
    })

    it('full screenshot', async () => {
        
        await page.screenshot({
            path:'./screenshots.png',
            fullPage:true
        })
    }, 30000)

    it('partial screenshot', async () => {
        
        await page.screenshot({
            path:'./partialscreenshot.png',
            clip:{
                x:0,
                y:0,
                width: 500,
                height: 500
            }
        })
    }, 30000)
    
    it('screenshot without background', async () => {

        await page.evaluate(()=>(document.body.style.background = 'transparent'))
        
        await page.screenshot({
            path:'./nobgscreenshot.png',
            omitBackground: true
        })
    }, 30000)

    it('element screenshot ', async () => {

        const element = await page.waitForSelector('body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img')
        
        await element.screenshot({
            path:'./elementscreenshot.png',
            
        })
    }, 30000)

})
