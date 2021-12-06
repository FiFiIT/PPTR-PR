const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const { clog } = require('../lib/helpers');

describe('Get Page Title & Url', () => {
	it('should extract data', async () => {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.setDefaultTimeout(10000);
		await page.setDefaultNavigationTimeout(20000);

		await page.goto('https://alternative.me/crypto/fear-and-greed-index');
		await page.waitForSelector('#main');

		const title = await page.title();
		const url = await page.url();
		const fear = await page.$eval('.fng-circle', e => e.innerHTML);
		const fears = await page.$$eval('.fng-circle', e => e);

		// clog('URL', url);
		// clog('Title', title);
		// clog('Fear', fear);
		// clog('Circles', fears.length);

		expect(url).to.include('fear-and-greed-index');
		expect(title).to.be.a(
			'string',
			'Crypto Fear & Greed Index - Bitcoin Sentiment - Alternative.me'
		);
		expect(fear).to.be.a('string', '40');
		expect(fears.length).to.equal(4);

		await browser.close();
	});
});
