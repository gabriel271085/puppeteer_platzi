const puppeteer = require('puppeteer');
const {AxePuppeteer} = require('@axe-core/puppeteer')
const { createHtmlReport } = require('axe-html-reporter');

describe('accesibility', () => {

    let browser;
    let page;

    beforeEach(async () => {
        browser = await puppeteer.launch({
            headless: "new",
            defaultViewport: null,
            // slowMo: 300
        });
        page = await browser.newPage();
    });

    afterEach(async () => {
        await page.close();
        await browser.close();
        
    });

    it('accessibility test', async () => {
        //este codigo nos permite probar la accesibilidad con la que fue desarrollado el sistema
        await page.goto('https://platzi.com', { waitUntil: 'networkidle0' })
        const snapshot = await page.accessibility.snapshot()
        console.log(snapshot)


    })

    it('accessibility test with AXE', async () => {
        await page.setBypassCSP(true)
        await page.goto('https://platzi.com', { waitUntil: 'networkidle0' })
        const snapshot = await page.accessibility.snapshot()
        

        const result = await new AxePuppeteer(page).analyze()
        console.log(result.violations[0].nodes[0])

    })
    
    it('Accebilidad con AXE con reporte HTML', async () => {
        await page.setBypassCSP(true);
    
        await page.goto('https://platzi.com', {
          waitUntil: 'networkidle2'
        });
    
        await page.waitForSelector('img');
    
        const rawAxeResults = await new AxePuppeteer(page).analyze();
    
        createHtmlReport({
          results: rawAxeResults,
          options: {
            projectKey: 'Mi primer reporte AXE',
            doNotCreateReportFile: false,
          }
        })
    })   
})