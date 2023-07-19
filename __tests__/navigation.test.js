const puppeteer = require('puppeteer')

describe ('First test',()=>{

    it('navigate', async ()=>{
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })

        const page = await browser.newPage()
        await page.goto('https://todo.ly/')
        await page.waitForTimeout(1000)
        await page.waitForSelector('img')

        await page.reload()
        await page.waitForTimeout(1000)
        await page.waitForSelector('img')
        
        //navigate to another site
        await page.goto('https://todoist.com/')
        await page.waitForTimeout(1000)
        await page.waitForSelector('img')

        //navigate back and forward 
        await page.goBack()
        await page.waitForTimeout(1000)
        await page.goForward()
        await page.waitForTimeout(1000)
        
        //open another page in another tab
        const page2 = await browser.newPage()
        await page2.goto('https://github.com/')
        await page.waitForTimeout(1000)
        await browser.close()

    }, 50000)
})