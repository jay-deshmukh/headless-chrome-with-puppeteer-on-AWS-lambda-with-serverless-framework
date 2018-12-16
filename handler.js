const puppeteerLambda = require('puppeteer-lambda');

module.exports.hello = async (event, context , cb) => {
  const {url , format} =  event.queryStringParameters
  const browser = await puppeteerLambda.getBrowser({
    headless: true
  });
  const page = await browser.newPage();
  await page.goto(url ,{"waitUntil" : "networkidle0"});
  const content = await page.evaluate((format) => document.body[`inner${format}`],format);
  console.log(content);
  cb(null,{
    statusCode : 200,
    body : JSON.stringify({
      content : content
    })
  })
};