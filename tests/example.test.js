const puppeteer = require('puppeteer');
const { click, getText, getCount, clog } = require('../lib/helpers');

describe('My First Puppeteerr Test', () => {
	let browser;
	let page;

	before(async () => {
		browser = await puppeteer.launch({
			headless: true,
			slowMo: 10,
			devtools: false,
			ignoreHTTPSErrors: true,
		});

		page = await browser.newPage();
		await page.setDefaultTimeout(10000);
		await page.setDefaultNavigationTimeout(20000);
	});

	after(async () => {
		await browser.close();
	});

	it('should navigate to Medicover', async () => {
		await page.goto('https://www.medicover.pl/en/');
		// await page.reload();

		const login_text = await getText(page, '.login-widget-button-login');
		clog('Login text', login_text, 16);

		const orange_buttons = await getCount(page, '.btn-orange');
		clog('Orange Buttons', orange_buttons, 16);

		click(page, '.login-widget-button-login');

		await page.waitForTimeout(2000);
	});
});
