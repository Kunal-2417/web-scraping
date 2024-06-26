const puppeteer = require('puppeteer');
const fs = require('fs/promises')


// const url = 'https://www.youtube.com/@SonyMusicIndia';

const data1 = {
    list1: []
}

const scrapeChannel1 = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {
        timeout: 0,
        waitUntil: "networkidle0"
    })
    console.log("Scraping started")
    const ProductData = await page.evaluate(async (data1) => {
        const items = document.querySelectorAll('#main > ul > li')
        items.forEach((item, index) => {
            console.log(`Scraping data for product : ${index}`)
            // const id = item.getAttribute('div[data-id]')
            const name = item.querySelector('#main > ul > li > div > div > div.product-loop-header> a > h2') && item.querySelector('#main > ul > li > div > div > div.product-loop-header> a > h2').innerText;
            const price = item.querySelector('#main > ul > li > div > div > div.product-loop-footer.product-item__footer > div.price-add-to-cart > span') && item.querySelector('#main > ul > li > div > div > div.product-loop-footer.product-item__footer > div.price-add-to-cart > span').innerText;
            //const image = item.querySelector('#gridview > div> article > figure > a.figure-href').src;
            const image = item.querySelector('#main > ul > li > div > div > div.product-loop-header.product-item__header > a > div > img') && item.querySelector('#main > ul > li > div > div > div.product-loop-header.product-item__header > a > div > img').src;
            data1.list1.push({
                name: name,
                price: price,
                image: image
            })
        })

        return data1
    }, data1)

    // ProductData.list1.forEach(el => {
    //     console.log(el.name)
    // })
    // console.log(ProductData.list1[0].image)
    // console.log(`Successfully scraped ${ProductData.list1.length} products`)
    // const json = JSON.stringify(ProductData)
    // fs.writeFile('product2.json', json, 'utf-8', () => {
    //     console.log('done')
    // })

    await browser.close()
    return ProductData;
}
module.exports = { scrapeChannel1 }

// scrapeChannel(url);

