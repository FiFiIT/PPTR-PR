const puppeteer = require('puppeteer');
const { clog } = require('../lib/helpers');

describe('Keyboard Press Simulation', () => {
	it('should search in google', async () => {
		const browser = await puppeteer.launch({ headless: false });

		const page = await browser.newPage();
		await page.setDefaultTimeout(10000);
		await page.setDefaultNavigationTimeout(20000);

		await page.goto(
			'https://pl.wikipedia.org/wiki/Wikipedia:Strona_g%C5%82%C3%B3wna'
		);
		await page.waitForSelector('#content');

		await page.type('#searchInput', 'Filip');
		await page.keyboard.press('Enter');

		await page.waitForTimeout(5000);

		await browser.close();
	});
});
