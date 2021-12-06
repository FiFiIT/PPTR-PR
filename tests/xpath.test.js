const puppeteer = require('puppeteer');

describe('Xpath testing', () => {
	it('just playing', async () => {
		const browser = await puppeteer.launch({ headless: false });
		const page = await browser.newPage();
		await page.goto(
			'https://pl.wikipedia.org/wiki/Wikipedia:Strona_g%C5%82%C3%B3wna'
		);
		await page.waitForXPath('//*[@id="searchInput"]');
		await page.waitForTimeout(1000);

		await browser.close();
	});
});
