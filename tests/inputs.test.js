const puppeteer = require('puppeteer');

describe('Working with inputs', () => {
	it('should work ok', async function () {
		const browser = await puppeteer.launch({
			headless: false,
			slowMo: 10,
			args: ['--start-fullscreen'],
		});

		const page = await browser.newPage();
		await page.setViewport({ width: 2560, height: 1440 });
		await page.goto('https://devexpress.github.io/testcafe/example/', {
			waitUntil: 'networkidle2',
		});
		await page.waitForSelector('#main-form');
		//await page.waitForTimeout('500');

		//input type text
		await page.type('#developer-name', 'Filip', { delay: 0 });
		await page.waitForTimeout('500');

		//input type checkbox
		await page.click('#tried-test-cafe', { clickCount: 1, button: 'left' });
		await page.waitForTimeout('500');

		//select
		await page.select('#preferred-interface', 'JavaScript API');
		await page.waitForTimeout('500');

		//textarea
		const message =
			'Thanks for this example page where I could test my puppeteer.';
		await page.type('#comments', message);
		await page.waitForTimeout('500');
		await page.click('#submit-button');

		await page.waitForSelector('#article-header');

		await browser.close();
	});
});
