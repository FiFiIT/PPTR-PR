const puppeteer = require('puppeteer');
const { click, typeText, clickAndWaitForTarget } = require('./lib/helpers');

(async () => {
	const browser = await puppeteer.launch({
		headless: false,
		args: ['--start-maximized'],
	});
	const page = await browser.newPage();
	await page.setDefaultTimeout(10000);
	await page.setDefaultNavigationTimeout(20000);
	await page.setViewport({ width: 2560, height: 1440 });
	await page.setUserAgent(
		'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
	);

	await page.authenticate({
		UserName: 'Login',
		Password: 'Password',
	});

	await page.goto(
		'https://mol.medicover.pl/Users/Account/AccessDenied?ReturnUrl=%2F'
	);

	const newPage = await clickAndWaitForTarget(browser, page, '#oidc-submit');
	await newPage.waitForSelector('body');

	const login = await newPage.$x('//*[@id="UserName"]');
	const pass = await newPage.$x('//*[@id="Password"]');

	await newPage.waitForTimeout(500);
	login[0].type('2984452');
	await newPage.waitForTimeout(500);
	pass[0].type('Hawaje2017#');

	await page.waitForTimeout(1000);

	await click(newPage, '#loginBtn');

	await page.waitForTimeout(5000);

	// const umowWizyteSelector =
	// 	'//*[@id="tripel-singlebox"]/div/article[2]/div[1]/div/div/div[2]/a';
	// await page.waitForXPath(umowWizyteSelector);
	// const umowWizyte = await page.$x(umowWizyteSelector);
	// await umowWizyte[0].click();

	// await browser.close();
})();
