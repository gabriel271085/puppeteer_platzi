const puppeteer = require('puppeteer')

describe ('extracting info',()=>{

    it('counting the page elements', async ()=>{
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            // slowMo:300
        })

        const page = await browser.newPage()
        await page.goto('https://platzi.com',{waitUntil: 'networkidle0'})
        // la funcion $$eval selecciona todos los selectores del DOM
        const images = await page.$$eval('img',(images)=>images.length) 
        console.log('qty of images =',images) 

        },35000)

    it('extract the info of an element', async ()=>{
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            // slowMo:300
        })
        const page = await browser.newPage()
        await page.goto('https://platzi.com',{waitUntil: 'networkidle0'})
        
        //utilizando un selector
        await page.waitForSelector('#Header-v2 > nav.Nav-header.Nav-header-mobileCtas > div.Menu > div > div > ul > li:nth-child(8) > a')  
        const buttonName = await page.$eval('#Header-v2 > nav.Nav-header.Nav-header-mobileCtas > div.Menu > div > div > ul > li:nth-child(8) > a', (button)=>button.textContent)
        
        console.log('button Name =',buttonName)


        //utilizando un XPATH

        
        const [button] = await page.$x('//nav[1]/section/button[2]')
        const property = await button.getProperty('textContent')
        const text = await property.jsonValue()
        console.log('texto =',text)
        await browser.close()
        
    },35000)


    it('extract the page and the URL', async ()=>{
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            // slowMo:300
        })
        const page = await browser.newPage()
        await page.goto('https://platzi.com',{waitUntil: 'networkidle0'})

        const title = await page.title()
        const URL = await page.url()
        
        console.log('title ',title)
        console.log('url ',URL)

        await browser.close()
        
    },35000)
})