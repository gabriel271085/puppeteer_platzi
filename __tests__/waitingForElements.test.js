const puppeteer = require('puppeteer')

describe ('waiting for Elements',()=>{

    it('show the waiting types', async ()=>{
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })
        const page = await browser.newPage()
        //waituntil realiza la funcion de esperar hasta que no haya mas movimiento de red
        await page.goto('https://demo.guru99.com/test/simple_context_menu.html', {waitUntil: 'networkidle0'})

        //espera explicita con la nueva sintaxis
        await new Promise(r => setTimeout(r, 2000))

        //espera por un selector CSS y verificar que este visible

        await page.waitForSelector('#authentication > span', {visible: 'true'})
        
        //esperar por un XPATH

        await page.waitForXPath('//img[@src="img/logo.png"]')

       
   
        await browser.close()


        
    },35000)
})