const puppeteer = require('puppeteer');
const fs = require('fs');
const { constants } = require('fs/promises');

describe('performance', () => {

    let browser;
    let page;

    beforeEach(async () => {
        browser = await puppeteer.launch({
            headless: "new",
            defaultViewport: null,
            // slowMo: 300
        });
        page = await browser.newPage()
    });

    afterEach(async () => {
        await page.close();
        await browser.close();
        
    });

    it('performance measure of the test', async () => {
        await page.goto('https://platzi.com', { waitUntil: 'networkidle0' })
        await page.waitForSelector('img')
        const metrics = await page.metrics()
        console.log(metrics) 


    }, 35000)

    it('performance measure of a page', async () => {
        await page.goto('https://platzi.com', { waitUntil: 'networkidle0' })
        await page.waitForSelector('img')
        const metricsPage = await page.evaluate(()=>JSON.stringify(window.performance))
        console.log(metricsPage) 


    }, 35000)

    it('performance measure of the pageload', async () => {
        await page.tracing.start({path:'profile.json'})
        await page.goto('https://platzi.com', { waitUntil: 'networkidle0' })
        await page.tracing.stop()
        
    }, 35000)

    it('performance measure of the pageload with screenshots', async () => {
        await page.tracing.start({path:'profile.json', screenshots:true})
        await page.goto('https://platzi.com', { waitUntil: 'networkidle0' })
        await page.tracing.stop()
        const tracing =JSON.parse(fs.readFileSync('./profile.json','utf-8'))

        //Filtrar el Json
        const traceScreenshots = tracing.traceEvents.filter((x) => {
            return (
                x.cat === 'disabled-by-default-devtools.screenshot' &&
                x.name === 'Screenshot' &&
                typeof x.args !== 'undefined' &&
                typeof x.args.snapshot !== 'undefined'
            )
        })

        //iterar sobre el arreglo para crear las imagenes

        traceScreenshots.forEach(function(snap,index){
            fs.writeFile(`trace-screenshots-${index}.png`,snap.args.snapshot, 'base64',function (err){
                if(err){
                    console.log('no pude crear el archivo', err)
                }
            })
        })
        
    }, 35000)

    it('performance measure of the first paint and first contentful paint', async () => {
        const navigationPromise = page.waitForNavigation(); 
        await page.goto('https://platzi.com', { waitUntil: 'networkidle0' });
        await navigationPromise;
    
        const firstPaint = JSON.parse(
            await page.evaluate(() => JSON.stringify(performance.getEntriesByName('first-paint')))
        );
    
        const firstContentfulPaint = JSON.parse(
            await page.evaluate(() => JSON.stringify(performance.getEntriesByName('first-contentful-paint')))
        );
    
        console.log('firstPaint', firstPaint)
        console.log('firstContentfulPaint', firstContentfulPaint)
    }, 35000);
    

    it('performance measure of the frames per second', async () => {
        
       const devtoolsProtocolClient = await page.target().createCDPSession()
       await devtoolsProtocolClient.send('Overlay.setShowFPSCounter', {show: true})
       await page.goto('https://platzi.com')

       await page.screenshot({path: 'framespersecond.jpg', type:'jpeg' })

    
    }, 35000) 
})