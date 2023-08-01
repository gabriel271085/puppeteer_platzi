const puppeteer = require('puppeteer')
const {getText,getCount} = require('../lib/helpers')

describe ('extracting info',()=>{

    let browser
    let page
    //para estos hooks la funcion beforeAll solo ejecuta una vez lo que esta dentro asimismo el afterAll
    beforeAll(async ()=>{
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            // slowMo:300
        })
        page = await browser.newPage()
        await page.goto('https://platzi.com',{waitUntil: 'networkidle0'})
    })

    afterAll(async ()=>{
        await browser.close()
    })

    it('counting the page elements', async ()=>{
        
        // la funcion $$eval selecciona todos los selectores del DOM
        const images = await getCount(page,'img') 
        console.log('qty of images =',images) 

        },60000)

    it('extract the info of an element', async ()=>{
        
        //utilizando un selector
        await page.waitForSelector('#Header-v2 > nav.Nav-header.Nav-header-mobileCtas > div.Menu > div > div > ul > li:nth-child(8) > a')  
        const buttonName = await getText(page,'#Header-v2 > nav.Nav-header.Nav-header-mobileCtas > div.Menu > div > div > ul > li:nth-child(8) > a',)
        
        console.log('button Name =',buttonName)


        //utilizando un XPATH

        const [button] = await page.$x('//nav[1]/section/button[2]')
        const property = await button.getProperty('textContent')
        const text = await property.jsonValue()
        console.log('texto =',text)
        
    },35000)


    it('extract the page and the URL', async ()=>{

        const title = await page.title()
        const URL = await page.url()
        
        console.log('title ',title)
        console.log('url ',URL)
        
    },35000)
})