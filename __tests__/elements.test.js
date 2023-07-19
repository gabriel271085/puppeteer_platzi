const puppeteer = require('puppeteer')

describe ('interacting with elements',()=>{

    it('open and close the browser', async ()=>{
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })
        const page = await browser.newPage()
        await page.goto('https://demo.guru99.com/test/simple_context_menu.html')

        //este codigo sirve para aceptar las alertas de popups
        page.on('dialog', async (dialog)=>{

            await dialog.accept()
        })

        //right click
        // await page.click('#authentication > span', {button: 'right',delay: '200'})
        // await page.waitForTimeout(1000)
        

        //double click
        await page.click('#authentication > button',{clickCount:2,delay: '200'})


        await page.goto('https://devexpress.github.io/testcafe/example/')
        await page.type('#developer-name', 'Gabriel', { delay: 100 })
        await page.click('#remote-testing')
        await page.click('#tried-test-cafe')
        await page.type('#comments','A test from puppeteer')
        await page.click('#submit-button')
        await page.waitForTimeout(2000)
        await browser.close()
    },35000)
})