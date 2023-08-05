const puppeteer = require('puppeteer')  
const city = 'Zakopane'  
const screenshot = `booking_results_${city}.png`    
  
try {    
  (async () => {    
    const browser = await puppeteer.launch({  
        executablePath: '/usr/bin/chromium-browser',  
        args: [  
             '--disable-gpu',  
             '--disable-dev-shm-usage',  
             '--disable-setuid-sandbox',  
             '--no-first-run',  
             '--no-sandbox',  
             '--no-zygote',  
             '--single-process',  
        ]  
   })  
   const page = await browser.newPage()  
   await page.setUserAgent('Chrome/75.0.3770.100')  
   await page.goto('https://booking.com')
   await page.waitForSelector('[id=":rc:"]')
   await page.keyboard.press('Enter')    
   await page.type('[id=":rc:"]', city)  
   await page.keyboard.press('Enter')  
   await page.waitForSelector('[class="bcbf33c5c3"]')

 
 
   await page.screenshot({  
     path: screenshot,  
     fullPage: true  
   })  
   const hotels = await page.$$eval('span.sr-hotel__name', (anchors) => {  
     return anchors.map((anchor) => anchor.textContent.trim()).slice(0, 20)  
   })  
   console.log(hotels)  
   await browser.close()  
   console.log('See screenshot: ' + screenshot)  
 })()  
} catch (err) {  
 console.error(err)  
}  