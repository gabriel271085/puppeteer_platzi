const puppeteer = require('puppeteer')

describe('PDF generation test', () => {

    let browser
    let page

    beforeEach(async () => {
        browser = await puppeteer.launch({
            headless: "new",
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

    it('PDF generator', async () => {
        
       let pdfCSS = []
       pdfCSS.push('<style>')
       pdfCSS.push('h1{font-size: 15px; margin left: 30px;}')
       pdfCSS.push('</style>')

       const CSS = pdfCSS.join('')

       await page.pdf({
        path:'./google.pdf',
        format:'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: CSS +'<h1>'+ 'PDF generation with puppeteer' + '</h1>',
        footerTemplate: CSS + '<h1> page <span class="pageNumber"> </span> of <span class="totalPages"></span></h1>',

        margin:{
            top: '100px',
            botton: '200px',
            right: '30px',
            left: '30px'
        },
       })
    }, 30000)

    

})
