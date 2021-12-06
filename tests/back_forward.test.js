const puppeteer = require('puppeteer');

describe('Go Back & Forward in the Browser', () => {
	it('should work', async () => {
		const browser = await puppeteer.launch({
			headless: false,
			devtools: true,
			slowMo: 250,
		});

		const page = await browser.newPage();

		await page.goto('https://www.netflix.com/browse');
		await page.waitForSelector('#appMountPoint');
		await page.goto('https://hbogo.pl/');
		await page.waitForSelector('#gatewayFrameContainer');

		await page.goBack();
		await page.waitForSelector('#appMountPoint');
		await page.goForward();
		await page.waitForSelector('#gatewayFrameContainer');

		await browser.close();
	});
});
