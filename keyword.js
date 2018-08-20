const puppeteer = require('puppeteer');
var fs = require("fs");

async function login(page, argv) {
  await page.goto('https://sellercentral.amazon.com/');
  await page.evaluate(() => {
    document.querySelector('#sign-in-button').click();
  });
  await page.waitFor(() => !!document.querySelector('#ap_email'));
  await page.type('#ap_email', argv[2]);
  await page.type('#ap_password', argv3]);
  await page.evaluate(() => {
    document.querySelector('#signInSubmit').click();
  });
  await page.waitForNavigation();
};

async function goToProduct(page, sku, asin) {
  await page.goto(`https://catalog.amazon.com/abis/product/DisplayEditProduct?marketplaceID=ATVPDKIKX0DER&sku=${sku}&asin=${asin}`.trim())
  await page.waitFor(5000)
  await page.evaluate(() => {
    document.querySelector('#tang_keywords-tab').click();
  })
  await page.waitFor(() => !!document.querySelector('#platinum_keywords1'));
}

async function addKeyword(page) {
  await page.waitFor(() => !!document.querySelector('#platinum_keywords1'));
  await page.evaluate(() => {
  var kw1 = 'for women, for men, set, tree, rack, with lid, saucer, autoseal, american flag, saucer set, black'
    document.querySelector('#platinum_keywords1').value = kw1;
    document.querySelector('#generic_keywords').value = kw1;
  });
  await page.evaluate(() => {
    document.querySelector('#platinum_keywords-multi > div > div > div > a.addMoreLink').click();
  })
  await page.evaluate(() => {
  var kw2 = 'boxes, brush, books, cute, dad, travel dishwasher safe, engineer, funny, for mom, for boyfriend'
    document.querySelector('#platinum_keywords2').value = kw2;
  });
  await page.evaluate(() => {
    document.querySelector('#platinum_keywords-multi > div > div > div > a.addMoreLink').click();
  })
  await page.evaluate(() => {
  var kw3 = 'gift set, grandma, grandpa, geek, inspirational, joke, joker, large, leak proof, maker, nurse'
    document.querySelector('#platinum_keywords3').value = kw3;
  });
  await page.evaluate(() => {
    document.querySelector('#platinum_keywords-multi > div > div > div > a.addMoreLink').click();
  })
  await page.evaluate(() => {
    var kw4 = 'microwave and dishwasher safe, novelty, organizer, outdoor, portable, quote, quote inspirational'
    document.querySelector('#platinum_keywords4').value = kw4;
  });
  await page.evaluate(() => {
    document.querySelector('#platinum_keywords-multi > div > div > div > a.addMoreLink').click();
  })
  await page.evaluate(() => {
  var kw5 = 'quote funny, set of 6, set of 4, travel, to go, thermos, unique, vintage, valentine, xmas, zen'
    document.querySelector('#platinum_keywords5').value = kw5;
  });
  await page.waitFor(4000)
  await page.evaluate(() => {
    document.querySelector('#main_submit_button').click();
  })
  await page.waitFor(4000)
}


(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await login(page, process.argv)
  await page.waitFor(30000);
  var text = fs.readFileSync("./asin.txt").toString('utf-8');
  var textByLine = text.split("\n")
  for (let i = 0; i < textByLine.length; i ++) {
    var line = textByLine[i].split(",")
    var sku = line[2]
    var asin = line[3]
    await goToProduct(page, sku, asin)
    await addKeyword(page)
    console.log(asin)
  }
})();

