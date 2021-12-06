const puppeteer = require('puppeteer');

describe('Device Emulation', () => {
	let browser;
	let page;

	before(async () => {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 10,
			devtools: false,
			args: ['--start-maximized'],
		});

		const context = await browser.createIncognitoBrowserContext();
		page = await context.newPage();
		await page.setDefaultTimeout(10000);
		await page.setDefaultNavigationTimeout(20000);
	});

	after(async () => {
		await browser.close();
	});

	it('Desktop Device Test', async () => {
		await page.setViewport({ width: 1920, height: 1080 });
		await page.goto('https://chomikuj.pl/');
		await page.waitForSelector('#mainContainer');

		await page.waitForTimeout(2000);
	});

	it('Tablet Device Test', async () => {
		// https://github.com/puppeteer/puppeteer/blob/main/src/common/DeviceDescriptors.ts
		const ipad = puppeteer.devices['iPad landscape'];
		await page.emulate(ipad);

		await page.goto('https://chomikuj.pl/');
		await page.waitForSelector('#mainContainer');

		await page.waitForTimeout(2000);
	});

	it('Mobile Device Test', async () => {
		const iphone = puppeteer.devices['iPhone 11'];
		await page.emulate(iphone);

		await page.goto('https://chomikuj.pl/');
		await page.waitForSelector('#mainContainer');

		await page.waitForTimeout(2000);
	});
});
