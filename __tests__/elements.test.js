const puppeteer = require('puppeteer')
const {type,doubleclick,click} = require('../lib/helpers')

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
        await doubleclick(page,'#authentication > button')


        await page.goto('https://devexpress.github.io/testcafe/example/')
        await type(page,'#developer-name', 'Gabriel', { delay: 100 })
        await click(page,'#remote-testing')
        await click(page,'#tried-test-cafe')
        await type(page,'#comments','A test from puppeteer')
        await click(page,'#submit-button')
        await new Promise(r => setTimeout(r, 2000))
        await browser.close()
    },35000)
})