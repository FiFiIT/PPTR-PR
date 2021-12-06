const puppeteer = require('puppeteer');

describe('Check if element exist', () => {
	it('should not find sign in button after click', async () => {
		const browser = await puppeteer.launch({ headless: false });
		const page = await browser.newPage();
		await page.setViewport({ width: 1920, height: 1080 });

		await page.goto('https://www.medicover.pl/');
		await page.waitForSelector('.login-widget-button-login');
		await page.click('.login-widget-button-login');

		await page.waitForFunction(
			() => !document.querySelector('.login-widget-button-login')
		);
		await page.waitForSelector('.login-widget-button-login', { hidden: true });

		browser.close();
	});
});
