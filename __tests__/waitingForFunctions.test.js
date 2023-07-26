const puppeteer = require('puppeteer')

describe ('waiting for functions',()=>{

    it('show the waiting types', async ()=>{
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            slowMo:300
        })
        const page = await browser.newPage()
        await page.goto('https://demoqa.com/modal-dialogs')

        //esperar por una funcion
        await page.click('#showSmallModal')
        await page.waitForFunction(()=> document.querySelector('#example-modal-sizes-title-sm').innerText ==='Small Modal')

        //Ejemplo para observar por un viewport
        // const observeResize = page.waitForFunction('window.innerWidth < 100')
        // await page.setViewport({width:50, height:50})        
        // await observeResize

        await page.click('#closeSmallModal')
        await page.waitForFunction(()=> !document.querySelector('#example-modal-sizes-title-sm'))

        await browser.close()
        
    },35000)
})